import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import mammoth from "mammoth";

// Lazy initialization of OpenAI client
let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key not configured");
    }
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

// Helper function to get interpretation text based on score
function getInterpretation(score: number): string {
  if (score === 1) return "Excellent (Low Risk)";
  if (score >= 2 && score <= 3) return "Very Good";
  if (score >= 4 && score <= 5) return "Decent";
  if (score >= 6 && score <= 7) return "High Risk";
  return "Worse (High Risk)";
}

// Parse PDF file and extract text using dynamic import
async function parsePDF(buffer: Buffer): Promise<string> {
  try {
    // Dynamic import to avoid build-time issues with pdf-parse
    const pdfParse = (await import("pdf-parse")).default;
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error("Failed to parse PDF file");
  }
}

// Parse DOCX file and extract text
async function parseDOCX(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error("Error parsing DOCX:", error);
    throw new Error("Failed to parse DOCX file");
  }
}

// Gatekeeper step: Check if document is a legal contract
async function checkIfContract(textSample: string): Promise<boolean> {
  const openai = getOpenAIClient();
  
  const prompt = `Analyze the following text sample (first 1000 characters) from a document and determine if it appears to be a legal contract or agreement.

Text sample:
"""
${textSample.substring(0, 1000)}
"""

Respond with only "true" if this appears to be a legal contract or agreement (such as NDA, employment contract, service agreement, license agreement, partnership agreement, etc.), or "false" if it does not appear to be a legal contract.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are a legal document classifier. Respond only with 'true' or 'false'.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 10,
    temperature: 0,
  });

  const answer = response.choices[0]?.message?.content?.trim().toLowerCase();
  return answer === "true";
}

// Full risk analysis of the contract
async function analyzeContractRisk(fullText: string): Promise<{
  risk_score: number;
  interpretation: string;
  risk_summary: string;
  key_risks: string[];
}> {
  const openai = getOpenAIClient();
  
  const prompt = `You are a legal contract analyst. Analyze the following contract and provide a risk assessment.

Contract text:
"""
${fullText.substring(0, 15000)}
"""

Provide your analysis in the following JSON format:
{
  "risk_score": <number from 1 to 10, where 1 is Excellent (lowest risk) and 10 is Worse (highest risk)>,
  "risk_summary": "<A 2-3 sentence summary of the overall risk level and main concerns>",
  "key_risks": ["<risk 1>", "<risk 2>", "<risk 3>", ...]
}

Consider the following factors when assessing risk:
- Unfavorable liability clauses
- One-sided termination rights
- Unclear payment terms
- Missing or weak indemnification
- Intellectual property concerns
- Non-compete or exclusivity clauses
- Penalty clauses
- Missing dispute resolution mechanisms
- Vague or ambiguous language
- Missing key protections

Respond only with the JSON object, no additional text.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are an expert legal contract analyst. Respond only with valid JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 1000,
    temperature: 0.3,
  });

  const content = response.choices[0]?.message?.content?.trim();
  
  if (!content) {
    throw new Error("Failed to get response from OpenAI");
  }

  try {
    // Parse the JSON response
    const analysis = JSON.parse(content);
    
    // Validate and normalize the risk score
    let riskScore = parseInt(analysis.risk_score, 10);
    if (isNaN(riskScore) || riskScore < 1) riskScore = 1;
    if (riskScore > 10) riskScore = 10;

    return {
      risk_score: riskScore,
      interpretation: getInterpretation(riskScore),
      risk_summary: analysis.risk_summary || "Unable to generate risk summary.",
      key_risks: Array.isArray(analysis.key_risks) ? analysis.key_risks : [],
    };
  } catch (parseError) {
    console.error("Error parsing OpenAI response:", parseError);
    console.error("Raw response:", content);
    throw new Error("Failed to parse risk analysis response");
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check for OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const skipGatekeeper = formData.get("skip_gatekeeper") === "true";

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a PDF or DOCX file." },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse the document based on type
    let documentText: string;
    
    if (file.type === "application/pdf") {
      documentText = await parsePDF(buffer);
    } else {
      documentText = await parseDOCX(buffer);
    }

    if (!documentText || documentText.trim().length === 0) {
      return NextResponse.json(
        { error: "Could not extract text from the document" },
        { status: 400 }
      );
    }

    // Gatekeeper step (unless skipped)
    let isContract = true;
    
    if (!skipGatekeeper) {
      isContract = await checkIfContract(documentText);
      
      if (!isContract) {
        return NextResponse.json({
          is_contract: false,
          risk_score: 0,
          interpretation: "",
          risk_summary: "",
          key_risks: [],
        });
      }
    }

    // Full risk analysis
    const analysis = await analyzeContractRisk(documentText);

    return NextResponse.json({
      is_contract: true,
      risk_score: analysis.risk_score,
      interpretation: analysis.interpretation,
      risk_summary: analysis.risk_summary,
      key_risks: analysis.key_risks,
    });

  } catch (error) {
    console.error("Error in analyze-contract API:", error);
    
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

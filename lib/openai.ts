import OpenAI from "openai";

// Lazy initialization of OpenAI client
let openaiClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
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

// Response type for contract analysis
export interface ContractAnalysisResult {
  is_legal_contract: boolean;
  score: number;
  interpretation: string;
  summary: string;
  risks: string[];
}

// System prompt for the Senior Legal Risk Auditor
const SYSTEM_PROMPT = `You are a Senior Legal Risk Auditor. Your task is to analyze documents and assess their legal risk.

When analyzing a document:
1. First determine if it is a legal contract or agreement.
2. If it is a contract, assign a Risk Score from 1-10 based on this scale:
   - 1: Excellent (Standard, fair, protective)
   - 2-3: Very Good
   - 4-5: Decent (Potential to get better)
   - 6-7: High Risk
   - 8-10: Worse (High liability, predatory, unclear). Needs urgent attention.

3. Provide an interpretation based on the score:
   - 1: Excellent
   - 2-3: Very Good
   - 4-5: Decent (Potential to get better)
   - 6-7: High Risk
   - 8-10: Worse. Needs urgent attention.

Consider these risk factors:
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

You must respond with valid JSON only.`;

/**
 * Analyzes contract text using GPT-4o with Senior Legal Risk Auditor system prompt.
 * Uses response_format: { type: "json_object" } for strict JSON output.
 * 
 * @param documentText - The full text of the document to analyze
 * @param skipContractCheck - If true, skips the contract verification step
 * @returns ContractAnalysisResult with is_legal_contract, score, interpretation, summary, and risks
 */
export async function analyzeContractWithGPT4(
  documentText: string,
  skipContractCheck = false
): Promise<ContractAnalysisResult> {
  const openai = getOpenAIClient();

  const userPrompt = `Analyze the following document and provide your assessment.

Document text:
"""
${documentText.substring(0, 15000)}
"""

${skipContractCheck 
  ? "Assume this is a legal contract and proceed with risk analysis." 
  : "First determine if this is a legal contract, then if it is, provide risk analysis."}

Respond with a JSON object following this exact schema:
{
  "is_legal_contract": boolean,
  "score": number (1-10, where 1 is Excellent/Low Risk and 10 is Worse/High Risk),
  "interpretation": string (based on score: "Excellent", "Very Good", "Decent (Potential to get better)", "High Risk", or "Worse. Needs urgent attention."),
  "summary": string (2-3 sentence summary of the overall risk level and main concerns),
  "risks": string[] (array of specific risks identified)
}

If the document is not a legal contract, set is_legal_contract to false, score to 0, interpretation to "", summary to "", and risks to [].`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    max_tokens: 1500,
    temperature: 0.3,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("Failed to get response from OpenAI");
  }

  try {
    const analysis = JSON.parse(content) as ContractAnalysisResult;

    // Validate and normalize the response
    const isLegalContract = Boolean(analysis.is_legal_contract);
    
    if (!isLegalContract) {
      return {
        is_legal_contract: false,
        score: 0,
        interpretation: "",
        summary: "",
        risks: [],
      };
    }

    // Validate and normalize the score
    let score = parseInt(String(analysis.score), 10);
    if (isNaN(score) || score < 1) score = 1;
    if (score > 10) score = 10;

    // Get interpretation based on score
    const interpretation = getInterpretationFromScore(score);

    return {
      is_legal_contract: true,
      score,
      interpretation,
      summary: analysis.summary || "Unable to generate summary.",
      risks: Array.isArray(analysis.risks) ? analysis.risks : [],
    };
  } catch (parseError) {
    console.error("Error parsing OpenAI response:", parseError);
    console.error("Raw response:", content);
    throw new Error("Failed to parse contract analysis response");
  }
}

/**
 * Get interpretation text based on risk score
 */
function getInterpretationFromScore(score: number): string {
  if (score === 1) return "Excellent";
  if (score >= 2 && score <= 3) return "Very Good";
  if (score >= 4 && score <= 5) return "Decent (Potential to get better)";
  if (score >= 6 && score <= 7) return "High Risk";
  return "Worse. Needs urgent attention.";
}

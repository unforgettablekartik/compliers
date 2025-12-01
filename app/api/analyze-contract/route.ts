import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";
import { analyzeContractWithGPT4 } from "@/lib/openai";

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

    // Analyze contract using GPT-4o with Senior Legal Risk Auditor prompt
    const analysis = await analyzeContractWithGPT4(documentText, skipGatekeeper);

    // Map response to expected format
    return NextResponse.json({
      is_contract: analysis.is_legal_contract,
      risk_score: analysis.score,
      interpretation: analysis.interpretation,
      risk_summary: analysis.summary,
      key_risks: analysis.risks,
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

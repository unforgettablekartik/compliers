import { NextRequest, NextResponse } from "next/server";
import { getOpenAIClient } from "@/lib/openai";

export type HRDocType = "handbook" | "posh";

export interface CompanyProfile {
  legalName: string;
  brandName?: string;
  state: string;
  industry: string;
  sizeBand: string;
  workModel: string;
}

export interface HandbookConfig {
  tone: "strict" | "balanced" | "startup";
  workingDays: string[];
  workingHours: string;
  leaveSummary: string;
  probationRules: string;
  extraPolicies?: string;
}

export interface PoshConfig {
  poshRequired: boolean;
  hasICC: boolean;
  iccDetails?: string;
  riskLevel: "low" | "medium" | "high";
  workforceMix: string[];
  interactsWithPublic: boolean;
  specialCircumstances?: string;
}

export interface GenerateHRDocRequest {
  type: HRDocType;
  companyProfile: CompanyProfile;
  handbookConfig?: HandbookConfig;
  poshConfig?: PoshConfig;
}

const SYSTEM_PROMPT = `You are an experienced Indian employment lawyer helping HR teams draft employee handbooks and POSH/workplace policies. Generate practical, HR-readable documents with clear headings and bullet points. The draft will later be customised by a lawyer at The Compliers. Structure the document clearly using proper markdown formatting.`;

function buildHandbookPrompt(profile: CompanyProfile, config: HandbookConfig): string {
  return `Generate a comprehensive Employee Handbook for the following company:

Company Details:
- Legal Name: ${profile.legalName}
${profile.brandName ? `- Brand Name: ${profile.brandName}` : ""}
- State: ${profile.state}
- Industry: ${profile.industry}
- Company Size: ${profile.sizeBand}
- Work Model: ${profile.workModel}

Handbook Configuration:
- Tone: ${config.tone}
- Working Days: ${config.workingDays.join(", ")}
- Working Hours: ${config.workingHours}
- Leave Policy: ${config.leaveSummary}
- Probation Rules: ${config.probationRules}
${config.extraPolicies ? `- Additional Policies: ${config.extraPolicies}` : ""}

Please generate an employee handbook with the following sections:
1. Welcome & Company Overview
2. Company Values and Culture
3. Employment Classifications (Full-time, Part-time, Contract, Intern)
4. Working Hours and Schedules
5. Remote/Hybrid Work Policy (if applicable)
6. Leave and Holidays Policy
7. Attendance and Punctuality
8. Performance Management
9. Professional Conduct and Ethics
10. Workplace Behavior and Dress Code
11. Confidentiality and Data Protection
12. Intellectual Property
13. Grievance Redressal
14. Termination and Exit Process
15. Acknowledgment

Format the response in clear markdown with ## for section headings and bullet points where appropriate. Keep the tone ${config.tone} and ensure compliance with Indian labor laws and ${profile.state} Shops and Establishments Act.`;
}

function buildPoshPrompt(profile: CompanyProfile, config: PoshConfig): string {
  return `Generate a comprehensive POSH and Workplace Policy Suite for the following company:

Company Details:
- Legal Name: ${profile.legalName}
${profile.brandName ? `- Brand Name: ${profile.brandName}` : ""}
- State: ${profile.state}
- Industry: ${profile.industry}
- Company Size: ${profile.sizeBand}
- Work Model: ${profile.workModel}

POSH Configuration:
- POSH Policy Required: ${config.poshRequired ? "Yes" : "No"}
- Has ICC: ${config.hasICC ? "Yes" : "No"}
${config.iccDetails ? `- ICC Details: ${config.iccDetails}` : ""}
- Risk Level: ${config.riskLevel}
- Workforce Mix: ${config.workforceMix.join(", ")}
- Interacts with Public: ${config.interactsWithPublic ? "Yes" : "No"}
${config.specialCircumstances ? `- Special Circumstances: ${config.specialCircumstances}` : ""}

Please generate a comprehensive workplace policy suite with the following documents:

1. **POSH Policy (Prevention of Sexual Harassment)**
   - Policy Statement and Scope
   - Definitions as per Sexual Harassment of Women at Workplace Act, 2013
   - Internal Complaints Committee (ICC) details
   - Complaint Filing Process
   - Investigation Process
   - Timelines and Remedies
   - Protection Against Retaliation
   - Awareness and Training

2. **Code of Conduct and Anti-Harassment Policy**
   - Professional behavior expectations
   - Prohibited conduct
   - Workplace harassment (beyond sexual harassment)
   - Reporting mechanisms

3. **Anti-Discrimination and Equal Opportunity Policy**
   - Non-discrimination statement
   - Equal employment opportunity
   - Reasonable accommodations

4. **Whistleblower and Complaint Escalation Policy**
   - Protected disclosures
   - Confidentiality
   - Non-retaliation
   - Escalation matrix

Format each policy in clear markdown with ## for major headings, ### for subheadings, and bullet points where appropriate. Ensure full compliance with the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 and Indian employment laws.`;
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

    // Parse request body
    const body: GenerateHRDocRequest = await request.json();

    if (!body.type || !body.companyProfile) {
      return NextResponse.json(
        { error: "Missing required fields: type and companyProfile" },
        { status: 400 }
      );
    }

    // Validate type-specific config
    if (body.type === "handbook" && !body.handbookConfig) {
      return NextResponse.json(
        { error: "handbookConfig is required for handbook generation" },
        { status: 400 }
      );
    }

    if (body.type === "posh" && !body.poshConfig) {
      return NextResponse.json(
        { error: "poshConfig is required for POSH policy generation" },
        { status: 400 }
      );
    }

    const openai = getOpenAIClient();

    // Build appropriate prompt
    const userPrompt =
      body.type === "handbook"
        ? buildHandbookPrompt(body.companyProfile, body.handbookConfig!)
        : buildPoshPrompt(body.companyProfile, body.poshConfig!);

    // Call OpenAI API
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
      max_tokens: 3000,
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content?.trim();

    if (!content) {
      return NextResponse.json(
        { error: "Failed to generate document" },
        { status: 500 }
      );
    }

    // Return generated document
    return NextResponse.json({
      document: content,
      type: body.type,
      estimatedPages: Math.ceil(content.length / 3000), // Rough estimate: ~3000 chars per page
      companyName: body.companyProfile.legalName,
    });
  } catch (error) {
    console.error("Error in generate-hr-doc API:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

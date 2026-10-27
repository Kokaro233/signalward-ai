import { NextResponse } from "next/server";
import { generateTextWithQwen } from "@/lib/qwen";
import { findDemoResult } from "@/lib/fallback";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    text?: string;
    scenario?: string;
    risk_level?: string;
    manipulation_chain?: string[];
    fallback_reply?: string;
    outputLanguage?: "en" | "zh";
  };

  try {
    if (process.env.QWEN_API_KEY) {
      const languageRule =
        body.outputLanguage === "zh"
          ? "Write in Simplified Chinese only, except product names if necessary."
          : "Write in English only. Do not add Chinese translations.";
      const reply = await generateTextWithQwen(`Write one short safe reply for a user facing a possible scam.
Do not accuse, argue, reveal personal information, promise payment, or continue the conversation.
Recommend independent official verification.
Return only the reply sentence, no quotes.
Language: ${languageRule}

Scenario: ${body.scenario ?? "suspicious conversation"}
Risk level: ${body.risk_level ?? "unknown"}
Manipulation chain: ${(body.manipulation_chain ?? []).join(", ")}
Conversation: ${body.text ?? ""}`);
      return NextResponse.json({ source: "qwen", reply });
    }
  } catch (error) {
    console.error("Safe reply fallback:", error);
  }

  return NextResponse.json({
    source: "fallback",
    reply: body.fallback_reply || findDemoResult(undefined, body.text).safe_reply
  });
}

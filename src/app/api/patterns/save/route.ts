import { NextResponse } from "next/server";
import { hasSupabaseConfig, savePatternSupabase } from "@/lib/supabase";
import type { PatternRecord } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<PatternRecord>;
  const pattern: PatternRecord = {
    pattern_id: body.pattern_id || `SIGNALWARD-${Date.now()}`,
    scenario: body.scenario || "User-confirmed anonymized pattern",
    language: body.language || "en",
    manipulation_chain: body.manipulation_chain || [],
    phrases: body.phrases || [],
    risk_level: body.risk_level || "Yellow",
    severity: body.severity || 50,
    recommended_actions: body.recommended_actions || ["Pause", "Verify independently"],
    source: "user_confirmed_anonymized_pattern"
  };

  try {
    if (hasSupabaseConfig()) {
      const saved = await savePatternSupabase(pattern);
      return NextResponse.json({ source: "supabase", saved });
    }
  } catch (error) {
    console.error("Supabase pattern save fallback:", error);
  }

  return NextResponse.json({
    source: "fallback",
    saved: {
      ...pattern,
      storage_policy: "anonymized_pattern_only",
      note: "Supabase is not configured; this pattern was not persisted."
    }
  });
}

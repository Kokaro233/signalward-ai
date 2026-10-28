import { NextResponse } from "next/server";
import { searchLocalPatterns } from "@/lib/fallback";
import { hasSupabaseConfig, searchPatternsSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    manipulation_chain?: string[];
    scenario?: string;
  };

  try {
    if (hasSupabaseConfig()) {
      const patterns = await searchPatternsSupabase(body.manipulation_chain ?? [], body.scenario);
      return NextResponse.json({ source: "supabase", patterns });
    }
  } catch (error) {
    console.error("Supabase pattern search fallback:", error);
  }

  const patterns = searchLocalPatterns(body.manipulation_chain ?? [], body.scenario);
  return NextResponse.json({ source: "fallback", patterns });
}

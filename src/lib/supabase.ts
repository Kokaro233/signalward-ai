import type { PatternRecord } from "@/lib/types";

type StoredPattern = PatternRecord & {
  saved_at?: string;
  storage_policy?: string;
};

function config() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase is not configured");
  return { url, key };
}

function headers(key: string) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json"
  };
}

export function hasSupabaseConfig() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function searchPatternsSupabase(
  chain: string[],
  scenario?: string
): Promise<PatternRecord[]> {
  const { url, key } = config();
  const response = await fetch(
    `${url}/rest/v1/patterns?select=pattern_id,scenario,language,manipulation_chain,phrases,risk_level,severity,recommended_actions,source&order=severity.desc&limit=50`,
    { headers: headers(key), cache: "no-store" }
  );
  if (!response.ok) throw new Error(`Supabase pattern search failed (${response.status})`);
  const rows = (await response.json()) as PatternRecord[];
  const terms = [...chain, scenario ?? ""].map((value) => value.toLowerCase()).filter(Boolean);
  return rows
    .filter((row) => {
      const haystack = `${row.scenario} ${row.manipulation_chain.join(" ")}`.toLowerCase();
      return terms.length === 0 || terms.some((term) => haystack.includes(term));
    })
    .slice(0, 3);
}

export async function savePatternSupabase(pattern: PatternRecord) {
  const { url, key } = config();
  const saved: StoredPattern = {
    ...pattern,
    saved_at: new Date().toISOString(),
    storage_policy: "anonymized_pattern_only"
  };
  const response = await fetch(`${url}/rest/v1/patterns`, {
    method: "POST",
    headers: { ...headers(key), Prefer: "return=representation" },
    body: JSON.stringify(saved)
  });
  if (!response.ok) throw new Error(`Supabase pattern save failed (${response.status})`);
  const rows = (await response.json()) as StoredPattern[];
  return rows[0] ?? saved;
}

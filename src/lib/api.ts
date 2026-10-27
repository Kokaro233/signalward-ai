import type { AnalysisResult } from "@/lib/types";

export async function postJson<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    const raw = await response.text();
    try {
      const payload = JSON.parse(raw) as { error?: unknown };
      throw new Error(typeof payload.error === "string" ? payload.error : `Request failed (${response.status})`);
    } catch (error) {
      if (error instanceof SyntaxError) throw new Error(raw || `Request failed (${response.status})`);
      throw error;
    }
  }
  return response.json() as Promise<T>;
}

export function riskTone(level: AnalysisResult["risk_level"]) {
  return {
    Green: "green",
    Yellow: "yellow",
    Orange: "orange",
    Red: "red"
  }[level];
}

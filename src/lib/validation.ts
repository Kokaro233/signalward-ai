import type { AnalysisResult, IndependentReview } from "./types";
const levels = ["Green", "Yellow", "Orange", "Red"];
function object(value: unknown): Record<string, unknown> {if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid model JSON"); return value as Record<string, unknown>;}
function strings(v: unknown) {return Array.isArray(v) && v.every(x => typeof x === "string");}
export function validateAnalysis(value: unknown): AnalysisResult {
 const p = object(value);
 if (!levels.includes(String(p.risk_level)) || typeof p.overall_risk_score !== "number" || !Number.isFinite(p.overall_risk_score) || p.overall_risk_score < 0 || p.overall_risk_score > 100) throw new Error("Invalid risk assessment");
 for (const k of ["scenario","summary","safe_reply","evidence_summary"]) if (typeof p[k] !== "string") throw new Error("Missing analysis text");
 for (const k of ["manipulation_chain","agent_actions","verification_checklist"]) if (!strings(p[k])) throw new Error("Invalid analysis list");
 if (!Array.isArray(p.evidence) || !p.evidence.every(e => e && typeof e.text === "string" && typeof e.reason === "string" && typeof e.type === "string" && Number.isFinite(e.risk_score) && e.risk_score >= 0 && e.risk_score <= 100)) throw new Error("Invalid evidence");
 const toolCalls = Array.isArray(p.tool_calls) && p.tool_calls.every(call => call && typeof call.tool === "string" && typeof call.result === "string") ? p.tool_calls : [];
 const toolTimeline = strings(p.tool_timeline) ? p.tool_timeline : [];
 return {...p,tool_calls:toolCalls,tool_timeline:toolTimeline,bodyguard_mode:["Orange","Red"].includes(String(p.risk_level))} as unknown as AnalysisResult;
}
export function validateReview(value: unknown): IndependentReview {
 const p = object(value);
 if (!levels.includes(String(p.risk_level)) || typeof p.review_summary !== "string") throw new Error("Invalid independent review");
 for (const k of ["supported_signals","unsupported_claims","missing_information","recommended_verification"]) if (!strings(p[k])) throw new Error("Invalid review list");
 return {...p,status:"completed"} as IndependentReview;
}

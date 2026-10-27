import type { AnalysisResult, IndependentReview } from "./types";
const levels = ["Green","Yellow","Orange","Red"] as const;
export function reconcile(primary: AnalysisResult, review: IndependentReview): AnalysisResult {
 const disagreement = primary.risk_level !== review.risk_level;
 const level = levels[Math.max(levels.indexOf(primary.risk_level),levels.indexOf(review.risk_level))];
 return {...primary,primary_risk_level:primary.risk_level,risk_level:level,bodyguard_mode:level === "Orange" || level === "Red",independent_review:review,reconciliation:disagreement ? "disagreement" : "agreement",agent_actions:Array.from(new Set([...primary.agent_actions,...review.recommended_verification])),tool_timeline:[...primary.tool_timeline,"Nemotron review completed via Nebius.","Deterministic evidence reconciliation completed."]};
}

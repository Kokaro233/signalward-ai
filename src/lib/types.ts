export type RiskLevel = "Green" | "Yellow" | "Orange" | "Red";

export type EvidenceLocation = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type EvidenceItem = {
  text: string;
  type: string;
  risk_score: number;
  reason: string;
  location?: EvidenceLocation;
};

export type ToolCall = {
  tool: string;
  result: string;
};

export type AnalysisResult = {
  risk_level: RiskLevel;
  overall_risk_score: number;
  scenario: string;
  summary: string;
  manipulation_chain: string[];
  evidence: EvidenceItem[];
  tool_timeline: string[];
  tool_calls: ToolCall[];
  agent_actions: string[];
  verification_checklist: string[];
  safe_reply: string;
  evidence_summary: string;
  bodyguard_mode: boolean;
  source: "qwen" | "fallback";
  primary_risk_level?: RiskLevel;
  image_review_basis?: "qwen_extracted" | "sample_transcript";
  independent_review?: IndependentReview;
  reconciliation?: "agreement" | "disagreement" | "unavailable";
};

export type DemoCase = {
  id: string;
  title: string;
  label: string;
  description: string;
  text: string;
  image?: string;
  images?: string[];
  result: AnalysisResult;
};

export type PatternRecord = {
  pattern_id: string;
  scenario: string;
  language: string;
  manipulation_chain: string[];
  phrases: string[];
  risk_level: RiskLevel;
  severity: number;
  recommended_actions: string[];
  source: string;
};

export type IndependentReview = { status: "completed"; risk_level: RiskLevel; supported_signals: string[]; unsupported_claims: string[]; missing_information: string[]; review_summary: string; recommended_verification: string[]; };

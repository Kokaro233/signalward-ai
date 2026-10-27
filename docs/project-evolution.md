# Project evolution
SignalWard is derived from https://github.com/Kokaro233/lucid-cognitive-triage-agent (LUCID), previously submitted to Google Cloud Rapid Agent Hackathon. Preserve the MIT license and Git ancestry.

Inherited: Next.js application, multilingual console, screenshot workflow, illustrative cases, saved reports, safe actions, MongoDB pattern utilities.

New work: Qwen OpenAI-compatible adapter replacing the checked-out Gemini adapter; Nebius NVIDIA Nemotron reviewer; blinded risk-conclusion input; JSON validation; deterministic higher-caution reconciliation; explicit review failures; review UI; SignalWard branding; evaluation fixtures and automated checks.

The original public repository contained the Gemini baseline while the newer local LUCID build had already moved to Qwen. SignalWard now uses the local build's verified configuration convention: `qwen3-vl-plus`, the mainland DashScope compatible endpoint, and support for both `QWEN_API_KEY` and `DASHSCOPE_API_KEY`. Live account credentials still need to be supplied at deployment time.

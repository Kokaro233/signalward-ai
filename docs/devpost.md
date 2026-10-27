# SignalWard — Devpost draft

## Tagline

Don't just detect. Double-check.

## Inspiration

Scams often work before money changes hands: fear, authority, urgency, and isolation make independent verification feel dangerous. SignalWard is built for that moment. It helps a user pause, inspect the evidence, and choose a safer next step without contacting the sender or acting on the user's behalf.

## What it does

SignalWard accepts messages, URLs, screenshots, and call transcripts. Qwen performs the primary multimodal analysis and extracts concrete evidence. NVIDIA Nemotron, served through Nebius Token Factory, independently reviews the original text and Qwen-extracted evidence without receiving Qwen's risk label or score. A deterministic reconciliation layer shows agreement, disagreement, missing information, and reviewer failure instead of hiding uncertainty behind one confidence number.

The result includes a calibrated risk level, evidence cards, verification steps, a safe reply, and a shareable evidence summary. Saved reports remain in the browser. SignalWard does not open submitted URLs, send messages, report anyone automatically, or claim to verify identity or truth.

## How we built it

- Next.js 15, React 19, and TypeScript
- Qwen `qwen3-vl-plus` through DashScope's OpenAI-compatible API for text and screenshot understanding
- NVIDIA Nemotron through the Nebius Token Factory OpenAI-compatible API for blinded evidence review
- Deterministic TypeScript reconciliation that retains the higher caution level while visibly flagging disagreement
- Optional MongoDB Pattern Memory for anonymized scam-pattern retrieval
- Local browser storage for reports the user explicitly saves

For screenshots, Nemotron reviews text and evidence extracted by Qwen; it does not independently see the image. The product states this limitation in the interface and documentation.

## What is new for this project

SignalWard evolves from the earlier LUCID cognitive-triage project. The inherited foundation includes the Next.js interface, multilingual investigation flow, screenshot workflow, illustrative cases, saved reports, safe actions, and MongoDB utilities.

New work includes the SignalWard brand and product structure, the Qwen adapter aligned with the current local LUCID configuration, the NVIDIA Nemotron reviewer, blinded reviewer input, strict JSON validation, deterministic disagreement handling, explicit primary-only failure states, independent-review UI, and reproducible evaluation fixtures. Full provenance is documented in `docs/project-evolution.md`.

## Challenges

The main challenge was making the second model meaningfully independent. Sending Nemotron Qwen's final score would anchor the review, so the reviewer receives only original text, extracted evidence phrases, and an explicit disclosure when those phrases came from an image Nemotron could not see. Another challenge was handling model failure honestly: SignalWard labels the result as primary-only rather than substituting a static report.

## Accomplishments

- Agreement, disagreement, and unavailable-review states are all represented explicitly.
- High-risk disagreements do not silently lower the safety recommendation.
- Inputs are bounded, model outputs are schema-validated, keys remain server-side, and suspicious URLs are never fetched.
- Mocked transport tests cover reconciliation combinations, malformed output rejection, reviewer blinding, and screenshot-dependency disclosure.

## What we learned

Two models agreeing is not proof. A useful safety product must expose what evidence is supported, what remains unverified, and where both models share the same upstream dependency. The most valuable output is often a concrete verification step rather than a more confident label.

## What's next

Run the 12-case live evaluation with recorded model IDs and dates, expand language coverage, calibrate false-positive handling with user research, and add privacy-preserving export for trusted-person review.

## Demo storyboard (under three minutes)

1. Show a normal message that remains low risk.
2. Run an authority-impersonation screenshot through Qwen and Nemotron.
3. Open the independent-review panel and explain the screenshot dependency.
4. Run an ambiguous case and show model disagreement without hiding it.
5. End with the verification checklist and user-controlled action.

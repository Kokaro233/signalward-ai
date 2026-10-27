# SignalWard
Don’t just detect. Double-check.

An evolution of LUCID for independent scam evidence review. Qwen analyzes text/screenshots; NVIDIA Nemotron via Nebius reviews original text and extracted evidence without receiving the primary risk verdict. A deterministic coordinator exposes disagreements and retains the higher caution level. AI judgments are not verification of identity or facts.

## Run
Node 20+; `npm ci`; copy `.env.example` to `.env.local`; set the Qwen and Nebius API keys. The inherited Qwen setup uses `qwen3-vl-plus`; override `QWEN_MODEL` only if your account exposes a different vision model. Run `npm run models:nebius` to list the exact Nemotron IDs available to the configured Nebius account, then set `NEBIUS_MODEL`. Start with `npm run dev`.

`npm test`, `npm run typecheck`, `npm run build`.

## Configuration and boundaries
Keys stay server-side. `QWEN_API_KEY` and the legacy `DASHSCOPE_API_KEY` name are both supported. The default Qwen endpoint is the mainland China DashScope OpenAI-compatible endpoint used by the current LUCID build; change it if your account uses another region. Confirm the Nemotron model through the authenticated Nebius model list; there is intentionally no guessed default ID.

Analysis failures return 503; independent review failures return a clearly labeled primary-only report. Case inputs run the live pipeline; static reports are labeled samples. Nemotron sees extracted text rather than images. Extracted image content is a shared dependency, so review is not independent visual verification. No suspicious URL is fetched. Local saved reports remain browser-local. Model providers receive submitted evidence: remove private information first.

## Provenance
Derived from [LUCID](https://github.com/Kokaro233/lucid-cognitive-triage-agent), previously submitted to Google Cloud Rapid Agent Hackathon. See [project evolution](docs/project-evolution.md) for inherited and new work. Rebranding does not change that provenance. Preserve the MIT license.

## Evaluation and release
See [evaluation](docs/evaluation.md). Synthetic fixtures and mocked tests are not evidence of improved accuracy. Before contest submission: validate live credentials, run text and image tests, deploy a separate demo, record a real walkthrough, and complete submission materials.

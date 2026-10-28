# Deployment

Deploy SignalWard as a separate Next.js 15 application on Vercel or another Node.js 20+ host. The existing LUCID deployment remains unchanged.

## Required server variables

- `QWEN_API_KEY` (or `DASHSCOPE_API_KEY`)
- `QWEN_MODEL=qwen3-vl-plus`
- `QWEN_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1`
- `NEBIUS_API_KEY`
- `NEBIUS_MODEL` (choose an ID returned by `npm run models:nebius`)
- `NEBIUS_BASE_URL=https://api.tokenfactory.nebius.com/v1`

Supabase is optional. If used, configure `SUPABASE_URL` and the server-only `SUPABASE_SERVICE_ROLE_KEY`, then run `docs/supabase-schema.sql` once in the Supabase SQL editor.

Keep every key server-side and never commit `.env.local`. Allow at least 110 seconds for the two sequential inference requests. Before recording the demo, run a real text case, a real screenshot case, and a forced reviewer-failure case so the UI visibly distinguishes full dual-model review from primary-only analysis.

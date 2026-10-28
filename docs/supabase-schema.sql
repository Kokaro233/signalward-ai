create table if not exists public.patterns (
  pattern_id text primary key,
  scenario text not null,
  language text not null default 'en',
  manipulation_chain jsonb not null default '[]'::jsonb,
  phrases jsonb not null default '[]'::jsonb,
  risk_level text not null check (risk_level in ('Green', 'Yellow', 'Orange', 'Red')),
  severity integer not null default 50 check (severity between 0 and 100),
  recommended_actions jsonb not null default '[]'::jsonb,
  source text not null,
  saved_at timestamptz not null default now(),
  storage_policy text not null default 'anonymized_pattern_only'
);

alter table public.patterns enable row level security;

-- No public policies are created. SignalWard accesses this table only from
-- server routes using SUPABASE_SERVICE_ROLE_KEY. Never expose that key client-side.

create index if not exists patterns_severity_idx on public.patterns (severity desc);

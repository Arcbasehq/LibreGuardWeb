-- Shared state between the browser extension and the website dashboard.
-- One row per user; the dashboard acts as a remote control panel and the
-- extension reflects changes (and reports its own state back).

create table if not exists public.extension_settings (
  user_id             uuid primary key references auth.users(id) on delete cascade,
  enabled             boolean     not null default true,
  block_trackers      boolean     not null default true,
  block_malware       boolean     not null default true,
  show_badge          boolean     not null default true,
  auto_update         boolean     not null default true,
  whitelisted_domains text[]      not null default '{}',
  custom_selectors    text        not null default '',
  total_blocked       bigint      not null default 0,
  today_blocked       bigint      not null default 0,
  -- who made the most recent settings change: 'extension' or 'dashboard'.
  -- lets each side avoid re-applying its own writes.
  updated_by          text        not null default 'extension',
  updated_at          timestamptz not null default now(),
  -- heartbeat: when the extension last checked in.
  last_seen           timestamptz
);

alter table public.extension_settings enable row level security;

create policy "Users manage own extension settings"
  on public.extension_settings for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Broadcast row changes so the dashboard sees the extension's state live.
alter publication supabase_realtime add table public.extension_settings;

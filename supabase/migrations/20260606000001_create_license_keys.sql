create table if not exists public.license_keys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  key text not null unique,
  created_at timestamptz not null default now()
);

create index if not exists idx_license_keys_user_id on public.license_keys(user_id);
create index if not exists idx_license_keys_key on public.license_keys(key);

alter table public.license_keys enable row level security;

create policy "Users can view own license key"
  on public.license_keys for select
  using (auth.uid() = user_id);

create or replace function validate_license_key(p_key text)
returns table(valid boolean, user_id uuid)
language plpgsql
security definer
set search_path = ''
as $$
begin
  return query
  select true, lk.user_id
  from public.license_keys lk
  where lk.key = p_key;
  
  if not found then
    return query select false, null::uuid;
  end if;
end;
$$;

grant execute on function validate_license_key(text) to anon;

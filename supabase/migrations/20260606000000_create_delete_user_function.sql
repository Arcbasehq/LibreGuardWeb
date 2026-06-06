-- Allow authenticated users to delete their own account.
-- Run this in your Supabase SQL editor or via `supabase migration up`.

create or replace function delete_user()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  delete from auth.users where id = auth.uid();
end;
$$;

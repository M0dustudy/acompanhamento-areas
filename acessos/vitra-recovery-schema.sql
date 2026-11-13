-- VITRA: recuperação autônoma da conta mestre com código aleatório de uso único.
-- O código em texto claro só é mostrado ao titular durante a emissão.
create table if not exists public.vitra_recovery_codes (
  user_id uuid primary key references auth.users(id) on delete cascade,
  code_hash text not null check (code_hash ~ '^[a-f0-9]{64}$'),
  created_at timestamptz not null default now(),
  used_at timestamptz
);
alter table public.vitra_recovery_codes enable row level security;
revoke all on public.vitra_recovery_codes from anon, authenticated, public;

alter table public.vitra_access_events
  drop constraint if exists vitra_access_events_event_check;
alter table public.vitra_access_events
  add constraint vitra_access_events_event_check
  check (event in ('login','logout','create_user','update_user','reset_password',
    'block_user','unblock_user','delete_user','recovery_code_created','recovery_password_reset'));

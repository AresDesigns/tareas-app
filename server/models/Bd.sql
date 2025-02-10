-- Migrations will appear here as you chat with AI

create table users (
  id bigint primary key generated always as identity,
  email text not null unique,
  name text,
  created_at timestamp with time zone default now()
);

create table tasks (
  id bigint primary key generated always as identity,
  title_task text not null,
  description_task text,
  date_task date not null,
  user_id bigint references users (id),
  created_at timestamp with time zone default now()
);

alter table users
add column password text not null;

create table boards (
  id bigint primary key generated always as identity,
  name text not null,
  user_id bigint references users (id),
  created_at timestamp with time zone default now()
);

alter table tasks
add column board_id bigint references boards (id);

alter table tasks
add column is_active boolean default true;

create table lists (
  id bigint primary key generated always as identity,
  name text not null,
  board_id bigint references boards (id),
  created_at timestamp with time zone default now()
);

alter table tasks
add column list_id bigint references lists (id);
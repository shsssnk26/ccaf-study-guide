# CCAF Study Guide

Zero to Agent: an unofficial study companion for the Claude Certified Architect – Foundations exam. It includes a diagnostic, lessons for all 30 task statements and two timed practice tests. Users can sign in to save their progress to an account.

Not affiliated with or endorsed by Anthropic.

Live: https://ccaf.zerotoagent.net

## Stack

- React + TypeScript, built with Vite, routed with React Router
- Supabase for email/password accounts and saved progress (one `progress` row per user, protected by row-level security)
- GitHub Pages with the custom domain `ccaf.zerotoagent.net` (Cloudflare CNAME to `shsssnk26.github.io`), deployed by `.github/workflows/deploy.yml` on every push to `main`

## Develop

```sh
npm install
npm run dev        # http://localhost:5173/
npm test           # unit tests (scoring, merge, catalog)
npm run build      # production build in dist/
```

Supabase settings live in `.env`. The publishable key is meant to be public; row-level security keeps each user's data private.

## Where things are

| Path | What |
|---|---|
| `src/data/domains/` | One folder per domain, each with one folder per task statement (`1.1-agentic-loops/`) holding `lesson.ts` and `questions.ts` |
| `src/data/tests/` | The two practice tests |
| `src/data/index.ts` | Gathers all content for the app |
| `src/lib/` | Catalog, scoring rules, progress storage and merge, Supabase client |
| `src/state/` | Auth, progress sync and practice-session providers |
| `src/pages/` | One component per screen |
| `src/components/` | Layout, sign-in dialog, shared UI |

To edit a lesson or question, open the task statement's folder, for example `src/data/domains/1-agentic-architecture-orchestration/1.3-subagent-invocation-and-context-passing/`, and change `lesson.ts` or `questions.ts`. Question ids come from each question's position in `questions.ts` (for example `1.3-2`). Saved progress is keyed by these ids, so add new questions at the end of the list and never reorder or delete them.

## Database

```sql
create table public.progress (
  user_id    uuid primary key references auth.users on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.progress enable row level security;
create policy "read own progress"   on public.progress for select using (auth.uid() = user_id);
create policy "insert own progress" on public.progress for insert with check (auth.uid() = user_id);
create policy "update own progress" on public.progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "delete own progress" on public.progress for delete using (auth.uid() = user_id);
```

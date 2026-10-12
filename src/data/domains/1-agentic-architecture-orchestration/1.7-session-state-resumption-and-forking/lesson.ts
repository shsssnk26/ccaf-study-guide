/* Lesson for 1.7 Session state, resumption and forking: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": "--resume",
      "meaning": "Continues a named session with its earlier conversation."
    },
    {
      "term": "fork_session",
      "meaning": "Branches one conversation into independent copies, to explore different approaches from the same starting point."
    },
    {
      "term": "Stale context",
      "meaning": "Earlier tool results that no longer match the files on disk."
    }
  ],
  "caption": "Resume, or start fresh",
  "code": "# Context still mostly valid: resume and say what changed\nclaude --resume billing-audit\n> auth/session.py and auth/tokens.py changed since last time. Re-read those two.\n\n# Most files changed: start a new session and inject a summary\nclaude\n> Context from an earlier investigation: <structured summary>",
  "antiPatterns": [
    {
      "move": "Resuming after a large refactor",
      "why": "The session reasons from old file contents and paths."
    },
    {
      "move": "Using fork_session to keep two instances' files apart",
      "why": "It branches the conversation only. Files need separate working directories."
    },
    {
      "move": "Resuming without saying what changed",
      "why": "The agent has no reason to re-read anything."
    }
  ]
};

/* Lesson for 3.6 Claude Code in CI/CD: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": "-p (--print)",
      "meaning": "Runs Claude Code once, without waiting for input, and prints the result."
    },
    {
      "term": "--json-schema",
      "meaning": "Used with --output-format json to enforce the shape of the output."
    },
    {
      "term": "Session isolation",
      "meaning": "A reviewer that does not share the author's conversation, so it does not inherit its reasoning."
    }
  ],
  "caption": "A review step in a pipeline (shell)",
  "code": "claude -p \"Review this diff for security issues\" \\\n  --output-format json \\\n  --json-schema \"$(cat review-schema.json)\" > findings.json",
  "antiPatterns": [
    {
      "move": "Parsing prose output with regular expressions",
      "why": "It breaks whenever the wording shifts."
    },
    {
      "move": "Reviewing code in the session that wrote it",
      "why": "It rarely questions its own decisions."
    },
    {
      "move": "Re-running a review without the earlier findings",
      "why": "The same comments are posted again."
    }
  ]
};

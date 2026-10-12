/* Lesson for 3.1 CLAUDE.md hierarchy: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": "User-level",
      "meaning": "~/.claude/CLAUDE.md: your own preferences, on your machine only."
    },
    {
      "term": "Project-level",
      "meaning": "CLAUDE.md in the repository: shared with every teammate and with CI."
    },
    {
      "term": "@import",
      "meaning": "A line that pulls another file into a CLAUDE.md, to keep it modular."
    }
  ],
  "caption": "Where instructions live",
  "code": "~/.claude/CLAUDE.md            personal, this machine only\nrepo/CLAUDE.md                 shared with the team and CI\nrepo/packages/api/CLAUDE.md    applies when working in that folder\n\n# inside a CLAUDE.md\n@docs/standards/testing.md",
  "antiPatterns": [
    {
      "move": "Team standards in a home-folder file",
      "why": "New teammates and CI never receive them."
    },
    {
      "move": "One 700-line CLAUDE.md",
      "why": "Hard to maintain. Split it into topic files under .claude/rules/."
    },
    {
      "move": "Assuming one level overrides another",
      "why": "All levels load together. Conflicting instructions should be fixed, not ranked."
    }
  ]
};

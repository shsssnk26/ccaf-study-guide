/* Lesson for 3.3 Path-specific rules: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": ".claude/rules/",
      "meaning": "A folder of rule files, one topic each."
    },
    {
      "term": "paths",
      "meaning": "A frontmatter field listing glob patterns. The rule loads only when a matching file is edited."
    },
    {
      "term": "Glob pattern",
      "meaning": "A path pattern such as **/*.test.tsx or terraform/**/*."
    }
  ],
  "caption": "A rule that follows test files anywhere",
  "code": ".claude/rules/testing.md\n---\npaths: [\"**/*.test.tsx\"]\n---\nUse the shared render helper. One behaviour per test.",
  "antiPatterns": [
    {
      "move": "A CLAUDE.md in every folder for a file-type convention",
      "why": "The convention follows the file type, not the folder."
    },
    {
      "move": "Expecting @import to load conditionally",
      "why": "Imported files always load."
    },
    {
      "move": "A skill for conventions that must apply automatically",
      "why": "Someone has to remember to invoke it."
    }
  ]
};

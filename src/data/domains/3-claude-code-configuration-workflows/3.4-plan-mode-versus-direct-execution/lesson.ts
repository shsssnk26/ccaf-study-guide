/* Lesson for 3.4 Plan mode versus direct execution: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": "Plan mode",
      "meaning": "Claude explores and proposes a plan without changing files, for you to approve."
    },
    {
      "term": "Direct execution",
      "meaning": "Claude makes the change straight away."
    },
    {
      "term": "Explore subagent",
      "meaning": "A read-only helper that investigates in its own context and returns a summary."
    }
  ],
  "caption": "Matching the mode to the task",
  "code": "One-function fix with a clear stack trace          Direct execution\nLibrary migration across 45+ files                 Plan mode, then execute\nTwo valid architectures to choose between          Plan mode\n\"Explain how refunds flow through this system\"     Explore subagent",
  "antiPatterns": [
    {
      "move": "Planning a one-line fix because the codebase is large",
      "why": "Judge the change, not the codebase."
    },
    {
      "move": "Direct execution on a broad change with unknown usage",
      "why": "Dependencies surface late and force rework."
    },
    {
      "move": "Plan mode for pure discovery",
      "why": "The reading fills your main context. Explore keeps it separate."
    }
  ]
};

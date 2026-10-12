/* Lesson for 2.5 Built-in tools: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": "Grep",
      "meaning": "Searches inside file contents for a pattern."
    },
    {
      "term": "Glob",
      "meaning": "Finds files whose paths match a pattern."
    },
    {
      "term": "Edit",
      "meaning": "Changes a file by matching text that must be unique in it."
    }
  ],
  "caption": "Which tool for which job",
  "code": "Find callers of a function        Grep   calculateTax(\nFind files by name                Glob   **/*.test.tsx\nChange one unique line            Edit\nEdit fails, text is not unique    Read the file, then Write it back\nUnderstand a flow                 Grep the entry point, Read it, follow imports",
  "antiPatterns": [
    {
      "move": "Reading every file up front",
      "why": "Context fills before the question is answered."
    },
    {
      "move": "Glob to search contents, or Grep to find file names",
      "why": "Each does the other's job badly."
    },
    {
      "move": "One Grep for a function that is re-exported under other names",
      "why": "Callers using the other names are missed. List every exported name first."
    }
  ]
};

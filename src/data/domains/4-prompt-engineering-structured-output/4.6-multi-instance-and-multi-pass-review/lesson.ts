/* Lesson for 4.6 Multi-instance and multi-pass review: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": "Independent review instance",
      "meaning": "A second session that sees the work but not the reasoning behind it."
    },
    {
      "term": "Per-file and cross-file passes",
      "meaning": "Local review of each file, then a separate pass on how they fit together."
    },
    {
      "term": "Verification pass",
      "meaning": "A second look that attaches a confidence level to each finding."
    }
  ],
  "caption": "A review pipeline",
  "code": "generate  ->  session A writes the patch\nreview    ->  session B gets the diff and project standards only\nverify    ->  each finding returns {issue, location, confidence}\nroute     ->  low confidence goes to a person, the rest is posted",
  "antiPatterns": [
    {
      "move": "\"Review your own work critically\" in the same session",
      "why": "It still holds the reasoning that produced the code."
    },
    {
      "move": "Extended thinking in place of independence",
      "why": "More thought from the same starting point."
    },
    {
      "move": "Running the same pass three times",
      "why": "Repetition is not a second opinion."
    }
  ]
};

/* Lesson for 5.5 Human review and confidence calibration: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": "Calibration",
      "meaning": "Checking, on labelled data, that a stated confidence matches real accuracy."
    },
    {
      "term": "Stratified sampling",
      "meaning": "Reviewing a random sample drawn from every document type, including auto-approved output."
    },
    {
      "term": "Field-level confidence",
      "meaning": "Confidence reported per field, so reviewers look only where it is low."
    }
  ],
  "caption": "Why the average is not enough",
  "code": "accuracy overall .............. 97%\n  invoices .................... 99%\n  receipts .................... 98%\n  handwritten forms ........... 81%   <- hidden by the average\n\nEach week: sample 2% of auto-approved extractions,\nspread across document types, and have a person check them.",
  "antiPatterns": [
    {
      "move": "Cutting review because the average is high",
      "why": "One document type or field may be failing badly."
    },
    {
      "move": "Trusting confidence that was never calibrated",
      "why": "The number means nothing until it is checked against labels."
    },
    {
      "move": "A higher threshold to catch confidently wrong output",
      "why": "Those errors are above any threshold."
    }
  ]
};

/* Lesson for 4.4 Validation, retry and feedback loops: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": "Retry with error feedback",
      "meaning": "Resend the document, the failed output and the specific error."
    },
    {
      "term": "Semantic validation",
      "meaning": "Checking that values make sense, beyond having the right shape."
    },
    {
      "term": "detected_pattern",
      "meaning": "A field recording what triggered a finding, so dismissals can be analysed."
    }
  ],
  "caption": "A retry prompt, and fields that check themselves",
  "code": "retry_prompt = f\"\"\"Document:\n{document}\n\nYour previous extraction:\n{failed_json}\n\nIt failed validation: {error}\nReturn a corrected extraction.\"\"\"\n\n\"stated_total\": 1180.00, \"calculated_total\": 1210.00, \"conflict_detected\": true",
  "antiPatterns": [
    {
      "move": "Retrying when the value is not in the document",
      "why": "No number of retries can supply missing information."
    },
    {
      "move": "Retrying without the error details",
      "why": "The model repeats the same mistake."
    },
    {
      "move": "\"Correcting\" source data so validation passes",
      "why": "It hides what the document actually says."
    }
  ]
};

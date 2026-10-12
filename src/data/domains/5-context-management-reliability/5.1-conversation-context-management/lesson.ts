/* Lesson for 5.1 Conversation context management: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": "Case facts block",
      "meaning": "A fixed section of exact values that is included in every prompt and never summarized."
    },
    {
      "term": "Progressive summarization",
      "meaning": "Compressing older turns again and again, which wears away numbers and dates."
    },
    {
      "term": "Lost in the middle",
      "meaning": "Models attend best to the start and end of long inputs."
    }
  ],
  "caption": "Keeping exact values out of the summary",
  "code": "CASE FACTS (do not summarize)\ncustomer_id: C-1001          order: 4471\nrefund_promised: $247.83     promised_by: 2026-10-03\nstatus: awaiting carrier confirmation\n\nSUMMARY OF EARLIER TURNS\n...",
  "antiPatterns": [
    {
      "move": "Exact amounts kept only in a running summary",
      "why": "They turn into \"a refund soon\"."
    },
    {
      "move": "Long tool output left untrimmed",
      "why": "Forty fields crowd out the five that matter."
    },
    {
      "move": "Key findings buried mid-document",
      "why": "They are the likeliest part to be missed."
    }
  ]
};

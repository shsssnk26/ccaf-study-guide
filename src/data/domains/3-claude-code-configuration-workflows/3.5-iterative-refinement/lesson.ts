/* Lesson for 3.5 Iterative refinement: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": "Input and output examples",
      "meaning": "Real inputs paired with the exact output you expect."
    },
    {
      "term": "Test-driven iteration",
      "meaning": "Write tests first, then share the failures to guide each fix."
    },
    {
      "term": "Interview pattern",
      "meaning": "Asking Claude to question you before building, to surface decisions you had not considered."
    }
  ],
  "caption": "Two examples that settle a field mapping",
  "code": "Input :  2026-03-04 ERROR user=42 msg=\"card declined\"\nOutput:  {\"ts\": \"2026-03-04\", \"level\": \"error\",\n          \"user\": {\"id\": 42}, \"message\": \"card declined\"}\n\nInput :  2026-03-04 INFO msg=\"ping\"\nOutput:  {\"ts\": \"2026-03-04\", \"level\": \"info\",\n          \"user\": null, \"message\": \"ping\"}",
  "antiPatterns": [
    {
      "move": "Rewording the prose a fourth time",
      "why": "Prose was read three different ways already. Show examples."
    },
    {
      "move": "Fixing interacting problems one message at a time",
      "why": "Each fix breaks the next. Send them together."
    },
    {
      "move": "Asking for an interview when requirements are known",
      "why": "The interview is for unknowns."
    }
  ]
};

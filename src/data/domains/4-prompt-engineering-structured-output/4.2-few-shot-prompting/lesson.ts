/* Lesson for 4.2 Few-shot prompting: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": "Few-shot example",
      "meaning": "A worked example placed in the prompt."
    },
    {
      "term": "Reasoning in examples",
      "meaning": "Each example says why that choice was made over the alternative."
    },
    {
      "term": "Generalization",
      "meaning": "The model applies the judgment to new cases, beyond the ones shown."
    }
  ],
  "caption": "Examples for an ambiguous request",
  "code": "Request: \"This doesn't fit, I want to send it back.\"\nAction:  offer_exchange\nWhy:     The problem is size, not the product. An exchange solves it,\n         so offer that first and refund only if they decline.\n\nRequest: \"It arrived broken and I don't want another one.\"\nAction:  process_refund\nWhy:     They have ruled out a replacement.",
  "antiPatterns": [
    {
      "move": "A long list of examples with no reasoning",
      "why": "It teaches pattern-matching, not judgment."
    },
    {
      "move": "More written instructions after instructions failed",
      "why": "Show worked examples instead."
    },
    {
      "move": "Examples for a problem that descriptions would fix",
      "why": "Fix overlapping tool descriptions first."
    }
  ]
};

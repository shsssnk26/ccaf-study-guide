/* Lesson for 4.5 Batch processing: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": "Message Batches API",
      "meaning": "Submits many requests at once for about half the cost, with results within 24 hours."
    },
    {
      "term": "custom_id",
      "meaning": "Your own label on each request, used to match results and resubmit failures."
    },
    {
      "term": "Processing window",
      "meaning": "How long you wait between batch submissions. Add it to the 24 hours when checking a deadline."
    }
  ],
  "caption": "Submitting a batch (Python)",
  "code": "batch = client.messages.batches.create(requests=[\n    {\"custom_id\": \"invoice-0001\",\n     \"params\": {\"model\": MODEL, \"max_tokens\": 1024,\n                \"messages\": [{\"role\": \"user\", \"content\": doc_1}]}},\n    # ...one entry per document\n])\n# Later: match each result to its request by custom_id,\n# then resubmit only the ones that failed.",
  "antiPatterns": [
    {
      "move": "Batch for a check that blocks a merge",
      "why": "There is no latency guarantee."
    },
    {
      "move": "Batching work that needs a tool call mid-request",
      "why": "A batch request cannot run a tool and continue."
    },
    {
      "move": "Resubmitting the whole batch after a few failures",
      "why": "Use custom_id to resend only the failures."
    }
  ]
};

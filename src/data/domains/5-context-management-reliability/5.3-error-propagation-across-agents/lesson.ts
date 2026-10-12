/* Lesson for 5.3 Error propagation across agents: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": "Local recovery",
      "meaning": "A subagent handles a transient failure itself before involving the coordinator."
    },
    {
      "term": "Structured error context",
      "meaning": "The failure type, what was tried, partial results and possible next steps."
    },
    {
      "term": "Access failure versus empty result",
      "meaning": "\"Could not reach the source\" is different from \"reached it and found nothing\"."
    }
  ],
  "caption": "What a subagent reports when it cannot recover",
  "code": "{\"status\": \"partial\",\n \"failure\": {\"type\": \"timeout\", \"source\": \"trade journal search\",\n             \"attempted\": [\"2 retries with backoff\", \"narrower query\"]},\n \"partial_results\": [\"...\"],\n \"suggested_next\": \"retry later or use the alternate source\"}",
  "antiPatterns": [
    {
      "move": "Returning \"search unavailable\" with no detail",
      "why": "The coordinator cannot make a recovery decision."
    },
    {
      "move": "An empty result marked as success",
      "why": "The failure disappears and the report has a silent gap."
    },
    {
      "move": "Ending the whole workflow over one failed source",
      "why": "Ship what you have and mark the gap."
    }
  ]
};

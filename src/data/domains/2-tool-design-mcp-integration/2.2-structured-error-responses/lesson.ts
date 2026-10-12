/* Lesson for 2.2 Structured error responses: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": "isError",
      "meaning": "The flag that tells the agent a tool call failed."
    },
    {
      "term": "errorCategory",
      "meaning": "The kind of failure: transient, validation, business or permission."
    },
    {
      "term": "isRetryable",
      "meaning": "Whether trying again could succeed."
    }
  ],
  "caption": "Three results the agent can tell apart",
  "code": "# Transient: worth retrying\n{\"isError\": True, \"errorCategory\": \"transient\", \"isRetryable\": True,\n \"message\": \"Order system timed out. Try again in a few seconds.\"}\n\n# Business rule: do not retry, explain to the customer\n{\"isError\": True, \"errorCategory\": \"business\", \"isRetryable\": False,\n \"message\": \"Refund exceeds the order amount.\"}\n\n# Not an error at all\n{\"found\": False, \"order_id\": \"9999\"}",
  "antiPatterns": [
    {
      "move": "\"Operation failed\" for everything",
      "why": "The agent cannot choose between retrying, explaining and escalating."
    },
    {
      "move": "An empty list for a timeout",
      "why": "A failure now looks like \"nothing matched\"."
    },
    {
      "move": "Hiding rate limits by retrying inside the server",
      "why": "The agent loses the chance to reorder or pause its remaining work."
    }
  ]
};

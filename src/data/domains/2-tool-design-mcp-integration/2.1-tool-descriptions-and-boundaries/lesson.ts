/* Lesson for 2.1 Tool descriptions and boundaries: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": "Tool description",
      "meaning": "The text the model reads to decide whether and how to use a tool."
    },
    {
      "term": "Boundary",
      "meaning": "A statement of when to use this tool and when to use a similar one instead."
    },
    {
      "term": "Overlap",
      "meaning": "Two tools whose names or descriptions could both fit the same request."
    }
  ],
  "caption": "A description that separates two similar tools",
  "code": "{\n  \"name\": \"lookup_order\",\n  \"description\": (\n      \"Look up one order by its order ID, e.g. 4471. Returns item, amount, \"\n      \"date and delivery status. Use for questions about a specific order. \"\n      \"To find or verify who the customer is, use get_customer instead. \"\n      \"An unknown ID returns found: false, which is not an error.\"),\n  \"input_schema\": {\"type\": \"object\",\n                   \"properties\": {\"order_id\": {\"type\": \"string\"}},\n                   \"required\": [\"order_id\"]},\n}",
  "antiPatterns": [
    {
      "move": "One-line descriptions for similar tools",
      "why": "The model has nothing to tell them apart."
    },
    {
      "move": "Building a routing layer first",
      "why": "Better descriptions are the smaller fix for the same cause."
    },
    {
      "move": "Keyword-heavy system prompt lines",
      "why": "A phrase like \"always analyze\" can pull every request toward one tool."
    }
  ]
};

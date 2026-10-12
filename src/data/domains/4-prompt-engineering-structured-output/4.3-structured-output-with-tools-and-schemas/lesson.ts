/* Lesson for 4.3 Structured output with tools and schemas: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": "Tool use for structured output",
      "meaning": "Define a tool whose input schema is the structure you want, then have the model call it."
    },
    {
      "term": "Nullable field",
      "meaning": "A field allowed to be null, for information the source may not contain."
    },
    {
      "term": "\"other\" plus detail",
      "meaning": "An extra enum value with a free-text field, for real values outside your list."
    }
  ],
  "caption": "A field that never forces a guess",
  "code": "\"payment_terms\": {\"type\": [\"string\", \"null\"],\n                  \"enum\": [\"net_30\", \"net_60\", \"due_on_receipt\",\n                           \"other\", \"unclear\", null]},\n\"payment_terms_detail\": {\"type\": [\"string\", \"null\"]}\n\n# not stated -> null | \"net 45\" -> other + detail | contradictory -> unclear",
  "antiPatterns": [
    {
      "move": "Marking every field required",
      "why": "The model invents values for information that is absent."
    },
    {
      "move": "Free text where categories are needed",
      "why": "\"PO\" and \"purchase order\" become two categories."
    },
    {
      "move": "Trusting the schema to catch wrong values",
      "why": "It checks shape. Totals that do not add up still pass."
    }
  ]
};

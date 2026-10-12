/* Drill questions for 4.3 Structured output with tools and schemas. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("4.3-1", "4.3-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "ex",
    "stem": "Incoming documents may be invoices, purchase orders or receipts. There is one extraction tool per type, and the type is not known in advance. With the default setting, about 3% of responses are prose descriptions of the document, which breaks the parser downstream. Which setting fits?",
    "options": [
      "tool_choice 'any', which requires a tool call and lets the model choose the matching tool",
      "tool_choice 'auto', with an instruction in the prompt never to reply in prose",
      "A forced tool_choice for the invoice tool, since invoices are the most common type",
      "tool_choice 'auto', with a retry whenever the response contains no tool call"
    ],
    "explanation": "'any' guarantees a tool call while leaving the choice of tool to the model, which is what an unknown document type needs. 'auto' permits prose however the prompt is worded, and forcing one tool mislabels the other two types."
  },
  {
    "scenario": "ex",
    "stem": "The schema marks warranty_period as a required string. For products whose documents never mention a warranty, the output contains values such as '1 year' or '12 months', which downstream systems then show to customers. What is the most appropriate fix?",
    "options": [
      "Make the field optional and nullable, so the model can return null when the document is silent",
      "Add a prompt instruction that the model must never guess a value",
      "Add a validation step that rejects the output and retries when the warranty cannot be confirmed",
      "Add few-shot examples of documents in which the warranty is clearly stated"
    ],
    "explanation": "A required field obliges the model to produce something, and that is the source of the invention. Allowing null removes the pressure. A retry asks again for a value that does not exist."
  },
  {
    "scenario": "ex",
    "stem": "After moving to tool use with a JSON schema, malformed-JSON failures dropped to zero. A week later an audit finds invoices whose line items do not add up to the total, and a few with the invoice date in the due_date field. A colleague says the schema should have prevented this. What is the accurate response?",
    "options": [
      "A schema guarantees structure, not meaning; sums and field placement need their own validation",
      "The schema is being skipped on some requests; setting tool_choice to 'any' will enforce it",
      "A strict schema does prevent these errors once every field is marked as required",
      "These are sampling errors, and a lower temperature will remove them"
    ],
    "explanation": "Tool use with a schema eliminates syntax errors. It cannot know that numbers should add up or that a valid date is in the wrong field. Semantic checks have to be added on top."
  }
];

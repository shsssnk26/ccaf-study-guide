/* Drill questions for 2.1 Tool descriptions and boundaries. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("2.1-1", "2.1-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "cs",
    "stem": "Logs show the agent calling get_customer when the customer has supplied an order number and asked about delivery. The descriptions read 'Retrieves customer information' and 'Retrieves order details'. Both tools accept an identifier string. What is the most effective first step?",
    "options": [
      "Rewrite both descriptions to state the input each expects, example queries, and when to use one over the other",
      "Add a pre-processing step that detects order numbers with a pattern and calls lookup_order directly, bypassing the model's choice",
      "Add ten few-shot examples of correct tool selection to the system prompt",
      "Merge the two tools into one lookup tool that accepts either kind of identifier"
    ],
    "explanation": "Tool descriptions are the main input to tool selection, and these two are nearly identical. Fixing them is the smallest change that addresses the cause; routing code, examples and a merge are heavier and belong later, if at all."
  },
  {
    "scenario": "ma",
    "stem": "The document analysis subagent has one tool, analyze_document, with the description 'Analyzes a document'. The coordinator uses it to extract data points, to summarize, and to check a claim against a source, and results vary between calls for the same document. What is the best redesign?",
    "options": [
      "Replace it with purpose-specific tools, each with its own defined inputs and outputs",
      "Keep the tool and add a 'mode' parameter whose three values are explained in one description",
      "Keep the tool and require the coordinator to state the intended use in each request",
      "Keep the tool and pass its output through a subagent that reformats it"
    ],
    "explanation": "One tool doing three jobs has no clear contract, so the model has to guess what a call will return. Purpose-specific tools make the choice and the output shape unambiguous."
  },
  {
    "scenario": "cs",
    "stem": "A line was added to the system prompt: 'Always check the customer record first.' Since then the agent calls get_customer even for general questions such as 'what is your return window?', where no customer is involved, adding a wasted call and sometimes a request for identification. Where should you look first?",
    "options": [
      "At the system prompt wording, which has created an unintended tool association, and narrow it to account-specific requests",
      "At the get_customer description, shortening it so that the tool appears less relevant to general questions",
      "At the tool list, removing get_customer whenever a conversation opens with a general question",
      "At the few-shot examples, adding one in which a policy question is answered without any tool call"
    ],
    "explanation": "Tool selection is shaped by the system prompt as well as by descriptions, and a broad keyword-heavy instruction can override good descriptions. Fix the instruction that caused the behaviour before adding machinery around it."
  }
];

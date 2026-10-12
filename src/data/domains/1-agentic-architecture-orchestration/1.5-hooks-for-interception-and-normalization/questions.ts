/* Drill questions for 1.5 Hooks for interception and normalization. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("1.5-1", "1.5-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "cs",
    "stem": "Three backend tools report order status in different forms: lookup_order returns a number (3), the billing tool a code ('SHP'), and the returns tool a word. The agent told a customer an order was 'in transit' when status 3 meant delivered. You need consistent interpretation whichever tool is called. What is the most reliable approach?",
    "options": [
      "A hook that runs after each tool call and rewrites the status into one canonical form before the model reads the result",
      "A table in the system prompt that maps every numeric and coded status to its meaning",
      "Few-shot examples that show the agent interpreting each of the three formats correctly",
      "An instruction to call a dedicated status-translation tool after every lookup, and to wait for its result before replying to the customer"
    ],
    "explanation": "A hook on tool results applies the conversion in code on every call. A mapping table, examples and an extra tool all rely on the model performing or requesting the conversion each time."
  },
  {
    "scenario": "dp",
    "stem": "The agent generates and edits Python files across a repository. The team requires every file the agent touches to pass the formatter, without relying on the agent to remember. You are adding a hook that runs the formatter. Where should it be attached?",
    "options": [
      "After the Write and Edit tools complete, operating on the file that now exists on disk",
      "Before the Write and Edit tools run, so that the content is formatted before it is saved",
      "Before the Read tool runs, so that files are formatted when the agent next opens them",
      "At the end of the session, running once across the whole repository"
    ],
    "explanation": "Formatting processes a tool's output, so it belongs after the tool. A hook before the call is the place to validate or block. A whole-repository pass at session end reformats files the agent never touched."
  },
  {
    "scenario": "cs",
    "stem": "Refunds above $500 need human approval, so you add a hook that denies process_refund above that amount. It works, but when it fires the agent tells the customer 'I am unable to process this' and the conversation ends there. What is the best refinement?",
    "options": [
      "Have the denial state the reason and direct the agent to escalate_to_human, so the blocked call becomes a handoff",
      "Remove the hook and put the $500 limit in the system prompt, so the agent can explain it in its own words",
      "Move the hook to run after the refund, and have it reverse any refund that turns out to be above the limit",
      "Have the hook reduce the amount to $500 and let the call proceed, so the customer receives something at once"
    ],
    "explanation": "A blocking hook should redirect to the compliant path as well as stop the violating one. Moving the rule back into the prompt gives up the guarantee, and acting after the refund means the money has already moved."
  }
];

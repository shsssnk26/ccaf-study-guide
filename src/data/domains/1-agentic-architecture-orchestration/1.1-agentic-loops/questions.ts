/* Drill questions for 1.1 Agentic loops. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("1.1-1", "1.1-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "cs",
    "stem": "Your loop treats any response that contains a text block as the final answer. In production logs, about 6% of conversations end with the agent saying 'Let me look up that order for you' and nothing more; the same response also contained a lookup_order request that was never executed. Which change addresses the root cause?",
    "options": [
      "Branch on stop_reason: execute the requested tools and continue when it is tool_use, and finish only when it is end_turn",
      "Keep the current check, but re-prompt the agent with 'please continue' whenever its text ends without answering the customer",
      "Instruct the agent in the system prompt never to write text in the same response as a tool request",
      "Raise the maximum number of iterations so the agent has enough turns to complete its lookups"
    ],
    "explanation": "One response can carry text and a tool request together, so the presence of text says nothing about completion. stop_reason is the structured signal. Re-prompting and prompt rules work around the bug, and the iteration count was never the limit."
  },
  {
    "scenario": "cs",
    "stem": "To make latency predictable, a teammate replaced the model-driven loop with code that calls get_customer, then lookup_order, then process_refund for every message. Since the change, password questions wait through three tool calls, and customers asking about two orders get an answer about one. What is the most appropriate correction?",
    "options": [
      "Let the model choose the next tool from the conversation, and enforce only the steps that must be ordered",
      "Keep the fixed sequence and add a classifier that routes simple questions around it",
      "Keep the fixed sequence, and run lookup_order once for every order number that appears in the customer's message",
      "Keep the fixed sequence and shorten the tool descriptions so each call completes faster"
    ],
    "explanation": "A hard-coded sequence over-calls on simple requests and under-calls on complex ones, because it has replaced the model's decision about what to do next. The other options keep patching the sequence one case at a time."
  },
  {
    "scenario": "dp",
    "stem": "An engineer wrote a custom loop that executes each requested tool and then, to save tokens, sends a new request containing only the latest tool result. The agent re-reads the same three files again and again and never reaches an answer. What is the fix?",
    "options": [
      "Append each assistant response and its tool results to the history, and send the full history each time",
      "Add a line to the system prompt listing the files already read, and update it after every tool call",
      "Cap the loop at ten iterations and return whatever the agent has produced when the cap is reached",
      "Cache file contents inside the Read tool so that repeated reads return instantly and cost less"
    ],
    "explanation": "The model has no memory between requests; the conversation history is how it knows what it has already done. Dropping it makes every turn start from nothing. A cap or a cache treats the symptom."
  }
];

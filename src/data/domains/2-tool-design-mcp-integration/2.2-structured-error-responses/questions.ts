/* Drill questions for 2.2 Structured error responses. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("2.2-1", "2.2-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "cs",
    "stem": "process_refund returns the string 'Operation failed' for every failure. When a refund exceeds the policy limit, the agent retries three times and then apologizes for a technical problem. When the payment service is briefly down, it behaves in exactly the same way. What should the tool return?",
    "options": [
      "A structured error with a category, a flag saying whether a retry can help, and an explanation",
      "The same message with the upstream HTTP status code appended in brackets",
      "A longer message that tells the agent not to retry unless it is confident that a retry will succeed",
      "An empty success result for policy violations, so that the retry loop does not start"
    ],
    "explanation": "The agent can only choose a sensible recovery if it knows what kind of failure occurred and whether retrying can help. A status code or a longer sentence still leaves it guessing, and a false success hides the failure."
  },
  {
    "scenario": "ma",
    "stem": "The web search tool returns an empty list when no pages match and also when the search provider times out. The synthesis subagent has started writing sentences such as 'no published research exists on this topic' after timeouts. What should change?",
    "options": [
      "Return an empty list as a normal success for no matches, and a structured, retryable error for a timeout",
      "Return an error in both cases, so the coordinator investigates every empty result",
      "Retry every empty result three times inside the tool before returning an empty list, so that timeouts rarely reach the agent",
      "Log timeouts for the operators and continue to return an empty list to the agent"
    ],
    "explanation": "'Nothing matched' is a valid answer and a timeout is a failure; the agent must be able to tell them apart. Treating both as errors, or both as empty, keeps the confusion in one direction or the other."
  },
  {
    "scenario": "cs",
    "stem": "lookup_order fails for orders from a newly acquired brand, because the agent's service account has no access to that system. The tool returns only 'Error'. The agent retries twice and then tells the customer that the order does not exist. What should the tool return in this case?",
    "options": [
      "An error marked as a permission failure and not retryable, so the agent can explain and escalate",
      "An empty order list, since from the agent's side the order genuinely cannot be found",
      "The same generic message, but only after the tool has retried internally with exponential backoff",
      "A success response containing a note that asks the agent to avoid saying the order does not exist"
    ],
    "explanation": "A permission failure is not transient and is not an empty result. Telling the agent the category and that retrying will not help lets it stop, say something true, and hand off."
  }
];

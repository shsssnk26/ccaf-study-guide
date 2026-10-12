/* Drill questions for 1.4 Workflow enforcement and handoff. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("1.4-1", "1.4-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "cs",
    "stem": "Policy requires identity verification through get_customer before any refund. The system prompt states this in capital letters with three examples. An audit still finds that 4% of refunds were issued with no prior verification, mostly when the customer supplied an order number in their first message. Which change eliminates these cases?",
    "options": [
      "A programmatic prerequisite that rejects process_refund until get_customer has returned a verified customer in the session",
      "A few-shot example covering the specific case in which the customer supplies an order number in the opening message of the conversation",
      "A restatement of the verification rule at both the start and the end of the system prompt",
      "A post-conversation audit that flags unverified refunds for the finance team to reverse"
    ],
    "explanation": "Prompt instructions lower a failure rate but never bring it to zero. When an order of operations must always hold, enforce it in code before the tool runs. An audit finds the problem after the money has moved."
  },
  {
    "scenario": "cs",
    "stem": "When the agent escalates, the case appears in a queue. Human agents see a single ticket and have no access to the conversation transcript. They report spending the first minutes of each case asking customers to repeat themselves. What should escalate_to_human send?",
    "options": [
      "A structured summary: customer and order identifiers, what was verified, the root cause found, and the recommended action",
      "The complete transcript, including every tool call and tool result in the order they happened, so that nothing the customer said is lost",
      "The customer's last three messages quoted exactly, together with a sentiment score",
      "A one-line reason for the escalation and a link to the customer's account page"
    ],
    "explanation": "The human needs enough to act at once. A structured handoff carries the facts and the recommendation; a raw transcript makes them reconstruct the case, and the shorter options leave out what the agent already established."
  },
  {
    "scenario": "cs",
    "stem": "A customer writes: 'My order arrived damaged, I was billed twice for it, and I need to change the email on my account.' The agent resolves the damage claim thoroughly and closes the conversation. Logs show the same pattern for most messages with several issues. What is the best change?",
    "options": [
      "Have the agent split the message into separate concerns, work each one with shared customer context, and send one combined reply",
      "Ask customers to raise one issue per conversation, and have the agent explain that rule whenever several issues arrive together",
      "Escalate every message that contains more than one issue, since such cases are too complex to automate",
      "Raise the iteration limit so that the agent has enough turns to notice the remaining issues"
    ],
    "explanation": "Multi-concern requests need explicit decomposition, then a single synthesized answer. Pushing the work back to the customer or to a human gives up resolutions the agent could make, and the iteration limit was never the constraint."
  }
];

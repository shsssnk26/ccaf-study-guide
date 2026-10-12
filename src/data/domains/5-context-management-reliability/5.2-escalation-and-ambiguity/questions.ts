/* Drill questions for 5.2 Escalation and ambiguity. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("5.2-1", "5.2-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "cs",
    "stem": "A customer's first message reads: 'I need to change the delivery address on my order, and I want to speak to a person, please.' The agent could change the address with a single tool call. What should it do?",
    "options": [
      "Escalate to a human now, passing along the details of the request",
      "Change the address first, then ask whether the customer still wants a person",
      "Explain that it can make this change immediately and ask whether that would be acceptable",
      "Collect the order details and verify the customer's identity before handing off"
    ],
    "explanation": "An explicit request for a human is honoured immediately, however simple the issue. Resolving first or negotiating overrides what the customer asked for, and investigating before the handoff delays it."
  },
  {
    "scenario": "cs",
    "stem": "The refund policy covers damaged and incorrect items. A customer asks for compensation because a delivery arrived nine days late, which the policy does not address. The agent has confirmed the delay with lookup_order. What should it do?",
    "options": [
      "Escalate, because the policy does not cover the request",
      "Offer the standard credit for damaged items, as the closest matching case",
      "Decline politely, because the policy does not provide for late deliveries",
      "Ask the customer for evidence of the inconvenience before deciding"
    ],
    "explanation": "Where policy is silent, both granting and refusing invent policy. That decision belongs to a human. The delay is already confirmed, so asking for evidence only postpones the same decision."
  },
  {
    "scenario": "cs",
    "stem": "A customer gives only the name 'J. Patel'. get_customer returns three matching accounts. At present the agent picks the account with the most recent order and carries on. What should it do?",
    "options": [
      "Ask the customer for another identifier, such as an email address or postcode",
      "Keep picking the most recent account, but tell the customer which one it chose",
      "Escalate to a human, since the agent cannot resolve an ambiguous identity",
      "Run lookup_order on all three accounts and choose the one whose orders fit the complaint"
    ],
    "explanation": "With several matches, ask for more identifying information. Choosing by a heuristic risks acting on the wrong person's account, and escalation is unnecessary when one question resolves it."
  }
];

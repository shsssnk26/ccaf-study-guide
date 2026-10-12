/* Lesson for 1.4 Workflow enforcement and handoff: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": "Programmatic prerequisite",
      "meaning": "Code that blocks a tool until an earlier step has succeeded."
    },
    {
      "term": "Deterministic versus probabilistic",
      "meaning": "Code always enforces a rule. A prompt makes the right behaviour likely, not certain."
    },
    {
      "term": "Structured handoff",
      "meaning": "The summary a human receives at escalation: who the customer is, the root cause, and what to do next."
    }
  ],
  "caption": "A gate in plain Python",
  "code": "verified = set()          # customer ids confirmed in this session\n\ndef before_tool(name, args):\n    if name == \"process_refund\" and args[\"customer_id\"] not in verified:\n        return {\"blocked\": True,\n                \"reason\": \"Call get_customer first to verify this customer.\"}\n    return {\"blocked\": False}",
  "antiPatterns": [
    {
      "move": "A stronger system prompt for a rule with financial consequences",
      "why": "Prompt instructions fail some of the time. Money needs a guarantee."
    },
    {
      "move": "Few-shot examples to enforce tool order",
      "why": "Still probabilistic."
    },
    {
      "move": "Escalating with \"customer needs help\"",
      "why": "The human has no transcript and must start again."
    }
  ]
};

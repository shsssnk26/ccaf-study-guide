/* Lesson for 5.2 Escalation and ambiguity: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": "Escalation trigger",
      "meaning": "A condition that should send the case to a human."
    },
    {
      "term": "Policy gap",
      "meaning": "A request the policy does not address either way."
    },
    {
      "term": "Disambiguation",
      "meaning": "Asking for another identifier when more than one record matches."
    }
  ],
  "caption": "What to do in each situation",
  "code": "Customer asks for a human           Escalate now, no investigation first\nPolicy is silent on the request     Escalate\nCannot make meaningful progress     Escalate\nFrustrated, and the issue is fixable    Acknowledge, fix, escalate if they ask\nSeveral customers match             Ask for another identifier",
  "antiPatterns": [
    {
      "move": "Escalating on negative sentiment",
      "why": "Sentiment does not measure how hard the case is."
    },
    {
      "move": "Using the model's own confidence score as the trigger",
      "why": "Self-reported confidence is poorly calibrated."
    },
    {
      "move": "Approving or declining when policy says nothing",
      "why": "Either way the agent invents a policy."
    }
  ]
};

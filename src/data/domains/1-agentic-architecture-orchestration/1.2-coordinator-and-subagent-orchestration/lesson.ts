/* Lesson for 1.2 Coordinator and subagent orchestration: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": "Hub and spoke",
      "meaning": "One coordinator in the middle. All communication between subagents passes through it."
    },
    {
      "term": "Decomposition",
      "meaning": "How the coordinator breaks a request into subtasks. Too narrow, and whole areas go uncovered."
    },
    {
      "term": "Iterative refinement",
      "meaning": "The coordinator reviews the synthesis for gaps, re-delegates targeted work, and synthesizes again."
    }
  ],
  "caption": "What a coordinator does on each request",
  "code": "1. Read the request and list the areas it must cover.\n2. Choose only the subagents this request needs.\n3. Give each one a distinct scope (a subtopic or a source type).\n4. Collect every result, then check the whole for gaps.\n5. Re-delegate targeted follow-ups, then synthesize.",
  "antiPatterns": [
    {
      "move": "Running the full pipeline for every request",
      "why": "A simple request pays for stages it does not need."
    },
    {
      "move": "Blaming a downstream agent for missing topics",
      "why": "If the subtasks were too narrow, the fault is the coordinator's decomposition."
    },
    {
      "move": "Letting subagents message each other directly",
      "why": "You lose observability and consistent error handling."
    }
  ]
};

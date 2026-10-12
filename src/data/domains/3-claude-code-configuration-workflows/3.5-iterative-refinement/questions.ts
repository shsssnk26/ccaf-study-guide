/* Drill questions for 3.5 Iterative refinement. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("3.5-1", "3.5-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "cg",
    "stem": "An engineer has described a log-to-event transformation in prose three times, each more detailed than the last. Each attempt produced code with a different mapping for the nested 'meta' fields. The engineer knows exactly what the output should be. What should they provide next?",
    "options": [
      "Two or three real log lines, each paired with the exact event it should produce",
      "A JSON schema describing the structure of the output event",
      "A request for Claude to interview them about the requirements",
      "A fourth description that defines each of the nested fields in more detail"
    ],
    "explanation": "When prose keeps being read differently, concrete input and output pairs communicate the mapping best. A schema checks the shape but not which source field goes where, and the interview pattern is for requirements that are not yet known."
  },
  {
    "scenario": "cg",
    "stem": "An engineer is asked to add rate limiting to a public API. They have never built it and are not sure what needs deciding: per user or per key, what a blocked client sees, how bursts are treated. What should happen before any code is written?",
    "options": [
      "Ask Claude to interview them about the requirements and the failure behaviour",
      "Provide three example requests with the responses they expect",
      "Write the tests first and iterate until they pass",
      "Ask Claude to implement a standard version, then adjust it once problems show up"
    ],
    "explanation": "The gap is decisions the engineer has not yet identified. The interview pattern surfaces them. Examples and tests both require the answers already, and building first pushes the decisions into rework."
  },
  {
    "scenario": "cg",
    "stem": "Claude wrote a date-parsing function. The engineer has replied 'it still does not work, please fix it' three times, and each attempt has broken a different input format. What should the engineer do instead?",
    "options": [
      "Write tests for the expected cases, run them, and share the specific failures each round",
      "Repeat the request with stronger wording, and ask Claude to take more care on this attempt",
      "Start a new session and describe the function again from the beginning",
      "Ask Claude to explain its code line by line before it makes the next attempt"
    ],
    "explanation": "Test-driven iteration gives Claude a precise target and precise feedback. 'It does not work' carries no information about which case failed, so each fix is a guess."
  }
];

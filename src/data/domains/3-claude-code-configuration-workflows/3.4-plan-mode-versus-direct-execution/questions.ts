/* Drill questions for 3.4 Plan mode versus direct execution. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("3.4-1", "3.4-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "cg",
    "stem": "The team has decided to replace its date library with a newer one. The old library is used in 47 files, and nobody knows how many usage patterns exist or which of them touch time zones. An engineer is about to start. What is the best way to proceed?",
    "options": [
      "Use plan mode to map the usage and design the migration, then switch to direct execution",
      "Use direct execution from the start, because the choice of library has already been made",
      "Stay in plan mode for the entire task, including the edits to all 47 files",
      "Hand the migration to the Explore subagent, so the edits stay out of the main context"
    ],
    "explanation": "The decision about which library is settled; how to migrate safely across unknown patterns is not. Plan mode is for that investigation and design. Explore is read-only discovery, and edits happen in direct execution."
  },
  {
    "scenario": "cg",
    "stem": "An engineer in their first week is asked to fix a crash. The stack trace points to one function that is missing a null check, and a failing test reproduces it. They are unsure whether to use plan mode, since they do not know the codebase. What is the best approach?",
    "options": [
      "Direct execution, because the change is well understood and confined to one function",
      "Plan mode, because the engineer is unfamiliar with the codebase",
      "The Explore subagent to map the surrounding module, followed by plan mode for the fix itself",
      "Plan mode for the fix, then direct execution to update the test"
    ],
    "explanation": "Choose the mode from the change, not from who is making it. A clear, single-function fix with a reproducing test has no architectural decision to plan."
  },
  {
    "scenario": "cg",
    "stem": "A multi-phase task begins with finding every place a feature flag is read, across several hundred files. The engineer worries that the discovery output will crowd out the context needed for the later design phases. What is the best approach?",
    "options": [
      "Run the discovery in the Explore subagent and bring back only a summary",
      "Run the discovery in the main session, then use /compact before the design phases begin",
      "Skip the discovery and begin the design, looking up flag usages only as they come up",
      "Run the discovery in direct execution, since plan mode is unable to read files"
    ],
    "explanation": "The Explore subagent isolates verbose discovery in its own context and returns a summary, which keeps the main conversation clear for later phases. Compacting afterwards loses detail from the whole session, not only the noise."
  }
];

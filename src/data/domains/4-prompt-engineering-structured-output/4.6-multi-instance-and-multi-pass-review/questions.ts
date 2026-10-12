/* Drill questions for 4.6 Multi-instance and multi-pass review. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("4.6-1", "4.6-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "ci",
    "stem": "One Claude Code session writes a patch and then reviews its own work before the pull request opens. It approves nearly everything, including a patch that later failed in production. Adding 'be highly critical' to the review step made no difference. What should change?",
    "options": [
      "Run the review in a separate instance that does not have the generating session's reasoning",
      "Run /compact between generating and reviewing, so the session starts the review with a lighter context",
      "Have the same session review three times and block on any disagreement between passes",
      "Enable extended thinking for the review step so that it examines the patch more deeply"
    ],
    "explanation": "A session keeps the reasoning that produced the code and tends to confirm it. An independent instance sees only the result. Compacting keeps a summary of that same reasoning, and repeated passes share the same blind spot."
  },
  {
    "scenario": "ci",
    "stem": "The review job produces about 40 findings per large pull request, of mixed reliability. The two human reviewers have time to look closely at roughly ten. You want their attention on the findings most likely to matter without discarding the rest. What helps most?",
    "options": [
      "A verification pass that re-examines each finding and reports a confidence level with it",
      "Posting all findings in the order they were generated, with the full reasoning for each",
      "Posting only the first ten findings and keeping the rest in a log",
      "Running the same review prompt twice and merging the two sets of findings"
    ],
    "explanation": "A verification pass with a confidence level per finding lets you route attention: confirmed findings first, uncertain ones marked for a look. Truncating by position is arbitrary, and a second identical run adds volume."
  },
  {
    "scenario": "ci",
    "stem": "You add an independent instance to review generated patches. To help it, a teammate proposes passing along the generating session's full reasoning trace, so that the reviewer understands every decision that was made. What is the best response?",
    "options": [
      "Give the reviewer the diff and the requirements, and leave the generator's reasoning out",
      "Pass the full trace, since a reviewer with more context will find more issues",
      "Pass the trace, with an instruction to disregard any part the reviewer disagrees with",
      "Pass a summary of the trace written by the generating session itself"
    ],
    "explanation": "The value of an independent reviewer is that it has not absorbed the reasoning that produced the code. Handing that reasoning over, in full or in summary, recreates the bias of self-review."
  }
];

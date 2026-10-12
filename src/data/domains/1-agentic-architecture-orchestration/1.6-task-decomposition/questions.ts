/* Drill questions for 1.6 Task decomposition. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("1.6-1", "1.6-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "ci",
    "stem": "Every pull request must be reviewed for security, then performance, then style, and each review should feed a short summary to the next. The team is deciding how to structure the work. Which approach fits best?",
    "options": [
      "A prompt chain with one fixed step per aspect, each step receiving the summary from the step before",
      "A coordinator that inspects each pull request and decides which aspects are worth reviewing",
      "One prompt that asks for all three aspects together, with a heading for each",
      "An adaptive plan that the agent revises after each finding, adding aspects as it goes"
    ],
    "explanation": "The steps and their order are known in advance, so a fixed chain of focused steps is the right pattern. Dynamic decomposition suits open-ended work, and a single prompt spreads attention across all three aspects."
  },
  {
    "scenario": "ci",
    "stem": "A single-pass review of an 18-file pull request produced detailed comments on four files and one-line comments on the rest. It flagged a retry helper as a bug in one file and approved identical code in another. How should the review be restructured?",
    "options": [
      "Run a focused pass on each file for local issues, then a separate pass over the cross-file interactions",
      "Run the same single pass three times and keep only the findings that appear in at least two of the three runs",
      "Move the review to a model with a larger context window so all 18 files fit comfortably",
      "Add an instruction to give each file equal attention and to stay consistent between files"
    ],
    "explanation": "The files fit; the problem is attention spread over too much at once. Focused per-file passes plus an integration pass fix depth and consistency. Voting between runs suppresses real findings that appear only once."
  },
  {
    "scenario": "dp",
    "stem": "An engineer asks the agent to 'add comprehensive tests' to a legacy codebase of 600 files with almost no coverage. Nobody knows which modules are critical or how they depend on each other. How should the agent approach the task?",
    "options": [
      "Map the structure first, identify the high-impact areas, then follow a prioritized plan that adapts as dependencies appear",
      "Define a fixed sequence of steps up front, one for each top-level directory, and work through them in order",
      "Write tests for every file in a single pass, so that coverage is spread evenly across the codebase",
      "Begin with the most recently changed files and continue until the context window is full"
    ],
    "explanation": "For open-ended work where the shape of the task is unknown, the plan has to come from what is discovered and change as more is learned. A fixed sequence suits tasks whose steps are known in advance."
  }
];

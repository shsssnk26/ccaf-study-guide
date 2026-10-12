/* Drill questions for 3.6 Claude Code in CI/CD. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("3.6-1", "3.6-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "ci",
    "stem": "The review job runs Claude Code with -p and --output-format json, and a script posts each finding as an inline comment. The script needs file, line and severity for every finding, but the keys vary between runs: sometimes 'path', sometimes 'file', sometimes a nested location object. What is the right fix?",
    "options": [
      "Add --json-schema with the required structure, alongside --output-format json",
      "Describe the required keys in the project CLAUDE.md so that every run sees them",
      "Extend the script to accept every variation of the keys seen so far",
      "Add an example of the desired JSON to the prompt and ask for an exact match"
    ],
    "explanation": "--output-format json makes the output machine-readable; --json-schema is what enforces its structure. Instructions and examples raise the odds, and a tolerant script will break on the next variation."
  },
  {
    "scenario": "ci",
    "stem": "Each new commit to a pull request triggers a full review. Developers complain that the job re-posts the same eleven comments on every push, including ones they have already fixed or answered. What is the best change?",
    "options": [
      "Give the job its prior findings and ask for only new or still-unaddressed issues",
      "Review only the diff between the two most recent commits, so that earlier code is never commented on twice",
      "Skip any line that already carries a comment from the review bot",
      "Run the review once, when the pull request is opened, and not again"
    ],
    "explanation": "Carrying prior findings forward removes duplicates while still catching new problems and keeping open ones visible. Reviewing only the latest diff misses how a change interacts with earlier commits, and line-skipping hides regressions."
  },
  {
    "scenario": "ci",
    "stem": "A new pipeline step runs: claude \"Review this pull request for security issues\". The job hangs until the runner's timeout, and the log shows Claude Code waiting for input. What is the correct fix?",
    "options": [
      "Add the -p flag, so that Claude Code runs non-interactively and exits when done",
      "Pipe the word 'yes' into the command, so that any prompt it shows is answered automatically",
      "Wrap the command in a five-minute timeout, so the job fails quickly and can be retried",
      "Set CI=true in the job's environment, which Claude Code reads as a request to run without a terminal"
    ],
    "explanation": "-p (print mode) is the documented way to run Claude Code non-interactively: it processes the prompt, writes the result and exits. The other options do not change the mode it starts in."
  }
];

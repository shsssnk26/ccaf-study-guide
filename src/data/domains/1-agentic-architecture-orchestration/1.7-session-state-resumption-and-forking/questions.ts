/* Drill questions for 1.7 Session state, resumption and forking. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("1.7-1", "1.7-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "dp",
    "stem": "On Monday you used a named session to map how a legacy billing module works. On Wednesday you want to continue, but a teammate's refactor has since renamed or rewritten most of the files that session read. What is the most reliable way to proceed?",
    "options": [
      "Start a new session and give it a structured summary of the conclusions that still hold",
      "Resume the session and list the changed files so the agent re-reads them when relevant",
      "Resume the session and run /compact so the outdated file contents are compressed",
      "Resume the session and ask the agent to verify each earlier finding before using it"
    ],
    "explanation": "Resuming is right when the earlier context is still mostly valid. When most of the tool results are stale, they keep misleading the agent, so a fresh session seeded with a summary is more reliable."
  },
  {
    "scenario": "dp",
    "stem": "After a long analysis session the agent has a full picture of a tangled payments module. You want it to explore two competing refactoring strategies, each starting from that same understanding, without one influencing the other. What should you use?",
    "options": [
      "fork_session, creating two independent branches from the shared analysis",
      "--resume on the same session, exploring the first strategy and then the second",
      "Two new sessions, each repeating the analysis before exploring one strategy",
      "One session with a prompt asking for both strategies side by side in one response"
    ],
    "explanation": "fork_session branches the conversation from a shared baseline, so each exploration keeps the analysis and stays independent. Exploring in sequence lets the first strategy colour the second; new sessions repeat expensive work."
  },
  {
    "scenario": "dp",
    "stem": "You want to continue a named session that analyzed 60 files yesterday. Since then a small bug fix modified two of those files; the other 58 are unchanged. What is the most efficient reliable approach?",
    "options": [
      "Resume the session and tell the agent which two files changed, so that it re-reads those",
      "Start a new session and have the agent read all 60 files again, so that nothing can be out of date",
      "Resume the session and carry on, since the agent detects modified files on its own",
      "Fork the session and work in the fork, since forking refreshes the tool results it inherits"
    ],
    "explanation": "When most of the earlier context is still valid, resume and point the agent at what changed. A fresh session is for cases where most of it is stale. Nothing refreshes old tool results automatically."
  }
];

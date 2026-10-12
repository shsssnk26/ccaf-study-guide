/* Drill questions for 5.4 Context in large codebase exploration. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("5.4-1", "5.4-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "dp",
    "stem": "To answer 'how does authentication work in this system', the agent reads about 40 files into its own conversation. By the end it contradicts what it said about the token refresh flow at the start. What is the best change?",
    "options": [
      "Delegate the exploration to subagents that each return a short structured summary to the main agent",
      "Have the agent read each file only once and rely on its recollection of the contents for the rest of the session",
      "Limit the agent to ten files per question, so that the context stays small",
      "Have the agent repeat the important code excerpts in every message it writes"
    ],
    "explanation": "Subagents absorb the verbose reading in their own context and return only the findings, so the main conversation stays focused. A file cap makes the answers incomplete, and repeating excerpts fills context faster."
  },
  {
    "scenario": "dp",
    "stem": "A coordinator and four subagents spend an hour mapping a legacy system. The process then crashes and all in-memory context is lost. You are redesigning for the next run. What allows a restart without repeating the hour of work?",
    "options": [
      "Each agent writes its state to a known location, and on restart the coordinator loads a manifest of what is done",
      "Each agent's session is given a name, so that all five can be resumed afterwards",
      "The coordinator compacts its context every ten minutes and reloads the latest summary",
      "Tool results are cached on disk, and the whole exploration is run again from the start against that cache"
    ],
    "explanation": "State that must survive a crash has to be exported somewhere outside the process, in a form the coordinator can reload. Compaction lives in the same lost context, and a cached re-run still repeats the reasoning."
  },
  {
    "scenario": "dp",
    "stem": "Two hours into exploring a codebase, the agent starts answering with phrases like 'following typical patterns, this service probably…' where earlier it gave the specific class names it had found. What is the most effective mitigation?",
    "options": [
      "Have it record key findings in a scratchpad file and consult that file for later questions",
      "Remind it in each message to be specific and to avoid generalizing",
      "Ask it to re-read every file from the start whenever an answer sounds generic",
      "Move to a model with a larger context window and continue in the same session"
    ],
    "explanation": "Generic answers late in a long session are a sign of context degradation. Findings kept in a file survive outside the context and can be re-read cheaply. Re-reading everything makes the context problem worse."
  }
];

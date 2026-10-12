/* Drill questions for 5.3 Error propagation across agents. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("5.3-1", "5.3-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "ma",
    "stem": "The web search subagent calls a slow academic source that times out. At present it either sends the raw timeout to the coordinator at once, or retries silently and then returns the text 'search unavailable'. Which behaviour is best?",
    "options": [
      "Retry locally, and if the problem persists, return the failure type, what was attempted, and any partial results",
      "Return every timeout to the coordinator immediately, so that one place controls all the retry decisions for the system",
      "Retry until the source responds, since the coordinator cannot continue without it",
      "Return an empty result marked as successful, so the pipeline keeps moving"
    ],
    "explanation": "Handle transient failures where they occur, and when they cannot be resolved, pass up enough structure for the coordinator to decide. A bare 'unavailable' or a false success removes the information it needs."
  },
  {
    "scenario": "ma",
    "stem": "Four sources were assigned for a report on battery recycling. One, a regulatory database, kept failing after retries. The client needs the report today. What should the synthesis output contain?",
    "options": [
      "The report, with coverage notes showing which findings are well supported and that the regulatory source is missing",
      "The report written from the three working sources, with no mention of the fourth, so that the client is not confused on delivery day",
      "An error in place of the report, since incomplete research should not be published",
      "The report, with the regulatory section written from the model's general knowledge"
    ],
    "explanation": "Deliver what is supported and state plainly what is missing, so the reader can judge it. Silent omission and filling from general knowledge both present unverified coverage as complete."
  },
  {
    "scenario": "ma",
    "stem": "When any subagent raises an exception, such as one unreachable source, the whole research run terminates and the user receives nothing, even if three other subagents had already finished. What is the best redesign?",
    "options": [
      "Catch the failure in the subagent, return a structured error, and let the coordinator decide how to proceed",
      "Let the exception end the run, so that no incomplete report can ever be produced",
      "Catch the failure and return an empty success, so the remaining subagents are not affected",
      "Restart the entire run from the first subtask whenever any single subagent fails"
    ],
    "explanation": "One failure should not discard completed work. A structured error gives the coordinator what it needs to retry, route around the gap or deliver a partial result with the gap stated. An empty success hides the failure."
  }
];

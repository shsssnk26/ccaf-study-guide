/* Drill questions for 5.6 Provenance and uncertainty in synthesis. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("5.6-1", "5.6-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "ma",
    "stem": "The document analysis subagent finds two credible sources for the same statistic: one reports 4.1%, the other 4.6%. The surveys were run two years apart. What should the subagent return to the coordinator?",
    "options": [
      "Both values, each with its source and collection date, marked as a conflict to be reconciled",
      "The more recent value, with a note that an older figure also exists",
      "The midpoint of the two values, with a note that sources disagree",
      "An error describing the conflict, so that the coordinator re-runs the search for a third source"
    ],
    "explanation": "A conflict is a finding, not a failure. Keeping both values with source and date lets the coordinator see that the difference may simply be change over time. Choosing or averaging discards that information."
  },
  {
    "scenario": "ma",
    "stem": "Findings pass from the analysis subagent to the synthesis subagent as paragraphs of prose with a source list at the end. In the final report several citations are attached to claims that the cited source does not make. What is the most effective fix?",
    "options": [
      "Pass findings as structured records that keep each claim together with its own source details",
      "Ask the analysis subagent to write shorter paragraphs with fewer claims in each",
      "Send the complete text of every source along with the prose",
      "Ask the report subagent to check each citation and correct any that look wrong before publishing"
    ],
    "explanation": "Attribution survives a handoff only when each claim travels with its source. Prose with a list at the end forces the next agent to guess the pairing, and a later check has nothing reliable to check against."
  },
  {
    "scenario": "ma",
    "stem": "The final report presents every finding in the same confident tone. Readers cannot tell which conclusions rest on several agreeing sources and which rest on one disputed study. What is the best change?",
    "options": [
      "Separate well-established findings from contested ones in the report, with sources attached to each",
      "Remove findings supported by only one source, so that everything left is reliable",
      "Add a general disclaimer at the top saying that some findings may be uncertain",
      "Ask the report subagent to use more cautious wording throughout"
    ],
    "explanation": "Readers need to see which claims are settled and which are disputed, and why. Deleting single-source findings loses information, and blanket caution blurs the distinction it is meant to show."
  }
];

/* Drill questions for 4.2 Few-shot prompting. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("4.2-1", "4.2-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "cs",
    "stem": "The tool descriptions are detailed and accurate. For clear requests the agent chooses well. For messages such as 'I was charged twice and the replacement never arrived', it sometimes opens a billing dispute, sometimes a return, and rarely handles both. What is the most effective improvement?",
    "options": [
      "A few examples of ambiguous messages, each showing the reasoning that leads to the chosen actions",
      "Longer tool descriptions listing more of the keywords customers tend to use",
      "A classifier in front of the agent that assigns each incoming message to exactly one category before routing",
      "A forced tool_choice for the dispute tool, since billing issues are the most common"
    ],
    "explanation": "The descriptions are already good, so what is missing is judgment in ambiguous cases. Examples with reasoning teach that. A single-label classifier and a forced tool both guarantee that multi-issue messages are handled badly."
  },
  {
    "scenario": "ex",
    "stem": "The pipeline extracts cited sources from research papers. It works on papers with inline citations, but returns an empty list for papers that use numbered footnotes with a bibliography at the end. The instructions already describe both layouts in detail. What should you try next?",
    "options": [
      "Add few-shot examples showing correct extraction from each layout",
      "Make the sources field nullable so that empty results validate cleanly",
      "Retry with the same prompt whenever the sources list comes back empty",
      "Rewrite the instructions for the footnote layout at greater length"
    ],
    "explanation": "The data is in the document and detailed instructions have not worked, so show the model worked examples of each structure. Making the field nullable accepts the failure, and retrying the same prompt repeats it."
  },
  {
    "scenario": "ci",
    "stem": "Findings arrive in different shapes: some include a suggested fix, some have no line number, some are a paragraph of prose. The prompt already describes the required format in detail, and the posting script cannot rely on any field being present. What should you add?",
    "options": [
      "Three or four example findings in the exact format: location, issue, severity, suggested fix",
      "A second description of the format at the end of the prompt, written in capital letters",
      "Post-processing with regular expressions that pull out whichever fields happen to be present",
      "A lower temperature setting, so that the formatting varies less from one run to the next"
    ],
    "explanation": "When detailed instructions still give inconsistent formatting, examples are the most effective tool: the model copies a pattern more reliably than it follows a description of one."
  }
];

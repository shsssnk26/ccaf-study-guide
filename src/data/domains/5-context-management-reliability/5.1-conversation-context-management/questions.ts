/* Drill questions for 5.1 Conversation context management. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("5.1-1", "5.1-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "cs",
    "stem": "In a long conversation the agent promised a refund of $247.83 by 14 March. The history has since been summarized twice to save context. Later the agent tells the customer they will receive 'about $200 in the next couple of weeks'. What is the most reliable fix?",
    "options": [
      "Keep amounts, dates and commitments in a case-facts block that is sent with every request and never summarized",
      "Instruct the summarization step to preserve all important details, including every amount, date and promise that was made",
      "Stop summarizing and send the complete history with every request",
      "Raise the summarization threshold so that summaries happen less often"
    ],
    "explanation": "Summaries turn exact values into approximations. Facts that must stay exact belong in their own block, outside the summarized history. Asking the summarizer to be careful still leaves exactness to chance."
  },
  {
    "scenario": "ma",
    "stem": "Nine subagent outputs are concatenated and passed to the synthesis subagent as about 30,000 tokens of text. The reports consistently reflect the first two and the last two outputs and omit important findings from the middle. Which change addresses this?",
    "options": [
      "Put a summary of the key findings at the top and organize the detail under explicit section headers",
      "Raise max_tokens for the synthesis subagent so that it has room to write a longer and more complete report",
      "Shuffle the order of the nine outputs on each run so that omissions average out",
      "Add an instruction to give equal attention to every part of the input"
    ],
    "explanation": "Models attend most reliably to the beginning and end of a long input. Leading with the key findings and structuring the rest counters that. Output length is not the limit, and shuffling only moves which findings are lost."
  },
  {
    "scenario": "cs",
    "stem": "Each lookup_order result contains more than 40 fields; for return requests the agent uses about five. After several lookups the context is dominated by tool output, and the agent begins to miss things the customer said early in the conversation. What is the best change?",
    "options": [
      "Trim each tool result to the relevant fields before it is added to the conversation",
      "Summarize the customer's own messages more aggressively to make room for the tool output",
      "Instruct the agent to ignore the fields it does not need when it reads each result",
      "Limit the agent to two order lookups in any one conversation"
    ],
    "explanation": "Tool output accumulates in context whether or not it is useful. Cutting it down before it enters the conversation keeps room for what matters. Ignored fields still consume tokens and attention."
  }
];

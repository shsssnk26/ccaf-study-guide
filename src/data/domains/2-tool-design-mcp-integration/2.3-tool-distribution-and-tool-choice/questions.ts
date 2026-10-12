/* Drill questions for 2.3 Tool distribution and tool_choice. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("2.3-1", "2.3-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "ma",
    "stem": "For convenience, every subagent was given all 18 tools in the system. The synthesis subagent now sometimes runs its own web searches in the middle of drafting, and it picks the wrong tool more often than before. What is the most effective change?",
    "options": [
      "Limit each subagent to the tools its role needs, which for synthesis is a small set",
      "Rewrite all 18 tool descriptions so the differences between them are clearer",
      "Add a list of tools the synthesis subagent must not use to its system prompt",
      "Move the synthesis subagent to a more capable model with better tool selection"
    ],
    "explanation": "Selection gets less reliable as the tool count rises, and agents use what they are given. Scoping the tool set removes both problems in configuration, where a prompt list depends on compliance."
  },
  {
    "scenario": "ex",
    "stem": "Every document must first pass through extract_metadata, whose output determines which enrichment tool applies. With the default setting, the model sometimes calls an enrichment tool first, and occasionally replies in prose. How do you guarantee the first step?",
    "options": [
      "Force tool_choice to extract_metadata on the first request, then return to the default for later steps",
      "Set tool_choice to 'any' on every request so that a tool is always called",
      "Place extract_metadata first in the tools array and mark its description as mandatory for every document",
      "State in the system prompt that extract_metadata must always be the first call"
    ],
    "explanation": "A forced tool guarantees which tool runs. 'any' guarantees a tool call but leaves the choice to the model, and ordering or prompt wording only makes the right call more likely."
  },
  {
    "scenario": "ma",
    "stem": "The document analysis subagent has a general fetch_url tool for loading the documents it is assigned. Logs show it following links out of those documents and browsing unrelated sites, which is the web search subagent's role. What is the most effective change?",
    "options": [
      "Replace fetch_url with a constrained load_document tool that accepts only document URLs",
      "Keep fetch_url and add a rule to the subagent's prompt that it may load only its assigned documents",
      "Keep fetch_url and have the coordinator approve each URL before the call is allowed to run",
      "Remove the tool and have the coordinator paste the full text of every document into the subagent's prompt"
    ],
    "explanation": "Replacing a general tool with a constrained one removes the misuse by design. A prompt rule depends on compliance, per-call approval adds a round trip to every load, and pasting full documents fills the coordinator's context."
  }
];

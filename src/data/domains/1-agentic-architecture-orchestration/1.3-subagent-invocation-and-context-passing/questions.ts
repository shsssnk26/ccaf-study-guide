/* Drill questions for 1.3 Subagent invocation and context passing. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("1.3-1", "1.3-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "ma",
    "stem": "The coordinator needs web search results on three unrelated subtopics. At present it issues one Task call, waits for the result, then issues the next; a report takes about nine minutes, most of it waiting. What reduces the wall-clock time without changing the output?",
    "options": [
      "Have the coordinator emit all three Task tool calls in a single response",
      "Have the coordinator issue each Task call in its own turn without reading the previous result first",
      "Combine the three subtopics into one Task call so that one subagent covers them in a single context",
      "Raise max_tokens on the coordinator so all three results fit into one response"
    ],
    "explanation": "Several Task calls in one coordinator response run in parallel. Separate turns still run one after another, and merging subtopics changes the output by spreading one subagent's attention across all three."
  },
  {
    "scenario": "ma",
    "stem": "The coordinator spawns the synthesis subagent with the prompt 'Write the report based on the findings gathered above.' Its own context holds every search result with URLs. The report comes back generic, with no citations. What is the most likely cause?",
    "options": [
      "The subagent received only its prompt, so the findings and their sources were never available to it",
      "The subagent inherited the coordinator's context but gave low priority to material that came before its instructions",
      "The subagent's allowed tools did not include web search, so it could not look the sources up again",
      "The prompt did not include a report template with a dedicated citations section"
    ],
    "explanation": "A subagent starts with its prompt and nothing else. 'The findings above' refers to context it never had, so the findings and source details have to be written into the prompt itself."
  },
  {
    "scenario": "ma",
    "stem": "You define four subagents with AgentDefinition, each with a description and a prompt. In testing the coordinator never delegates: it answers research questions itself from general knowledge. Its allowed tools are Read, Grep and WebFetch. What is the most likely cause?",
    "options": [
      "The coordinator's allowed tools do not include the Task tool, which is what spawns subagents",
      "The subagent descriptions are too short for the coordinator to recognize when each one applies",
      "The coordinator's system prompt does not state firmly enough that research must always be delegated",
      "The subagents were not given the same allowed tools as the coordinator, so it cannot treat them as workers"
    ],
    "explanation": "Subagents are spawned through a tool, and a coordinator without that tool has no way to delegate, whatever its prompt says. The exam guide calls it Task; current SDK documentation names it Agent."
  }
];

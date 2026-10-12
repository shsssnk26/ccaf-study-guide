/* Drill questions for 1.2 Coordinator and subagent orchestration. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("1.2-1", "1.2-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "ma",
    "stem": "A user requests a report on 'AI in creative industries'. The report is well written and well cited but covers only visual art. Logs show the coordinator created three subtasks (image generators, digital illustration, AI in photography), and each subagent completed its subtask thoroughly. Where should you make the fix?",
    "options": [
      "In the coordinator's decomposition, so that it maps the full breadth of the topic before assigning subtasks",
      "In the web search subagent's prompt, so that its queries range beyond the wording of the subtask it was given",
      "In the synthesis subagent's prompt, so that it identifies missing areas and fills them before writing",
      "In the report subagent's prompt, so that it adds sections on music, writing and film"
    ],
    "explanation": "Every subagent did what it was assigned. When whole areas were never assigned, the fault is in the decomposition. Asking downstream agents to compensate hides the cause and invites unsupported content."
  },
  {
    "scenario": "ma",
    "stem": "Each handoff currently passes through the coordinator. To cut latency, an engineer proposes that the web search subagent send its results straight to the document analysis subagent, with only failures reported to the coordinator. What is the strongest reason to decline?",
    "options": [
      "The coordinator would lose visibility and consistent error handling for the main path, and subagents do not share context with each other",
      "Subagents under one coordinator already share a single context window, so a direct handoff between them would not actually save a round trip",
      "The Agent SDK cannot pass one subagent's output into another subagent's prompt under any design",
      "Direct handoffs would force the two subagents to run on the same model"
    ],
    "explanation": "Hub and spoke keeps all communication with the coordinator so that it can observe, handle errors and decide what each subagent receives. The other three statements are false: subagents have isolated context, and output can be forwarded through the coordinator."
  },
  {
    "scenario": "ma",
    "stem": "Every request, including 'summarize the one PDF I attached', passes through web search, document analysis, synthesis and report writing in that order. Simple requests take six minutes and come back padded with loosely related web sources. What should change?",
    "options": [
      "Have the coordinator analyze each request and invoke only the subagents it needs",
      "Keep the full pipeline, and instruct the web search subagent to return nothing when a search is not needed",
      "Keep the full pipeline, and run the four subagents in parallel so that simple requests finish sooner",
      "Add a second, shorter pipeline and let users choose between the two when they submit a request"
    ],
    "explanation": "A coordinator's job includes deciding which subagents a request calls for. Routing everything through every subagent wastes time and adds noise; running them in parallel breaks the dependencies between the stages."
  }
];

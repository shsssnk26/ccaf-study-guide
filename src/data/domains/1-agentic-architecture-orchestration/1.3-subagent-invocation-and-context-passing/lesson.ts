/* Lesson for 1.3 Subagent invocation and context passing: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": "Task tool",
      "meaning": "The tool a coordinator calls to spawn a subagent. The exam guide calls it Task; current SDK documentation names it Agent."
    },
    {
      "term": "AgentDefinition",
      "meaning": "A subagent's configuration: when to use it, its system prompt, and the tools it may use."
    },
    {
      "term": "Explicit context passing",
      "meaning": "A subagent starts with only its prompt, so findings and sources must be written into it."
    }
  ],
  "caption": "Defining a subagent with the Agent SDK (Python)",
  "code": "from claude_agent_sdk import query, ClaudeAgentOptions, AgentDefinition\n\noptions = ClaudeAgentOptions(\n    allowed_tools=[\"Read\", \"Grep\", \"Agent\"],   # the exam guide lists this as \"Task\"\n    agents={\n        \"synthesizer\": AgentDefinition(\n            description=\"Writes the final report from supplied findings.\",\n            prompt=\"You write cited reports. Use only the findings you are given.\",\n            tools=[\"Read\"],\n        )\n    },\n)\n# The delegation prompt must carry the findings and their sources.",
  "antiPatterns": [
    {
      "move": "Writing \"use the findings above\" in a delegation prompt",
      "why": "The subagent cannot see anything above. It will write from general knowledge."
    },
    {
      "move": "Spawning independent subagents one turn at a time",
      "why": "They run in sequence. Put the calls in one response to run them in parallel."
    },
    {
      "move": "Step-by-step procedures where goals would do",
      "why": "A fixed procedure breaks on cases it did not anticipate."
    }
  ]
};

/* Lesson for 5.4 Context in large codebase exploration: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": "Context degradation",
      "meaning": "In long sessions the model starts answering vaguely and forgets what it found earlier."
    },
    {
      "term": "Scratchpad file",
      "meaning": "A file where the agent records key findings, so they outlast the conversation."
    },
    {
      "term": "State manifest",
      "meaning": "A file listing each agent's status and outputs, used to resume after a crash."
    }
  ],
  "caption": "Findings and state kept outside the conversation",
  "code": "scratch/findings.md       key facts with file paths, appended as found\nstate/manifest.json       {\"agents\": {\"auth-explorer\": \"done\",\n                                      \"billing-explorer\": \"in_progress\"},\n                           \"outputs\": \"state/*.json\"}\n\n# On restart the coordinator loads the manifest and\n# injects each agent's saved state into its prompt.",
  "antiPatterns": [
    {
      "move": "Reading dozens of files into the main conversation",
      "why": "Early details are gone by the time you need them."
    },
    {
      "move": "The conversation as the only record",
      "why": "A crash or compaction loses it."
    },
    {
      "move": "Restarting an hour of exploration from zero",
      "why": "Persisted state would have let you continue."
    }
  ]
};

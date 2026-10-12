/* Lesson for 2.3 Tool distribution and tool_choice: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": "Scoped tool access",
      "meaning": "Each agent gets only the tools its role needs."
    },
    {
      "term": "tool_choice",
      "meaning": "A request setting that controls whether, and which, tool the model must call."
    },
    {
      "term": "Constrained alternative",
      "meaning": "A narrow tool that replaces a general one, such as load_document in place of fetch_url."
    }
  ],
  "caption": "The three tool_choice settings",
  "code": "tool_choice={\"type\": \"auto\"}                              # may answer in text\ntool_choice={\"type\": \"any\"}                               # must call some tool\ntool_choice={\"type\": \"tool\", \"name\": \"extract_metadata\"}  # must call this one",
  "antiPatterns": [
    {
      "move": "Giving every agent every tool",
      "why": "Selection gets less reliable, and agents use tools outside their role."
    },
    {
      "move": "Using \"any\" when one tool must run first",
      "why": "It guarantees a call, not which tool."
    },
    {
      "move": "A blocklist of tools to avoid",
      "why": "New tools are allowed by default. An allowlist is safer."
    }
  ]
};

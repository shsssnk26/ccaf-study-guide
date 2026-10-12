/* Lesson for 2.4 MCP server integration: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
    {
      "term": ".mcp.json",
      "meaning": "Project-level MCP server configuration, shared through version control."
    },
    {
      "term": "~/.claude.json",
      "meaning": "Your personal configuration, for servers only you use."
    },
    {
      "term": "MCP resources",
      "meaning": "Read-only catalogs a server exposes, such as schemas or document lists, so an agent can see what exists."
    }
  ],
  "caption": "A shared server with a personal token (.mcp.json)",
  "code": "{\n  \"mcpServers\": {\n    \"github\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"@modelcontextprotocol/server-github\"],\n      \"env\": { \"GITHUB_TOKEN\": \"${GITHUB_TOKEN}\" }\n    }\n  }\n}",
  "antiPatterns": [
    {
      "move": "A shared token committed to the repository",
      "why": "Secrets do not belong in version control."
    },
    {
      "move": "A team server set up only in one person's home folder",
      "why": "Nobody else gets it."
    },
    {
      "move": "A custom server for a standard integration",
      "why": "Use an existing community server and save custom work for team-specific needs."
    }
  ]
};

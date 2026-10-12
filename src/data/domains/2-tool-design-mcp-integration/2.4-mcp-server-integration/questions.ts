/* Drill questions for 2.4 MCP server integration. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("2.4-1", "2.4-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "dp",
    "stem": "Six engineers need the same GitHub MCP server in one repository. Each has a personal access token, and security policy forbids committing any credential. A new engineer should get the server on cloning the repository. Where does the configuration belong?",
    "options": [
      "In the project's .mcp.json, referencing the token as ${GITHUB_TOKEN} from each engineer's environment",
      "In each engineer's ~/.claude.json, with the token written into their own copy",
      "In the project's .mcp.json, with one shared team token kept in a git-ignored file",
      "In the project's CLAUDE.md, as setup instructions the agent follows at the start of a session"
    ],
    "explanation": "Servers the team shares belong in the project-level file under version control, and environment variable expansion keeps every secret out of it. The user-level file is for personal servers and is not shared on clone."
  },
  {
    "scenario": "dp",
    "stem": "Before the agent can plan a task, it spends 10 to 15 tool calls finding out which database schemas, design documents and open issues exist. The MCP server exposes these only through search tools. How should the server change to cut this overhead?",
    "options": [
      "Expose the catalogs as MCP resources, so the agent can see what exists without exploratory calls",
      "Add one more search tool per catalog, each with a narrower and more precise description than the current ones",
      "Paste the full text of all three catalogs into the system prompt of every session",
      "Cache the search tool results on the server so that repeated calls return faster"
    ],
    "explanation": "Resources are how an MCP server exposes content the agent can browse and read; tools are for actions. More tools add selection load, a pasted catalog fills context whether or not it is needed, and caching still spends the calls."
  },
  {
    "scenario": "dp",
    "stem": "The team wants the agent to read and update Jira tickets. An engineer proposes spending a sprint on a custom MCP server. A maintained community Jira server already covers every operation on the team's list. What is the best decision?",
    "options": [
      "Use the community server, and reserve custom servers for workflows specific to the team",
      "Build the custom server, because community servers cannot be declared in a project's .mcp.json file",
      "Skip MCP and have the agent call the Jira REST API through Bash with curl commands",
      "Build the custom server first, and fall back to the community one only if the sprint overruns"
    ],
    "explanation": "For standard integrations an existing server is the default; custom servers earn their cost when the workflow is unique to the team. Community servers are configured the same way as any other."
  }
];

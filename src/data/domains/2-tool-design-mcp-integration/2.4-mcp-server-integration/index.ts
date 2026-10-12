import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "2.4",
  title: "MCP server integration",
  idea: "Team servers go in project .mcp.json with environment variable expansion for secrets; personal ones go in ~/.claude.json. Resources expose catalogs without exploratory calls.",
  lesson,
  questions,
};

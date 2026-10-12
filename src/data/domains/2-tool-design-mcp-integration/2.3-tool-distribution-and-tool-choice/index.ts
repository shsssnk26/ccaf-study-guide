import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "2.3",
  title: "Tool distribution and tool_choice",
  idea: "Give each agent only the tools its role needs. With tool_choice, auto may answer in text, any must call a tool, and a forced tool runs first.",
  lesson,
  questions,
};

import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "1.1",
  title: "Agentic loops",
  idea: "The loop continues while stop_reason is tool_use and ends on end_turn. Tool results go back into the history. Text, phrases and turn caps are not completion signals.",
  lesson,
  questions,
};

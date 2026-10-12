import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "1.2",
  title: "Coordinator and subagent orchestration",
  idea: "Hub and spoke: the coordinator decomposes, delegates, collects every result and decides which subagents a request needs. Subagents share no context.",
  lesson,
  questions,
};

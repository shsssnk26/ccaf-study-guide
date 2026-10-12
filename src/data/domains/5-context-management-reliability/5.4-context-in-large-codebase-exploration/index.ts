import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "5.4",
  title: "Context in large codebase exploration",
  idea: "Long exploration degrades context. Use subagents for verbose discovery, scratchpad files for findings, and a state manifest for crash recovery.",
  lesson,
  questions,
};

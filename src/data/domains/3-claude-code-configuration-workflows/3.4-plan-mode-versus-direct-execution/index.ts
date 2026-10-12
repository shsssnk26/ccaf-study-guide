import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "3.4",
  title: "Plan mode versus direct execution",
  idea: "Plan mode for large, uncertain or multi-approach changes. Direct execution for a clear, well-scoped change. The Explore subagent for verbose discovery.",
  lesson,
  questions,
};

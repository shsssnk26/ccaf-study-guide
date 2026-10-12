import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "2.5",
  title: "Built-in tools",
  idea: "Grep searches contents, Glob matches file paths, Edit needs unique text, and Read then Write is the fallback. Explore incrementally from entry points.",
  lesson,
  questions,
};

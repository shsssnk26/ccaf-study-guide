import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "1.5",
  title: "Hooks for interception and normalization",
  idea: "Hooks give deterministic guarantees: intercept a call before it runs to block it, or transform a result after it returns.",
  lesson,
  questions,
};

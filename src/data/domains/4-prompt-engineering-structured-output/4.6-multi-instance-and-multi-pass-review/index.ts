import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "4.6",
  title: "Multi-instance and multi-pass review",
  idea: "A fresh instance catches what the author session misses. A verification pass with confidence per finding helps route human review.",
  lesson,
  questions,
};

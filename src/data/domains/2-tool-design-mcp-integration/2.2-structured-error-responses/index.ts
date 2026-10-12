import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "2.2",
  title: "Structured error responses",
  idea: "Return errors with a category, a retryable flag and a readable message. A valid empty result is not a failure.",
  lesson,
  questions,
};

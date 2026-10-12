import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "4.4",
  title: "Validation, retry and feedback loops",
  idea: "Retries with the specific error fix format problems, never information missing from the source. Track which patterns get dismissed.",
  lesson,
  questions,
};

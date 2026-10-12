import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "3.3",
  title: "Path-specific rules",
  idea: "Rules files with paths globs load only when matching files are edited, which suits conventions that span many directories.",
  lesson,
  questions,
};

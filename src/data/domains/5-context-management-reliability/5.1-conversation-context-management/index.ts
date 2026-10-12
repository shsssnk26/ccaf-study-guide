import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "5.1",
  title: "Conversation context management",
  idea: "Summaries blur exact values, so keep amounts, dates and statuses in a case facts block. Put key findings first in long inputs.",
  lesson,
  questions,
};

import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "5.3",
  title: "Error propagation across agents",
  idea: "Recover locally from transient failures, then report with structured context and partial results. Never hide a failure as an empty success.",
  lesson,
  questions,
};

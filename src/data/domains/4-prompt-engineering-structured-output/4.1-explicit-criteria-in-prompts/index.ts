import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "4.1",
  title: "Explicit criteria in prompts",
  idea: "Specific criteria beat vague caution. Define what to report and what to skip, and switch off a noisy category while you fix it.",
  lesson,
  questions,
};

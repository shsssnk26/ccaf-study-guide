import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "4.2",
  title: "Few-shot prompting",
  idea: "Two to four targeted examples with reasoning teach judgment on ambiguous cases and give consistent output.",
  lesson,
  questions,
};

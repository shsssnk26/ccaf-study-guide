import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "1.4",
  title: "Workflow enforcement and handoff",
  idea: "Rules that must always hold get programmatic gates, because prompts fail some of the time. Escalations carry a structured handoff a human can act on.",
  lesson,
  questions,
};

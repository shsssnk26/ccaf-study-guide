import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "5.5",
  title: "Human review and confidence calibration",
  idea: "Aggregate accuracy hides weak segments. Calibrate confidence on labelled data and keep stratified sampling of high-confidence output.",
  lesson,
  questions,
};

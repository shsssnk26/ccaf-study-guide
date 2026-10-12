import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "2.1",
  title: "Tool descriptions and boundaries",
  idea: "Descriptions are how the model picks a tool. Say what each does, its inputs, edge cases and when to use it over a similar tool. Rename or split tools that overlap.",
  lesson,
  questions,
};

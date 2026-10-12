import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "3.5",
  title: "Iterative refinement",
  idea: "Concrete input and output examples fix inconsistent transformations. Tests give a target to iterate on, the interview pattern surfaces unknowns, and interacting issues go in one message.",
  lesson,
  questions,
};

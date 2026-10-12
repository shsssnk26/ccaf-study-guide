import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "5.6",
  title: "Provenance and uncertainty in synthesis",
  idea: "Keep each claim tied to its source and date. Report conflicting values with attribution, and separate established findings from contested ones.",
  lesson,
  questions,
};

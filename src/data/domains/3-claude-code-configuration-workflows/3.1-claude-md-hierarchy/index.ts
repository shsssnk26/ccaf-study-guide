import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "3.1",
  title: "CLAUDE.md hierarchy",
  idea: "User-level CLAUDE.md is personal. Project-level is shared with the team and CI. Directory-level applies in that folder. /memory shows what loaded.",
  lesson,
  questions,
};

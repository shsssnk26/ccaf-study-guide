import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "1.7",
  title: "Session state, resumption and forking",
  idea: "Resume a named session when its context is still mostly valid, and say what changed. Start fresh with a summary when it is stale. fork_session branches one analysis into independent explorations.",
  lesson,
  questions,
};

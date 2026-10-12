import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "1.3",
  title: "Subagent invocation and context passing",
  idea: "Subagents are spawned with the Task tool and know only their prompt. Pass findings and source details explicitly. Several Task calls in one response run in parallel.",
  lesson,
  questions,
};

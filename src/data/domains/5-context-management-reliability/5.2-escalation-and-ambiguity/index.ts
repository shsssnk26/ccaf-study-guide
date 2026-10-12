import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "5.2",
  title: "Escalation and ambiguity",
  idea: "Escalate on an explicit request for a human, a policy gap, or no progress. Sentiment and self-reported confidence are poor triggers. Several matches mean asking for another identifier.",
  lesson,
  questions,
};

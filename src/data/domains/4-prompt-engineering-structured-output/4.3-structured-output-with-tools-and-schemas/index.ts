import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "4.3",
  title: "Structured output with tools and schemas",
  idea: "Tool use with a JSON schema guarantees shape, not meaning. Nullable fields, an 'other' value with detail, and an 'unclear' value mean the model never has to invent an answer.",
  lesson,
  questions,
};

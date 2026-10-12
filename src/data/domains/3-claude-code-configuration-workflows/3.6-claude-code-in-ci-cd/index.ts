import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "3.6",
  title: "Claude Code in CI/CD",
  idea: "The -p flag runs Claude Code non-interactively; --output-format json with --json-schema structures findings. An independent instance reviews better than the session that wrote the code.",
  lesson,
  questions,
};

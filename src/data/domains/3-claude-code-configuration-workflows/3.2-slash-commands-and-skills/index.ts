import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "3.2",
  title: "Slash commands and skills",
  idea: "Project commands and skills live in the repository; personal ones in your home folder. In skill frontmatter, context: fork isolates output, allowed-tools restricts tools, and argument-hint prompts for input.",
  lesson,
  questions,
};

import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "1.6",
  title: "Task decomposition",
  idea: "Predictable steps suit prompt chaining; open-ended work needs decomposition that adapts to findings. Large reviews split into per-file passes plus a cross-file pass.",
  lesson,
  questions,
};

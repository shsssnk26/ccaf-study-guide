import type { TaskContent } from "../../../../lib/types";
import { lesson } from "./lesson";
import { questions } from "./questions";

export const task: TaskContent = {
  id: "4.5",
  title: "Batch processing",
  idea: "Batches cost half as much, take up to 24 hours and cannot run tools mid-request. Match results to requests by custom_id.",
  lesson,
  questions,
};

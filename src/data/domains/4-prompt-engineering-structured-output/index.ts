import type { DomainContent } from "../../../lib/types";
import { task as t1 } from "./4.1-explicit-criteria-in-prompts";
import { task as t2 } from "./4.2-few-shot-prompting";
import { task as t3 } from "./4.3-structured-output-with-tools-and-schemas";
import { task as t4 } from "./4.4-validation-retry-and-feedback-loops";
import { task as t5 } from "./4.5-batch-processing";
import { task as t6 } from "./4.6-multi-instance-and-multi-pass-review";

export const domain: DomainContent = {
  id: 4,
  name: "Prompt Engineering & Structured Output",
  weight: 20,
  course: "the Claude API course",
  tasks: [t1, t2, t3, t4, t5, t6],
};

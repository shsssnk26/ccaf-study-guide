import type { DomainContent } from "../../../lib/types";
import { task as t1 } from "./5.1-conversation-context-management";
import { task as t2 } from "./5.2-escalation-and-ambiguity";
import { task as t3 } from "./5.3-error-propagation-across-agents";
import { task as t4 } from "./5.4-context-in-large-codebase-exploration";
import { task as t5 } from "./5.5-human-review-and-confidence-calibration";
import { task as t6 } from "./5.6-provenance-and-uncertainty-in-synthesis";

export const domain: DomainContent = {
  id: 5,
  name: "Context Management & Reliability",
  weight: 15,
  course: "the Claude API and Claude Code courses",
  tasks: [t1, t2, t3, t4, t5, t6],
};

import type { DomainContent } from "../../../lib/types";
import { task as t1 } from "./3.1-claude-md-hierarchy";
import { task as t2 } from "./3.2-slash-commands-and-skills";
import { task as t3 } from "./3.3-path-specific-rules";
import { task as t4 } from "./3.4-plan-mode-versus-direct-execution";
import { task as t5 } from "./3.5-iterative-refinement";
import { task as t6 } from "./3.6-claude-code-in-ci-cd";

export const domain: DomainContent = {
  id: 3,
  name: "Claude Code Configuration & Workflows",
  weight: 20,
  course: "the Claude Code course",
  tasks: [t1, t2, t3, t4, t5, t6],
};

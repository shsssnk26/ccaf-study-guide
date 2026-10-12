import type { DomainContent } from "../../../lib/types";
import { task as t1 } from "./1.1-agentic-loops";
import { task as t2 } from "./1.2-coordinator-and-subagent-orchestration";
import { task as t3 } from "./1.3-subagent-invocation-and-context-passing";
import { task as t4 } from "./1.4-workflow-enforcement-and-handoff";
import { task as t5 } from "./1.5-hooks-for-interception-and-normalization";
import { task as t6 } from "./1.6-task-decomposition";
import { task as t7 } from "./1.7-session-state-resumption-and-forking";

export const domain: DomainContent = {
  id: 1,
  name: "Agentic Architecture & Orchestration",
  weight: 27,
  course: "the Claude API and agent-building courses",
  tasks: [t1, t2, t3, t4, t5, t6, t7],
};

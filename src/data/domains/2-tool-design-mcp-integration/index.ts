import type { DomainContent } from "../../../lib/types";
import { task as t1 } from "./2.1-tool-descriptions-and-boundaries";
import { task as t2 } from "./2.2-structured-error-responses";
import { task as t3 } from "./2.3-tool-distribution-and-tool-choice";
import { task as t4 } from "./2.4-mcp-server-integration";
import { task as t5 } from "./2.5-built-in-tools";

export const domain: DomainContent = {
  id: 2,
  name: "Tool Design & MCP Integration",
  weight: 18,
  course: "the Model Context Protocol course",
  tasks: [t1, t2, t3, t4, t5],
};

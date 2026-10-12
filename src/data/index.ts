/* All study content. Each domain folder holds one folder per task statement with its lesson and drill questions. */
import type { Domain, DomainContent, Lesson, PracticeTestSource, QuestionSource } from "../lib/types";
import { domain as d1 } from "./domains/1-agentic-architecture-orchestration";
import { domain as d2 } from "./domains/2-tool-design-mcp-integration";
import { domain as d3 } from "./domains/3-claude-code-configuration-workflows";
import { domain as d4 } from "./domains/4-prompt-engineering-structured-output";
import { domain as d5 } from "./domains/5-context-management-reliability";
import { test as test1 } from "./tests/test-1";
import { test as test2 } from "./tests/test-2";

export { SCENARIOS } from "./scenarios";
export { CERTSAFARI, COMMUNITY_RESOURCES, OFFICIAL_RESOURCES, type Resource } from "./resources";

export const DOMAIN_CONTENT: DomainContent[] = [d1, d2, d3, d4, d5];

export const DOMAINS: Domain[] = DOMAIN_CONTENT.map(({ tasks, ...d }) => ({ ...d, tasks: tasks.map(({ id, title, idea }) => ({ id, title, idea })) }));

export const LESSONS: Record<string, Lesson> = Object.fromEntries(DOMAIN_CONTENT.flatMap((d) => d.tasks.map((t) => [t.id, t.lesson])));

export const QUESTION_BANK: QuestionSource[] = DOMAIN_CONTENT.flatMap((d) => d.tasks.flatMap((t) => t.questions.map((q) => ({ task: t.id, ...q }))));

export const PRACTICE_TESTS: PracticeTestSource[] = [test1, test2];

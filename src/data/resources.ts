/* Study resources outside this site. Community links must write their own questions; never link sites that share real exam content. */
export interface Resource { tag: string; name: string; by: string; url: string; about: string }

export const OFFICIAL_RESOURCES: Resource[] = [
  {
    tag: "PDF",
    name: "Claude Certified Architect – Foundations exam guide",
    by: "Anthropic",
    url: "https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542750%2FClaude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf",
    about: "The source for the five domains, 30 task statements and six scenarios this site follows. Read it for the exact wording.",
  },
  {
    tag: "Courses",
    name: "Anthropic Academy",
    by: "Anthropic on Skilljar",
    url: "https://anthropic.skilljar.com/",
    about: "Free courses on the Claude API, agents, MCP and Claude Code. Start here if your scores are below 50%.",
  },
  {
    tag: "Docs",
    name: "Claude Developer Platform documentation",
    by: "Anthropic",
    url: "https://platform.claude.com/docs",
    about: "Messages API, tool use, structured output, prompt caching and the Agent SDK. Check code from any study material against it.",
  },
  {
    tag: "Docs",
    name: "Claude Code documentation",
    by: "Anthropic",
    url: "https://code.claude.com/docs",
    about: "CLAUDE.md, slash commands, skills, hooks, subagents and MCP configuration for domain 3.",
  },
];

export const CERTSAFARI: Resource = {
  tag: "Questions",
  name: "CertSafari practice questions",
  by: "CertSafari",
  url: "https://www.certsafari.com/anthropic/claude-certified-architect-foundations",
  about: "Free bank of 480 original exam-style questions with explanations, plus 30 lessons. Useful once you are scoring 75% or more and have finished the questions here.",
};

export const COMMUNITY_RESOURCES: Resource[] = [CERTSAFARI];

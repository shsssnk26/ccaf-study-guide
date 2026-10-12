/* Generated from the original single-page site; edit freely. */
/* The six settings follow the scenario list in the exam guide, described in our own words. */
import type { Scenario, ScenarioKey } from "../lib/types";

export const SCENARIOS: Record<ScenarioKey, Scenario> = {
  "cs": {
    "name": "Customer Support Resolution Agent",
    "description": "You are building a customer support agent with the Claude Agent SDK. It handles returns, billing disputes and account issues through four MCP tools: get_customer, lookup_order, process_refund and escalate_to_human. The target is to resolve at least 80% of contacts on first touch while escalating when it should."
  },
  "cg": {
    "name": "Code Generation with Claude Code",
    "description": "Your team uses Claude Code for daily development work: generating code, refactoring, debugging and documentation. You are setting it up with custom slash commands, CLAUDE.md configuration, and a shared understanding of when to use plan mode and when to execute directly."
  },
  "ma": {
    "name": "Multi-Agent Research System",
    "description": "You are building a multi-agent research system with the Claude Agent SDK. A coordinator agent delegates to subagents that search the web, analyze documents, synthesize findings and write reports. The system produces cited reports on topics that users submit."
  },
  "dp": {
    "name": "Developer Productivity with Claude",
    "description": "You are building developer productivity tools with the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate and automate routine tasks. It uses the built-in tools (Read, Write, Edit, Bash, Grep, Glob) and connects to MCP servers."
  },
  "ci": {
    "name": "Claude Code for Continuous Integration",
    "description": "You are integrating Claude Code into a CI/CD pipeline. It runs automated code review, generates tests and posts feedback on pull requests. Your prompts must produce feedback developers can act on, with few false positives."
  },
  "ex": {
    "name": "Structured Data Extraction",
    "description": "You are building a structured data extraction system with Claude. It pulls information from unstructured documents, validates the output against JSON schemas, and feeds downstream systems. It must stay accurate and handle edge cases gracefully."
  }
};

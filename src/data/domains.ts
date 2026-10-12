/* Generated from the original single-page site; edit freely. */
import type { Domain } from "../lib/types";

export const DOMAINS: Domain[] = [
  {
    "id": 1,
    "name": "Agentic Architecture & Orchestration",
    "weight": 27,
    "course": "the Claude API and agent-building courses",
    "tasks": [
      {
        "id": "1.1",
        "title": "Agentic loops",
        "idea": "The loop continues while stop_reason is tool_use and ends on end_turn. Tool results go back into the history. Text, phrases and turn caps are not completion signals."
      },
      {
        "id": "1.2",
        "title": "Coordinator and subagent orchestration",
        "idea": "Hub and spoke: the coordinator decomposes, delegates, collects every result and decides which subagents a request needs. Subagents share no context."
      },
      {
        "id": "1.3",
        "title": "Subagent invocation and context passing",
        "idea": "Subagents are spawned with the Task tool and know only their prompt. Pass findings and source details explicitly. Several Task calls in one response run in parallel."
      },
      {
        "id": "1.4",
        "title": "Workflow enforcement and handoff",
        "idea": "Rules that must always hold get programmatic gates, because prompts fail some of the time. Escalations carry a structured handoff a human can act on."
      },
      {
        "id": "1.5",
        "title": "Hooks for interception and normalization",
        "idea": "Hooks give deterministic guarantees: intercept a call before it runs to block it, or transform a result after it returns."
      },
      {
        "id": "1.6",
        "title": "Task decomposition",
        "idea": "Predictable steps suit prompt chaining; open-ended work needs decomposition that adapts to findings. Large reviews split into per-file passes plus a cross-file pass."
      },
      {
        "id": "1.7",
        "title": "Session state, resumption and forking",
        "idea": "Resume a named session when its context is still mostly valid, and say what changed. Start fresh with a summary when it is stale. fork_session branches one analysis into independent explorations."
      }
    ]
  },
  {
    "id": 2,
    "name": "Tool Design & MCP Integration",
    "weight": 18,
    "course": "the Model Context Protocol course",
    "tasks": [
      {
        "id": "2.1",
        "title": "Tool descriptions and boundaries",
        "idea": "Descriptions are how the model picks a tool. Say what each does, its inputs, edge cases and when to use it over a similar tool. Rename or split tools that overlap."
      },
      {
        "id": "2.2",
        "title": "Structured error responses",
        "idea": "Return errors with a category, a retryable flag and a readable message. A valid empty result is not a failure."
      },
      {
        "id": "2.3",
        "title": "Tool distribution and tool_choice",
        "idea": "Give each agent only the tools its role needs. With tool_choice, auto may answer in text, any must call a tool, and a forced tool runs first."
      },
      {
        "id": "2.4",
        "title": "MCP server integration",
        "idea": "Team servers go in project .mcp.json with environment variable expansion for secrets; personal ones go in ~/.claude.json. Resources expose catalogs without exploratory calls."
      },
      {
        "id": "2.5",
        "title": "Built-in tools",
        "idea": "Grep searches contents, Glob matches file paths, Edit needs unique text, and Read then Write is the fallback. Explore incrementally from entry points."
      }
    ]
  },
  {
    "id": 3,
    "name": "Claude Code Configuration & Workflows",
    "weight": 20,
    "course": "the Claude Code course",
    "tasks": [
      {
        "id": "3.1",
        "title": "CLAUDE.md hierarchy",
        "idea": "User-level CLAUDE.md is personal. Project-level is shared with the team and CI. Directory-level applies in that folder. /memory shows what loaded."
      },
      {
        "id": "3.2",
        "title": "Slash commands and skills",
        "idea": "Project commands and skills live in the repository; personal ones in your home folder. In skill frontmatter, context: fork isolates output, allowed-tools restricts tools, and argument-hint prompts for input."
      },
      {
        "id": "3.3",
        "title": "Path-specific rules",
        "idea": "Rules files with paths globs load only when matching files are edited, which suits conventions that span many directories."
      },
      {
        "id": "3.4",
        "title": "Plan mode versus direct execution",
        "idea": "Plan mode for large, uncertain or multi-approach changes. Direct execution for a clear, well-scoped change. The Explore subagent for verbose discovery."
      },
      {
        "id": "3.5",
        "title": "Iterative refinement",
        "idea": "Concrete input and output examples fix inconsistent transformations. Tests give a target to iterate on, the interview pattern surfaces unknowns, and interacting issues go in one message."
      },
      {
        "id": "3.6",
        "title": "Claude Code in CI/CD",
        "idea": "The -p flag runs Claude Code non-interactively; --output-format json with --json-schema structures findings. An independent instance reviews better than the session that wrote the code."
      }
    ]
  },
  {
    "id": 4,
    "name": "Prompt Engineering & Structured Output",
    "weight": 20,
    "course": "the Claude API course",
    "tasks": [
      {
        "id": "4.1",
        "title": "Explicit criteria in prompts",
        "idea": "Specific criteria beat vague caution. Define what to report and what to skip, and switch off a noisy category while you fix it."
      },
      {
        "id": "4.2",
        "title": "Few-shot prompting",
        "idea": "Two to four targeted examples with reasoning teach judgment on ambiguous cases and give consistent output."
      },
      {
        "id": "4.3",
        "title": "Structured output with tools and schemas",
        "idea": "Tool use with a JSON schema guarantees shape, not meaning. Nullable fields, an 'other' value with detail, and an 'unclear' value mean the model never has to invent an answer."
      },
      {
        "id": "4.4",
        "title": "Validation, retry and feedback loops",
        "idea": "Retries with the specific error fix format problems, never information missing from the source. Track which patterns get dismissed."
      },
      {
        "id": "4.5",
        "title": "Batch processing",
        "idea": "Batches cost half as much, take up to 24 hours and cannot run tools mid-request. Match results to requests by custom_id."
      },
      {
        "id": "4.6",
        "title": "Multi-instance and multi-pass review",
        "idea": "A fresh instance catches what the author session misses. A verification pass with confidence per finding helps route human review."
      }
    ]
  },
  {
    "id": 5,
    "name": "Context Management & Reliability",
    "weight": 15,
    "course": "the Claude API and Claude Code courses",
    "tasks": [
      {
        "id": "5.1",
        "title": "Conversation context management",
        "idea": "Summaries blur exact values, so keep amounts, dates and statuses in a case facts block. Put key findings first in long inputs."
      },
      {
        "id": "5.2",
        "title": "Escalation and ambiguity",
        "idea": "Escalate on an explicit request for a human, a policy gap, or no progress. Sentiment and self-reported confidence are poor triggers. Several matches mean asking for another identifier."
      },
      {
        "id": "5.3",
        "title": "Error propagation across agents",
        "idea": "Recover locally from transient failures, then report with structured context and partial results. Never hide a failure as an empty success."
      },
      {
        "id": "5.4",
        "title": "Context in large codebase exploration",
        "idea": "Long exploration degrades context. Use subagents for verbose discovery, scratchpad files for findings, and a state manifest for crash recovery."
      },
      {
        "id": "5.5",
        "title": "Human review and confidence calibration",
        "idea": "Aggregate accuracy hides weak segments. Calibrate confidence on labelled data and keep stratified sampling of high-confidence output."
      },
      {
        "id": "5.6",
        "title": "Provenance and uncertainty in synthesis",
        "idea": "Keep each claim tied to its source and date. Report conflicting values with attribution, and separate established findings from contested ones."
      }
    ]
  }
];

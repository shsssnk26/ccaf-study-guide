/* Generated from the original single-page site; edit freely. */
/* Lessons: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../lib/types";

export const LESSONS: Record<string, Lesson> = {
  "1.1": {
    terms: [
      {
        "term": "stop_reason",
        "meaning": "A field on every response saying why the model stopped. tool_use means it wants tools run; end_turn means it has finished."
      },
      {
        "term": "tool_result",
        "meaning": "The message your code sends back with a tool's output, tagged with the id of the request it answers."
      },
      {
        "term": "Model-driven decisions",
        "meaning": "The model chooses the next tool from context. Your code runs it and reports back."
      }
    ],
    caption: "A minimal loop with the Messages API (Python)",
    code: `messages = [{"role": "user", "content": question}]
while True:
    response = client.messages.create(
        model=MODEL, max_tokens=1024, tools=TOOLS, messages=messages)
    messages.append({"role": "assistant", "content": response.content})
    if response.stop_reason != "tool_use":
        break                       # end_turn: the model has finished
    results = [{"type": "tool_result", "tool_use_id": b.id,
                "content": run_tool(b.name, b.input)}
               for b in response.content if b.type == "tool_use"]
    messages.append({"role": "user", "content": results})`,
    antiPatterns: [
      {
        "move": "Ending the loop when the reply contains text",
        "why": "A reply can hold text and a tool request together, so the agent stops before acting."
      },
      {
        "move": "Looking for phrases such as \"I'm done\"",
        "why": "Natural language is not a reliable completion signal."
      },
      {
        "move": "A turn cap as the main stopping rule",
        "why": "It cuts off real work. Keep a cap only as a safety net."
      }
    ],
  },
  "1.2": {
    terms: [
      {
        "term": "Hub and spoke",
        "meaning": "One coordinator in the middle. All communication between subagents passes through it."
      },
      {
        "term": "Decomposition",
        "meaning": "How the coordinator breaks a request into subtasks. Too narrow, and whole areas go uncovered."
      },
      {
        "term": "Iterative refinement",
        "meaning": "The coordinator reviews the synthesis for gaps, re-delegates targeted work, and synthesizes again."
      }
    ],
    caption: "What a coordinator does on each request",
    code: `1. Read the request and list the areas it must cover.
2. Choose only the subagents this request needs.
3. Give each one a distinct scope (a subtopic or a source type).
4. Collect every result, then check the whole for gaps.
5. Re-delegate targeted follow-ups, then synthesize.`,
    antiPatterns: [
      {
        "move": "Running the full pipeline for every request",
        "why": "A simple request pays for stages it does not need."
      },
      {
        "move": "Blaming a downstream agent for missing topics",
        "why": "If the subtasks were too narrow, the fault is the coordinator's decomposition."
      },
      {
        "move": "Letting subagents message each other directly",
        "why": "You lose observability and consistent error handling."
      }
    ],
  },
  "1.3": {
    terms: [
      {
        "term": "Task tool",
        "meaning": "The tool a coordinator calls to spawn a subagent. The exam guide calls it Task; current SDK documentation names it Agent."
      },
      {
        "term": "AgentDefinition",
        "meaning": "A subagent's configuration: when to use it, its system prompt, and the tools it may use."
      },
      {
        "term": "Explicit context passing",
        "meaning": "A subagent starts with only its prompt, so findings and sources must be written into it."
      }
    ],
    caption: "Defining a subagent with the Agent SDK (Python)",
    code: `from claude_agent_sdk import query, ClaudeAgentOptions, AgentDefinition

options = ClaudeAgentOptions(
    allowed_tools=["Read", "Grep", "Agent"],   # the exam guide lists this as "Task"
    agents={
        "synthesizer": AgentDefinition(
            description="Writes the final report from supplied findings.",
            prompt="You write cited reports. Use only the findings you are given.",
            tools=["Read"],
        )
    },
)
# The delegation prompt must carry the findings and their sources.`,
    antiPatterns: [
      {
        "move": "Writing \"use the findings above\" in a delegation prompt",
        "why": "The subagent cannot see anything above. It will write from general knowledge."
      },
      {
        "move": "Spawning independent subagents one turn at a time",
        "why": "They run in sequence. Put the calls in one response to run them in parallel."
      },
      {
        "move": "Step-by-step procedures where goals would do",
        "why": "A fixed procedure breaks on cases it did not anticipate."
      }
    ],
  },
  "1.4": {
    terms: [
      {
        "term": "Programmatic prerequisite",
        "meaning": "Code that blocks a tool until an earlier step has succeeded."
      },
      {
        "term": "Deterministic versus probabilistic",
        "meaning": "Code always enforces a rule. A prompt makes the right behaviour likely, not certain."
      },
      {
        "term": "Structured handoff",
        "meaning": "The summary a human receives at escalation: who the customer is, the root cause, and what to do next."
      }
    ],
    caption: "A gate in plain Python",
    code: `verified = set()          # customer ids confirmed in this session

def before_tool(name, args):
    if name == "process_refund" and args["customer_id"] not in verified:
        return {"blocked": True,
                "reason": "Call get_customer first to verify this customer."}
    return {"blocked": False}`,
    antiPatterns: [
      {
        "move": "A stronger system prompt for a rule with financial consequences",
        "why": "Prompt instructions fail some of the time. Money needs a guarantee."
      },
      {
        "move": "Few-shot examples to enforce tool order",
        "why": "Still probabilistic."
      },
      {
        "move": "Escalating with \"customer needs help\"",
        "why": "The human has no transcript and must start again."
      }
    ],
  },
  "1.5": {
    terms: [
      {
        "term": "PreToolUse",
        "meaning": "A hook that runs before a tool call. It can block the call or change its input."
      },
      {
        "term": "PostToolUse",
        "meaning": "A hook that runs after a tool returns. It can change what the model sees."
      },
      {
        "term": "Interception",
        "meaning": "Catching a call or a result in code, outside the model's discretion."
      }
    ],
    caption: "Blocking refunds above $500 with an Agent SDK hook (Python)",
    code: `async def refund_limit(input_data, tool_use_id, context):
    if input_data["tool_input"].get("amount", 0) > 500:
        return {"hookSpecificOutput": {
            "hookEventName": input_data["hook_event_name"],
            "permissionDecision": "deny",
            "permissionDecisionReason": "Over $500: use escalate_to_human.",
        }}
    return {}

options = ClaudeAgentOptions(hooks={
    "PreToolUse": [HookMatcher(matcher="mcp__support__process_refund",
                               hooks=[refund_limit])]})`,
    antiPatterns: [
      {
        "move": "Formatting a file in a hook that runs before the write",
        "why": "The file does not exist yet. Processing output belongs after the tool."
      },
      {
        "move": "Auditing violations after the fact",
        "why": "The refund has already gone out."
      },
      {
        "move": "Checking a condition at a moment it need not hold",
        "why": "Place the check at the boundary where the condition must be true."
      }
    ],
  },
  "1.6": {
    terms: [
      {
        "term": "Prompt chaining",
        "meaning": "A fixed sequence of focused steps, each taking the previous step's output."
      },
      {
        "term": "Dynamic decomposition",
        "meaning": "Subtasks generated as the work reveals what is needed."
      },
      {
        "term": "Attention dilution",
        "meaning": "Quality drops when one pass has to cover too much at once."
      }
    ],
    caption: "Splitting a large review into focused passes",
    code: `# Predictable work: a fixed chain, one focus per step
for path in changed_files:
    local[path] = review(path, focus="bugs in this file only")

cross_file = review_all(summaries(local),
                        focus="how data flows between these files")`,
    antiPatterns: [
      {
        "move": "One pass over many files",
        "why": "Feedback becomes uneven and contradicts itself."
      },
      {
        "move": "Merging focused steps into one prompt to save time",
        "why": "You lose the checks between steps and dilute attention."
      },
      {
        "move": "A fixed pipeline for an open-ended investigation",
        "why": "The useful next step depends on what the last one found."
      }
    ],
  },
  "1.7": {
    terms: [
      {
        "term": "--resume",
        "meaning": "Continues a named session with its earlier conversation."
      },
      {
        "term": "fork_session",
        "meaning": "Branches one conversation into independent copies, to explore different approaches from the same starting point."
      },
      {
        "term": "Stale context",
        "meaning": "Earlier tool results that no longer match the files on disk."
      }
    ],
    caption: "Resume, or start fresh",
    code: `# Context still mostly valid: resume and say what changed
claude --resume billing-audit
> auth/session.py and auth/tokens.py changed since last time. Re-read those two.

# Most files changed: start a new session and inject a summary
claude
> Context from an earlier investigation: <structured summary>`,
    antiPatterns: [
      {
        "move": "Resuming after a large refactor",
        "why": "The session reasons from old file contents and paths."
      },
      {
        "move": "Using fork_session to keep two instances' files apart",
        "why": "It branches the conversation only. Files need separate working directories."
      },
      {
        "move": "Resuming without saying what changed",
        "why": "The agent has no reason to re-read anything."
      }
    ],
  },
  "2.1": {
    terms: [
      {
        "term": "Tool description",
        "meaning": "The text the model reads to decide whether and how to use a tool."
      },
      {
        "term": "Boundary",
        "meaning": "A statement of when to use this tool and when to use a similar one instead."
      },
      {
        "term": "Overlap",
        "meaning": "Two tools whose names or descriptions could both fit the same request."
      }
    ],
    caption: "A description that separates two similar tools",
    code: `{
  "name": "lookup_order",
  "description": (
      "Look up one order by its order ID, e.g. 4471. Returns item, amount, "
      "date and delivery status. Use for questions about a specific order. "
      "To find or verify who the customer is, use get_customer instead. "
      "An unknown ID returns found: false, which is not an error."),
  "input_schema": {"type": "object",
                   "properties": {"order_id": {"type": "string"}},
                   "required": ["order_id"]},
}`,
    antiPatterns: [
      {
        "move": "One-line descriptions for similar tools",
        "why": "The model has nothing to tell them apart."
      },
      {
        "move": "Building a routing layer first",
        "why": "Better descriptions are the smaller fix for the same cause."
      },
      {
        "move": "Keyword-heavy system prompt lines",
        "why": "A phrase like \"always analyze\" can pull every request toward one tool."
      }
    ],
  },
  "2.2": {
    terms: [
      {
        "term": "isError",
        "meaning": "The flag that tells the agent a tool call failed."
      },
      {
        "term": "errorCategory",
        "meaning": "The kind of failure: transient, validation, business or permission."
      },
      {
        "term": "isRetryable",
        "meaning": "Whether trying again could succeed."
      }
    ],
    caption: "Three results the agent can tell apart",
    code: `# Transient: worth retrying
{"isError": True, "errorCategory": "transient", "isRetryable": True,
 "message": "Order system timed out. Try again in a few seconds."}

# Business rule: do not retry, explain to the customer
{"isError": True, "errorCategory": "business", "isRetryable": False,
 "message": "Refund exceeds the order amount."}

# Not an error at all
{"found": False, "order_id": "9999"}`,
    antiPatterns: [
      {
        "move": "\"Operation failed\" for everything",
        "why": "The agent cannot choose between retrying, explaining and escalating."
      },
      {
        "move": "An empty list for a timeout",
        "why": "A failure now looks like \"nothing matched\"."
      },
      {
        "move": "Hiding rate limits by retrying inside the server",
        "why": "The agent loses the chance to reorder or pause its remaining work."
      }
    ],
  },
  "2.3": {
    terms: [
      {
        "term": "Scoped tool access",
        "meaning": "Each agent gets only the tools its role needs."
      },
      {
        "term": "tool_choice",
        "meaning": "A request setting that controls whether, and which, tool the model must call."
      },
      {
        "term": "Constrained alternative",
        "meaning": "A narrow tool that replaces a general one, such as load_document in place of fetch_url."
      }
    ],
    caption: "The three tool_choice settings",
    code: `tool_choice={"type": "auto"}                              # may answer in text
tool_choice={"type": "any"}                               # must call some tool
tool_choice={"type": "tool", "name": "extract_metadata"}  # must call this one`,
    antiPatterns: [
      {
        "move": "Giving every agent every tool",
        "why": "Selection gets less reliable, and agents use tools outside their role."
      },
      {
        "move": "Using \"any\" when one tool must run first",
        "why": "It guarantees a call, not which tool."
      },
      {
        "move": "A blocklist of tools to avoid",
        "why": "New tools are allowed by default. An allowlist is safer."
      }
    ],
  },
  "2.4": {
    terms: [
      {
        "term": ".mcp.json",
        "meaning": "Project-level MCP server configuration, shared through version control."
      },
      {
        "term": "~/.claude.json",
        "meaning": "Your personal configuration, for servers only you use."
      },
      {
        "term": "MCP resources",
        "meaning": "Read-only catalogs a server exposes, such as schemas or document lists, so an agent can see what exists."
      }
    ],
    caption: "A shared server with a personal token (.mcp.json)",
    code: `{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "\${GITHUB_TOKEN}" }
    }
  }
}`,
    antiPatterns: [
      {
        "move": "A shared token committed to the repository",
        "why": "Secrets do not belong in version control."
      },
      {
        "move": "A team server set up only in one person's home folder",
        "why": "Nobody else gets it."
      },
      {
        "move": "A custom server for a standard integration",
        "why": "Use an existing community server and save custom work for team-specific needs."
      }
    ],
  },
  "2.5": {
    terms: [
      {
        "term": "Grep",
        "meaning": "Searches inside file contents for a pattern."
      },
      {
        "term": "Glob",
        "meaning": "Finds files whose paths match a pattern."
      },
      {
        "term": "Edit",
        "meaning": "Changes a file by matching text that must be unique in it."
      }
    ],
    caption: "Which tool for which job",
    code: `Find callers of a function        Grep   calculateTax(
Find files by name                Glob   **/*.test.tsx
Change one unique line            Edit
Edit fails, text is not unique    Read the file, then Write it back
Understand a flow                 Grep the entry point, Read it, follow imports`,
    antiPatterns: [
      {
        "move": "Reading every file up front",
        "why": "Context fills before the question is answered."
      },
      {
        "move": "Glob to search contents, or Grep to find file names",
        "why": "Each does the other's job badly."
      },
      {
        "move": "One Grep for a function that is re-exported under other names",
        "why": "Callers using the other names are missed. List every exported name first."
      }
    ],
  },
  "3.1": {
    terms: [
      {
        "term": "User-level",
        "meaning": "~/.claude/CLAUDE.md: your own preferences, on your machine only."
      },
      {
        "term": "Project-level",
        "meaning": "CLAUDE.md in the repository: shared with every teammate and with CI."
      },
      {
        "term": "@import",
        "meaning": "A line that pulls another file into a CLAUDE.md, to keep it modular."
      }
    ],
    caption: "Where instructions live",
    code: `~/.claude/CLAUDE.md            personal, this machine only
repo/CLAUDE.md                 shared with the team and CI
repo/packages/api/CLAUDE.md    applies when working in that folder

# inside a CLAUDE.md
@docs/standards/testing.md`,
    antiPatterns: [
      {
        "move": "Team standards in a home-folder file",
        "why": "New teammates and CI never receive them."
      },
      {
        "move": "One 700-line CLAUDE.md",
        "why": "Hard to maintain. Split it into topic files under .claude/rules/."
      },
      {
        "move": "Assuming one level overrides another",
        "why": "All levels load together. Conflicting instructions should be fixed, not ranked."
      }
    ],
  },
  "3.2": {
    terms: [
      {
        "term": ".claude/commands/",
        "meaning": "Project slash commands, shared when the repository is cloned."
      },
      {
        "term": "Skill",
        "meaning": "A folder with a SKILL.md: instructions Claude loads on demand for one kind of task."
      },
      {
        "term": "Frontmatter",
        "meaning": "The settings block at the top of SKILL.md."
      }
    ],
    caption: "A skill that keeps its output out of the main conversation",
    code: `.claude/skills/analyze-codebase/SKILL.md
---
name: analyze-codebase
description: Map modules and dependencies. Use before large refactors.
context: fork
allowed-tools: Read, Grep, Glob
argument-hint: [directory]
---
Explore the directory given in the arguments and report its structure.`,
    antiPatterns: [
      {
        "move": "A team command in ~/.claude/commands/",
        "why": "Only you have it."
      },
      {
        "move": "A verbose skill running in the main conversation",
        "why": "Its output crowds out the task you were doing."
      },
      {
        "move": "A skill for standards that always apply",
        "why": "Skills load on demand. Always-on standards belong in CLAUDE.md."
      }
    ],
  },
  "3.3": {
    terms: [
      {
        "term": ".claude/rules/",
        "meaning": "A folder of rule files, one topic each."
      },
      {
        "term": "paths",
        "meaning": "A frontmatter field listing glob patterns. The rule loads only when a matching file is edited."
      },
      {
        "term": "Glob pattern",
        "meaning": "A path pattern such as **/*.test.tsx or terraform/**/*."
      }
    ],
    caption: "A rule that follows test files anywhere",
    code: `.claude/rules/testing.md
---
paths: ["**/*.test.tsx"]
---
Use the shared render helper. One behaviour per test.`,
    antiPatterns: [
      {
        "move": "A CLAUDE.md in every folder for a file-type convention",
        "why": "The convention follows the file type, not the folder."
      },
      {
        "move": "Expecting @import to load conditionally",
        "why": "Imported files always load."
      },
      {
        "move": "A skill for conventions that must apply automatically",
        "why": "Someone has to remember to invoke it."
      }
    ],
  },
  "3.4": {
    terms: [
      {
        "term": "Plan mode",
        "meaning": "Claude explores and proposes a plan without changing files, for you to approve."
      },
      {
        "term": "Direct execution",
        "meaning": "Claude makes the change straight away."
      },
      {
        "term": "Explore subagent",
        "meaning": "A read-only helper that investigates in its own context and returns a summary."
      }
    ],
    caption: "Matching the mode to the task",
    code: `One-function fix with a clear stack trace          Direct execution
Library migration across 45+ files                 Plan mode, then execute
Two valid architectures to choose between          Plan mode
"Explain how refunds flow through this system"     Explore subagent`,
    antiPatterns: [
      {
        "move": "Planning a one-line fix because the codebase is large",
        "why": "Judge the change, not the codebase."
      },
      {
        "move": "Direct execution on a broad change with unknown usage",
        "why": "Dependencies surface late and force rework."
      },
      {
        "move": "Plan mode for pure discovery",
        "why": "The reading fills your main context. Explore keeps it separate."
      }
    ],
  },
  "3.5": {
    terms: [
      {
        "term": "Input and output examples",
        "meaning": "Real inputs paired with the exact output you expect."
      },
      {
        "term": "Test-driven iteration",
        "meaning": "Write tests first, then share the failures to guide each fix."
      },
      {
        "term": "Interview pattern",
        "meaning": "Asking Claude to question you before building, to surface decisions you had not considered."
      }
    ],
    caption: "Two examples that settle a field mapping",
    code: `Input :  2026-03-04 ERROR user=42 msg="card declined"
Output:  {"ts": "2026-03-04", "level": "error",
          "user": {"id": 42}, "message": "card declined"}

Input :  2026-03-04 INFO msg="ping"
Output:  {"ts": "2026-03-04", "level": "info",
          "user": null, "message": "ping"}`,
    antiPatterns: [
      {
        "move": "Rewording the prose a fourth time",
        "why": "Prose was read three different ways already. Show examples."
      },
      {
        "move": "Fixing interacting problems one message at a time",
        "why": "Each fix breaks the next. Send them together."
      },
      {
        "move": "Asking for an interview when requirements are known",
        "why": "The interview is for unknowns."
      }
    ],
  },
  "3.6": {
    terms: [
      {
        "term": "-p (--print)",
        "meaning": "Runs Claude Code once, without waiting for input, and prints the result."
      },
      {
        "term": "--json-schema",
        "meaning": "Used with --output-format json to enforce the shape of the output."
      },
      {
        "term": "Session isolation",
        "meaning": "A reviewer that does not share the author's conversation, so it does not inherit its reasoning."
      }
    ],
    caption: "A review step in a pipeline (shell)",
    code: `claude -p "Review this diff for security issues" \\
  --output-format json \\
  --json-schema "$(cat review-schema.json)" > findings.json`,
    antiPatterns: [
      {
        "move": "Parsing prose output with regular expressions",
        "why": "It breaks whenever the wording shifts."
      },
      {
        "move": "Reviewing code in the session that wrote it",
        "why": "It rarely questions its own decisions."
      },
      {
        "move": "Re-running a review without the earlier findings",
        "why": "The same comments are posted again."
      }
    ],
  },
  "4.1": {
    terms: [
      {
        "term": "Explicit criteria",
        "meaning": "A statement of exactly what to report and what to skip."
      },
      {
        "term": "False positive rate",
        "meaning": "The share of findings that are wrong. A high rate in one category costs trust in all of them."
      },
      {
        "term": "Severity definition",
        "meaning": "What each level means, with an example, so labels stay consistent."
      }
    ],
    caption: "Criteria a reviewer can apply the same way every time",
    code: `Report a finding only when the code's behaviour contradicts its comment
or a caller's expectation. Skip style, naming and local conventions.

critical: data loss or security exposure, e.g. SQL built from user input
major:    wrong result on a common path, e.g. off-by-one in pagination
minor:    wrong result on a rare path, e.g. unhandled empty list`,
    antiPatterns: [
      {
        "move": "\"Be conservative\" or \"only report high-confidence findings\"",
        "why": "Vague caution does not improve precision."
      },
      {
        "move": "Keeping a noisy category running",
        "why": "Developers stop reading the accurate findings too."
      },
      {
        "move": "Lowering temperature to fix inconsistent labels",
        "why": "The labels vary because the criteria are undefined."
      }
    ],
  },
  "4.2": {
    terms: [
      {
        "term": "Few-shot example",
        "meaning": "A worked example placed in the prompt."
      },
      {
        "term": "Reasoning in examples",
        "meaning": "Each example says why that choice was made over the alternative."
      },
      {
        "term": "Generalization",
        "meaning": "The model applies the judgment to new cases, beyond the ones shown."
      }
    ],
    caption: "Examples for an ambiguous request",
    code: `Request: "This doesn't fit, I want to send it back."
Action:  offer_exchange
Why:     The problem is size, not the product. An exchange solves it,
         so offer that first and refund only if they decline.

Request: "It arrived broken and I don't want another one."
Action:  process_refund
Why:     They have ruled out a replacement.`,
    antiPatterns: [
      {
        "move": "A long list of examples with no reasoning",
        "why": "It teaches pattern-matching, not judgment."
      },
      {
        "move": "More written instructions after instructions failed",
        "why": "Show worked examples instead."
      },
      {
        "move": "Examples for a problem that descriptions would fix",
        "why": "Fix overlapping tool descriptions first."
      }
    ],
  },
  "4.3": {
    terms: [
      {
        "term": "Tool use for structured output",
        "meaning": "Define a tool whose input schema is the structure you want, then have the model call it."
      },
      {
        "term": "Nullable field",
        "meaning": "A field allowed to be null, for information the source may not contain."
      },
      {
        "term": "\"other\" plus detail",
        "meaning": "An extra enum value with a free-text field, for real values outside your list."
      }
    ],
    caption: "A field that never forces a guess",
    code: `"payment_terms": {"type": ["string", "null"],
                  "enum": ["net_30", "net_60", "due_on_receipt",
                           "other", "unclear", null]},
"payment_terms_detail": {"type": ["string", "null"]}

# not stated -> null | "net 45" -> other + detail | contradictory -> unclear`,
    antiPatterns: [
      {
        "move": "Marking every field required",
        "why": "The model invents values for information that is absent."
      },
      {
        "move": "Free text where categories are needed",
        "why": "\"PO\" and \"purchase order\" become two categories."
      },
      {
        "move": "Trusting the schema to catch wrong values",
        "why": "It checks shape. Totals that do not add up still pass."
      }
    ],
  },
  "4.4": {
    terms: [
      {
        "term": "Retry with error feedback",
        "meaning": "Resend the document, the failed output and the specific error."
      },
      {
        "term": "Semantic validation",
        "meaning": "Checking that values make sense, beyond having the right shape."
      },
      {
        "term": "detected_pattern",
        "meaning": "A field recording what triggered a finding, so dismissals can be analysed."
      }
    ],
    caption: "A retry prompt, and fields that check themselves",
    code: `retry_prompt = f"""Document:
{document}

Your previous extraction:
{failed_json}

It failed validation: {error}
Return a corrected extraction."""

"stated_total": 1180.00, "calculated_total": 1210.00, "conflict_detected": true`,
    antiPatterns: [
      {
        "move": "Retrying when the value is not in the document",
        "why": "No number of retries can supply missing information."
      },
      {
        "move": "Retrying without the error details",
        "why": "The model repeats the same mistake."
      },
      {
        "move": "\"Correcting\" source data so validation passes",
        "why": "It hides what the document actually says."
      }
    ],
  },
  "4.5": {
    terms: [
      {
        "term": "Message Batches API",
        "meaning": "Submits many requests at once for about half the cost, with results within 24 hours."
      },
      {
        "term": "custom_id",
        "meaning": "Your own label on each request, used to match results and resubmit failures."
      },
      {
        "term": "Processing window",
        "meaning": "How long you wait between batch submissions. Add it to the 24 hours when checking a deadline."
      }
    ],
    caption: "Submitting a batch (Python)",
    code: `batch = client.messages.batches.create(requests=[
    {"custom_id": "invoice-0001",
     "params": {"model": MODEL, "max_tokens": 1024,
                "messages": [{"role": "user", "content": doc_1}]}},
    # ...one entry per document
])
# Later: match each result to its request by custom_id,
# then resubmit only the ones that failed.`,
    antiPatterns: [
      {
        "move": "Batch for a check that blocks a merge",
        "why": "There is no latency guarantee."
      },
      {
        "move": "Batching work that needs a tool call mid-request",
        "why": "A batch request cannot run a tool and continue."
      },
      {
        "move": "Resubmitting the whole batch after a few failures",
        "why": "Use custom_id to resend only the failures."
      }
    ],
  },
  "4.6": {
    terms: [
      {
        "term": "Independent review instance",
        "meaning": "A second session that sees the work but not the reasoning behind it."
      },
      {
        "term": "Per-file and cross-file passes",
        "meaning": "Local review of each file, then a separate pass on how they fit together."
      },
      {
        "term": "Verification pass",
        "meaning": "A second look that attaches a confidence level to each finding."
      }
    ],
    caption: "A review pipeline",
    code: `generate  ->  session A writes the patch
review    ->  session B gets the diff and project standards only
verify    ->  each finding returns {issue, location, confidence}
route     ->  low confidence goes to a person, the rest is posted`,
    antiPatterns: [
      {
        "move": "\"Review your own work critically\" in the same session",
        "why": "It still holds the reasoning that produced the code."
      },
      {
        "move": "Extended thinking in place of independence",
        "why": "More thought from the same starting point."
      },
      {
        "move": "Running the same pass three times",
        "why": "Repetition is not a second opinion."
      }
    ],
  },
  "5.1": {
    terms: [
      {
        "term": "Case facts block",
        "meaning": "A fixed section of exact values that is included in every prompt and never summarized."
      },
      {
        "term": "Progressive summarization",
        "meaning": "Compressing older turns again and again, which wears away numbers and dates."
      },
      {
        "term": "Lost in the middle",
        "meaning": "Models attend best to the start and end of long inputs."
      }
    ],
    caption: "Keeping exact values out of the summary",
    code: `CASE FACTS (do not summarize)
customer_id: C-1001          order: 4471
refund_promised: $247.83     promised_by: 2026-10-03
status: awaiting carrier confirmation

SUMMARY OF EARLIER TURNS
...`,
    antiPatterns: [
      {
        "move": "Exact amounts kept only in a running summary",
        "why": "They turn into \"a refund soon\"."
      },
      {
        "move": "Long tool output left untrimmed",
        "why": "Forty fields crowd out the five that matter."
      },
      {
        "move": "Key findings buried mid-document",
        "why": "They are the likeliest part to be missed."
      }
    ],
  },
  "5.2": {
    terms: [
      {
        "term": "Escalation trigger",
        "meaning": "A condition that should send the case to a human."
      },
      {
        "term": "Policy gap",
        "meaning": "A request the policy does not address either way."
      },
      {
        "term": "Disambiguation",
        "meaning": "Asking for another identifier when more than one record matches."
      }
    ],
    caption: "What to do in each situation",
    code: `Customer asks for a human           Escalate now, no investigation first
Policy is silent on the request     Escalate
Cannot make meaningful progress     Escalate
Frustrated, and the issue is fixable    Acknowledge, fix, escalate if they ask
Several customers match             Ask for another identifier`,
    antiPatterns: [
      {
        "move": "Escalating on negative sentiment",
        "why": "Sentiment does not measure how hard the case is."
      },
      {
        "move": "Using the model's own confidence score as the trigger",
        "why": "Self-reported confidence is poorly calibrated."
      },
      {
        "move": "Approving or declining when policy says nothing",
        "why": "Either way the agent invents a policy."
      }
    ],
  },
  "5.3": {
    terms: [
      {
        "term": "Local recovery",
        "meaning": "A subagent handles a transient failure itself before involving the coordinator."
      },
      {
        "term": "Structured error context",
        "meaning": "The failure type, what was tried, partial results and possible next steps."
      },
      {
        "term": "Access failure versus empty result",
        "meaning": "\"Could not reach the source\" is different from \"reached it and found nothing\"."
      }
    ],
    caption: "What a subagent reports when it cannot recover",
    code: `{"status": "partial",
 "failure": {"type": "timeout", "source": "trade journal search",
             "attempted": ["2 retries with backoff", "narrower query"]},
 "partial_results": ["..."],
 "suggested_next": "retry later or use the alternate source"}`,
    antiPatterns: [
      {
        "move": "Returning \"search unavailable\" with no detail",
        "why": "The coordinator cannot make a recovery decision."
      },
      {
        "move": "An empty result marked as success",
        "why": "The failure disappears and the report has a silent gap."
      },
      {
        "move": "Ending the whole workflow over one failed source",
        "why": "Ship what you have and mark the gap."
      }
    ],
  },
  "5.4": {
    terms: [
      {
        "term": "Context degradation",
        "meaning": "In long sessions the model starts answering vaguely and forgets what it found earlier."
      },
      {
        "term": "Scratchpad file",
        "meaning": "A file where the agent records key findings, so they outlast the conversation."
      },
      {
        "term": "State manifest",
        "meaning": "A file listing each agent's status and outputs, used to resume after a crash."
      }
    ],
    caption: "Findings and state kept outside the conversation",
    code: `scratch/findings.md       key facts with file paths, appended as found
state/manifest.json       {"agents": {"auth-explorer": "done",
                                      "billing-explorer": "in_progress"},
                           "outputs": "state/*.json"}

# On restart the coordinator loads the manifest and
# injects each agent's saved state into its prompt.`,
    antiPatterns: [
      {
        "move": "Reading dozens of files into the main conversation",
        "why": "Early details are gone by the time you need them."
      },
      {
        "move": "The conversation as the only record",
        "why": "A crash or compaction loses it."
      },
      {
        "move": "Restarting an hour of exploration from zero",
        "why": "Persisted state would have let you continue."
      }
    ],
  },
  "5.5": {
    terms: [
      {
        "term": "Calibration",
        "meaning": "Checking, on labelled data, that a stated confidence matches real accuracy."
      },
      {
        "term": "Stratified sampling",
        "meaning": "Reviewing a random sample drawn from every document type, including auto-approved output."
      },
      {
        "term": "Field-level confidence",
        "meaning": "Confidence reported per field, so reviewers look only where it is low."
      }
    ],
    caption: "Why the average is not enough",
    code: `accuracy overall .............. 97%
  invoices .................... 99%
  receipts .................... 98%
  handwritten forms ........... 81%   <- hidden by the average

Each week: sample 2% of auto-approved extractions,
spread across document types, and have a person check them.`,
    antiPatterns: [
      {
        "move": "Cutting review because the average is high",
        "why": "One document type or field may be failing badly."
      },
      {
        "move": "Trusting confidence that was never calibrated",
        "why": "The number means nothing until it is checked against labels."
      },
      {
        "move": "A higher threshold to catch confidently wrong output",
        "why": "Those errors are above any threshold."
      }
    ],
  },
  "5.6": {
    terms: [
      {
        "term": "Claim-source mapping",
        "meaning": "Each claim stored with the source that supports it."
      },
      {
        "term": "Temporal data",
        "meaning": "Publication or collection dates, so a change over time is not read as a contradiction."
      },
      {
        "term": "Conflict annotation",
        "meaning": "Both values reported with their sources when credible sources disagree."
      }
    ],
    caption: "A finding that keeps its provenance",
    code: `{"claim": "Adoption reached 4.6% of firms",
 "evidence": "Table 3, national survey",
 "source": {"title": "Annual Survey", "url": "https://example.org/survey",
            "published": "2025-11"},
 "conflicts_with": [{"value": "4.1%", "source": "2023 edition"}]}`,
    antiPatterns: [
      {
        "move": "Picking one value when sources disagree",
        "why": "The reader loses the fact that it is contested."
      },
      {
        "move": "Findings passed as prose",
        "why": "Which source said what is lost on the way."
      },
      {
        "move": "Treating different dates as a contradiction",
        "why": "The figure may simply have changed."
      }
    ],
  },
};

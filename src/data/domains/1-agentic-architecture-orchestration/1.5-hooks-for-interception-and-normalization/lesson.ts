/* Lesson for 1.5 Hooks for interception and normalization: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
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
  "caption": "Blocking refunds above $500 with an Agent SDK hook (Python)",
  "code": "async def refund_limit(input_data, tool_use_id, context):\n    if input_data[\"tool_input\"].get(\"amount\", 0) > 500:\n        return {\"hookSpecificOutput\": {\n            \"hookEventName\": input_data[\"hook_event_name\"],\n            \"permissionDecision\": \"deny\",\n            \"permissionDecisionReason\": \"Over $500: use escalate_to_human.\",\n        }}\n    return {}\n\noptions = ClaudeAgentOptions(hooks={\n    \"PreToolUse\": [HookMatcher(matcher=\"mcp__support__process_refund\",\n                               hooks=[refund_limit])]})",
  "antiPatterns": [
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
  ]
};

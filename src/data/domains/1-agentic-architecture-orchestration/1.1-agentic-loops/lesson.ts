/* Lesson for 1.1 Agentic loops: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
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
  "caption": "A minimal loop with the Messages API (Python)",
  "code": "messages = [{\"role\": \"user\", \"content\": question}]\nwhile True:\n    response = client.messages.create(\n        model=MODEL, max_tokens=1024, tools=TOOLS, messages=messages)\n    messages.append({\"role\": \"assistant\", \"content\": response.content})\n    if response.stop_reason != \"tool_use\":\n        break                       # end_turn: the model has finished\n    results = [{\"type\": \"tool_result\", \"tool_use_id\": b.id,\n                \"content\": run_tool(b.name, b.input)}\n               for b in response.content if b.type == \"tool_use\"]\n    messages.append({\"role\": \"user\", \"content\": results})",
  "antiPatterns": [
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
  ]
};

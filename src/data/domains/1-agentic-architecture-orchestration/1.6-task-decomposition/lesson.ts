/* Lesson for 1.6 Task decomposition: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
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
  "caption": "Splitting a large review into focused passes",
  "code": "# Predictable work: a fixed chain, one focus per step\nfor path in changed_files:\n    local[path] = review(path, focus=\"bugs in this file only\")\n\ncross_file = review_all(summaries(local),\n                        focus=\"how data flows between these files\")",
  "antiPatterns": [
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
  ]
};

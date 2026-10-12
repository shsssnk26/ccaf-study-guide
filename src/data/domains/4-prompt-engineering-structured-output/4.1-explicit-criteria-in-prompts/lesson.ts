/* Lesson for 4.1 Explicit criteria in prompts: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
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
  "caption": "Criteria a reviewer can apply the same way every time",
  "code": "Report a finding only when the code's behaviour contradicts its comment\nor a caller's expectation. Skip style, naming and local conventions.\n\ncritical: data loss or security exposure, e.g. SQL built from user input\nmajor:    wrong result on a common path, e.g. off-by-one in pagination\nminor:    wrong result on a rare path, e.g. unhandled empty list",
  "antiPatterns": [
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
  ]
};

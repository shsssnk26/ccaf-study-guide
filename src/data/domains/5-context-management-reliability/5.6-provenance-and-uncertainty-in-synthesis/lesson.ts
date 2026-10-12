/* Lesson for 5.6 Provenance and uncertainty in synthesis: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
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
  "caption": "A finding that keeps its provenance",
  "code": "{\"claim\": \"Adoption reached 4.6% of firms\",\n \"evidence\": \"Table 3, national survey\",\n \"source\": {\"title\": \"Annual Survey\", \"url\": \"https://example.org/survey\",\n            \"published\": \"2025-11\"},\n \"conflicts_with\": [{\"value\": \"4.1%\", \"source\": \"2023 edition\"}]}",
  "antiPatterns": [
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
  ]
};

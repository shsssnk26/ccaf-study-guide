/* Lesson for 3.2 Slash commands and skills: terms, a short implementation (caption + code), and anti-patterns (tempting move, why it fails). */
import type { Lesson } from "../../../../lib/types";

export const lesson: Lesson = {
  "terms": [
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
  "caption": "A skill that keeps its output out of the main conversation",
  "code": ".claude/skills/analyze-codebase/SKILL.md\n---\nname: analyze-codebase\ndescription: Map modules and dependencies. Use before large refactors.\ncontext: fork\nallowed-tools: Read, Grep, Glob\nargument-hint: [directory]\n---\nExplore the directory given in the arguments and report its structure.",
  "antiPatterns": [
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
  ]
};

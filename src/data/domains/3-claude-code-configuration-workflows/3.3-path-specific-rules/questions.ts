/* Drill questions for 3.3 Path-specific rules. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("3.3-1", "3.3-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "cg",
    "stem": "In this codebase, test files sit next to the code they test (Button.test.tsx beside Button.tsx) across more than 40 directories. The team wants its testing conventions applied whenever a test file is edited, and not loaded otherwise. Which mechanism fits best?",
    "options": [
      "A file in .claude/rules/ whose frontmatter has a paths glob such as **/*.test.tsx",
      "A CLAUDE.md with the testing conventions in each of the 40 directories",
      "A testing section in the root CLAUDE.md that begins 'when editing test files'",
      "A skill containing the conventions, invoked by the engineer before editing tests"
    ],
    "explanation": "A glob-scoped rule follows the file type wherever it lives and loads only when it matches. Directory-level files apply by location, not type; the root file always loads; a skill depends on someone remembering to invoke it."
  },
  {
    "scenario": "cg",
    "stem": "To keep the root CLAUDE.md short, the team moved each set of conventions into its own file and pulled them in with @import. Engineers now notice that the React conventions are still in context while they edit Terraform files. Why does this happen?",
    "options": [
      "Imported files are always loaded; loading by file path requires rules files with a paths glob",
      "@import is honoured only in user-level CLAUDE.md files, so the project-level file silently ignores it",
      "The imported files need context: fork in their frontmatter to load on demand",
      "The root CLAUDE.md has passed a size limit, so its conditional logic was skipped"
    ],
    "explanation": "@import is for modularity: it splits a file up but everything imported still loads. Conditional loading comes from path-scoped rules. context: fork belongs to skills, and CLAUDE.md has no conditional logic."
  },
  {
    "scenario": "cg",
    "stem": "The root CLAUDE.md has grown to 1,200 lines covering nine areas, from migrations to React components. Most sessions touch one area, yet all nine are loaded every time, and engineers report that instructions near the middle are often missed. What is the best restructuring?",
    "options": [
      "Split it into .claude/rules/ files with paths globs, so each one loads only when matching files are edited",
      "Split it into nine files and @import all nine of them from the root CLAUDE.md",
      "Keep it as one file and add a table of contents so that the model finds the relevant part",
      "Turn the nine areas into nine skills that engineers invoke whenever they need them"
    ],
    "explanation": "Path-scoped rules load only when relevant, which cuts irrelevant context. Importing all nine files loads exactly the same content as before, and skills depend on each engineer remembering to invoke them."
  }
];

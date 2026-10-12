/* Drill questions for 3.1 CLAUDE.md hierarchy. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("3.1-1", "3.1-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "cg",
    "stem": "A new engineer joins and finds that Claude Code ignores the team's naming and error-handling conventions, though it follows them on every other machine. The conventions were written by the tech lead and live in ~/.claude/CLAUDE.md on the tech lead's laptop; the others copied the file months ago. What is the correct fix?",
    "options": [
      "Move the conventions into the project-level CLAUDE.md, committed to the repository",
      "Add a step to the onboarding document telling new engineers to copy the file into their home folder",
      "Package the conventions as a skill that engineers invoke at the start of each session",
      "Ask the new engineer to restate the conventions at the start of each session until they are habit"
    ],
    "explanation": "A user-level file applies to one person and never travels with the repository. Conventions the whole team depends on belong at project level, where version control delivers them to everyone."
  },
  {
    "scenario": "cg",
    "stem": "In one package of a monorepo, Claude Code keeps applying a logging convention that the team removed last quarter. The root CLAUDE.md no longer mentions it. You suspect another instruction file is being loaded. What is the most direct way to check?",
    "options": [
      "Run /memory to list the memory files loaded in this session",
      "Run /compact and repeat the request to see whether the behaviour continues",
      "Add a line to the root CLAUDE.md stating that the old convention no longer applies",
      "Search the repository for the word 'logging' and read each match"
    ],
    "explanation": "/memory shows which files are in effect, including a package-level or user-level one, so you diagnose before you change anything. Adding a counter-instruction leaves the stale file in place."
  },
  {
    "scenario": "cg",
    "stem": "A monorepo has shared standards files for API design, database access and UI. Each package needs one or two of them. At present all three are pasted into every package's CLAUDE.md, and the copies have drifted apart. What is the best structure?",
    "options": [
      "Keep one copy of each standards file, and reference the relevant ones from each package's CLAUDE.md with @import",
      "Move all three files into each engineer's ~/.claude/CLAUDE.md, so that each person maintains a single copy",
      "Keep the pasted copies, and add a CI check that fails the build whenever they differ",
      "Merge all three files into the root CLAUDE.md and delete the package-level files"
    ],
    "explanation": "@import lets each package pull in only the standards it needs from a single source. A user-level file is not shared, a CI check keeps the duplication, and merging into the root loads every standard in every package."
  }
];

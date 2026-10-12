/* Drill questions for 3.2 Slash commands and skills. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("3.2-1", "3.2-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "cg",
    "stem": "The team has a skill that maps module dependencies. It prints several hundred lines of analysis, and engineers report that after running it Claude loses track of the task they were working on. Which change to the skill's frontmatter addresses this?",
    "options": [
      "Add context: fork, so the skill runs in an isolated subagent and only its result returns",
      "Add allowed-tools, limiting the skill to Read, Grep and Glob",
      "Add argument-hint, so engineers pass the module name and the skill prints less",
      "Add a paths entry, so the skill loads only when dependency files are open"
    ],
    "explanation": "context: fork keeps a verbose skill's working output out of the main conversation. allowed-tools controls what the skill may do, and argument-hint only prompts for input; neither isolates the output."
  },
  {
    "scenario": "cg",
    "stem": "The team wants a /review command that runs its standard review checklist. Every engineer should have it as soon as they clone the repository, and changes to the checklist should reach everyone through pull requests. Where should the command be defined?",
    "options": [
      "In .claude/commands/ inside the repository",
      "In ~/.claude/commands/ on each engineer's machine",
      "In the project CLAUDE.md, under a section headed with the command name",
      "In the project's .mcp.json, as a named prompt"
    ],
    "explanation": "Commands in the project's .claude/commands/ directory are shared through version control. The home directory is personal, CLAUDE.md holds instructions and not commands, and .mcp.json configures servers."
  },
  {
    "scenario": "cg",
    "stem": "An engineer wants a variant of the team's /review skill that also checks for their own recurring mistakes. Teammates should keep getting the standard version unchanged. What should the engineer do?",
    "options": [
      "Create a personal skill under ~/.claude/skills/ with a different name",
      "Edit the project skill and add a condition that applies the extra checks only for their username",
      "Add the extra checks to the project CLAUDE.md, under a heading that carries their name",
      "Create a skill with the same name in the project's .claude/skills/ on a local branch that is never merged"
    ],
    "explanation": "Personal customizations belong in the user-level directory, under a distinct name so they do not collide with the shared skill. The other options either change what teammates load or depend on never merging a branch."
  }
];

/* Drill questions for 2.5 Built-in tools. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("2.5-1", "2.5-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
    "scenario": "dp",
    "stem": "The agent must change one of four identical 'timeout = 30' lines in a configuration file. The Edit tool fails because the text to replace is not unique, and adding surrounding lines does not help because the four blocks are identical. What is the reliable fallback?",
    "options": [
      "Read the whole file, then Write it back with the intended line changed",
      "Call Edit again with the same text, since such failures are usually transient",
      "Use Grep to find the line number, then pass the line number to Edit",
      "Use Bash to delete the file and ask the agent to regenerate it from memory"
    ],
    "explanation": "Edit relies on matching unique text. When no unique anchor exists, Read followed by Write is the fallback. Edit does not take line numbers, and regenerating from memory risks losing content."
  },
  {
    "scenario": "dp",
    "stem": "An engineer asks which files across a monorepo call the deprecated function parseLegacyDate. The agent begins by running Glob with the pattern **/*.ts and reading the results one file at a time. Which correction is most appropriate?",
    "options": [
      "Use Grep to search file contents for the function name, then Read only the files that match",
      "Use Glob with the pattern **/*parseLegacyDate*, since Glob can match on what a file contains",
      "Continue as it is, but Read the files in parallel so the pass finishes sooner",
      "Use Bash to print every TypeScript file into the conversation in one command"
    ],
    "explanation": "Grep searches inside files; Glob matches file paths. Finding callers is a content search, so Grep narrows the set first and Read is spent only on the matches."
  },
  {
    "scenario": "dp",
    "stem": "An engineer asks how a request to /checkout flows through an unfamiliar service of about 900 files. The agent begins reading every file under src in directory order. What is a better strategy?",
    "options": [
      "Grep for the route to find the entry point, then Read along the imports from there",
      "Glob for every file under src, then Read them in order of size, beginning with the largest files",
      "Read every file once and write a short summary of each into the conversation before answering",
      "Run the service through Bash and infer the flow from whatever appears in its log output"
    ],
    "explanation": "Build understanding incrementally: locate the entry point by searching content, then follow the references. Reading everything up front spends the context on files that have nothing to do with the question."
  }
];

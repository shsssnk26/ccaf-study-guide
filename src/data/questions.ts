/* Generated from the original single-page site; edit freely. */
/* Diagnostic and drill questions. options[0] is the correct answer; options are shuffled on screen. */
import type { QuestionSource } from "../lib/types";

export const QUESTION_BANK: QuestionSource[] = [
  {
    "task": "1.1",
    "scenario": "cs",
    "stem": "Your loop treats any response that contains a text block as the final answer. In production logs, about 6% of conversations end with the agent saying 'Let me look up that order for you' and nothing more; the same response also contained a lookup_order request that was never executed. Which change addresses the root cause?",
    "options": [
      "Branch on stop_reason: execute the requested tools and continue when it is tool_use, and finish only when it is end_turn",
      "Keep the current check, but re-prompt the agent with 'please continue' whenever its text ends without answering the customer",
      "Instruct the agent in the system prompt never to write text in the same response as a tool request",
      "Raise the maximum number of iterations so the agent has enough turns to complete its lookups"
    ],
    "explanation": "One response can carry text and a tool request together, so the presence of text says nothing about completion. stop_reason is the structured signal. Re-prompting and prompt rules work around the bug, and the iteration count was never the limit."
  },
  {
    "task": "1.1",
    "scenario": "cs",
    "stem": "To make latency predictable, a teammate replaced the model-driven loop with code that calls get_customer, then lookup_order, then process_refund for every message. Since the change, password questions wait through three tool calls, and customers asking about two orders get an answer about one. What is the most appropriate correction?",
    "options": [
      "Let the model choose the next tool from the conversation, and enforce only the steps that must be ordered",
      "Keep the fixed sequence and add a classifier that routes simple questions around it",
      "Keep the fixed sequence, and run lookup_order once for every order number that appears in the customer's message",
      "Keep the fixed sequence and shorten the tool descriptions so each call completes faster"
    ],
    "explanation": "A hard-coded sequence over-calls on simple requests and under-calls on complex ones, because it has replaced the model's decision about what to do next. The other options keep patching the sequence one case at a time."
  },
  {
    "task": "1.2",
    "scenario": "ma",
    "stem": "A user requests a report on 'AI in creative industries'. The report is well written and well cited but covers only visual art. Logs show the coordinator created three subtasks (image generators, digital illustration, AI in photography), and each subagent completed its subtask thoroughly. Where should you make the fix?",
    "options": [
      "In the coordinator's decomposition, so that it maps the full breadth of the topic before assigning subtasks",
      "In the web search subagent's prompt, so that its queries range beyond the wording of the subtask it was given",
      "In the synthesis subagent's prompt, so that it identifies missing areas and fills them before writing",
      "In the report subagent's prompt, so that it adds sections on music, writing and film"
    ],
    "explanation": "Every subagent did what it was assigned. When whole areas were never assigned, the fault is in the decomposition. Asking downstream agents to compensate hides the cause and invites unsupported content."
  },
  {
    "task": "1.2",
    "scenario": "ma",
    "stem": "Each handoff currently passes through the coordinator. To cut latency, an engineer proposes that the web search subagent send its results straight to the document analysis subagent, with only failures reported to the coordinator. What is the strongest reason to decline?",
    "options": [
      "The coordinator would lose visibility and consistent error handling for the main path, and subagents do not share context with each other",
      "Subagents under one coordinator already share a single context window, so a direct handoff between them would not actually save a round trip",
      "The Agent SDK cannot pass one subagent's output into another subagent's prompt under any design",
      "Direct handoffs would force the two subagents to run on the same model"
    ],
    "explanation": "Hub and spoke keeps all communication with the coordinator so that it can observe, handle errors and decide what each subagent receives. The other three statements are false: subagents have isolated context, and output can be forwarded through the coordinator."
  },
  {
    "task": "1.3",
    "scenario": "ma",
    "stem": "The coordinator needs web search results on three unrelated subtopics. At present it issues one Task call, waits for the result, then issues the next; a report takes about nine minutes, most of it waiting. What reduces the wall-clock time without changing the output?",
    "options": [
      "Have the coordinator emit all three Task tool calls in a single response",
      "Have the coordinator issue each Task call in its own turn without reading the previous result first",
      "Combine the three subtopics into one Task call so that one subagent covers them in a single context",
      "Raise max_tokens on the coordinator so all three results fit into one response"
    ],
    "explanation": "Several Task calls in one coordinator response run in parallel. Separate turns still run one after another, and merging subtopics changes the output by spreading one subagent's attention across all three."
  },
  {
    "task": "1.3",
    "scenario": "ma",
    "stem": "The coordinator spawns the synthesis subagent with the prompt 'Write the report based on the findings gathered above.' Its own context holds every search result with URLs. The report comes back generic, with no citations. What is the most likely cause?",
    "options": [
      "The subagent received only its prompt, so the findings and their sources were never available to it",
      "The subagent inherited the coordinator's context but gave low priority to material that came before its instructions",
      "The subagent's allowed tools did not include web search, so it could not look the sources up again",
      "The prompt did not include a report template with a dedicated citations section"
    ],
    "explanation": "A subagent starts with its prompt and nothing else. 'The findings above' refers to context it never had, so the findings and source details have to be written into the prompt itself."
  },
  {
    "task": "1.4",
    "scenario": "cs",
    "stem": "Policy requires identity verification through get_customer before any refund. The system prompt states this in capital letters with three examples. An audit still finds that 4% of refunds were issued with no prior verification, mostly when the customer supplied an order number in their first message. Which change eliminates these cases?",
    "options": [
      "A programmatic prerequisite that rejects process_refund until get_customer has returned a verified customer in the session",
      "A few-shot example covering the specific case in which the customer supplies an order number in the opening message of the conversation",
      "A restatement of the verification rule at both the start and the end of the system prompt",
      "A post-conversation audit that flags unverified refunds for the finance team to reverse"
    ],
    "explanation": "Prompt instructions lower a failure rate but never bring it to zero. When an order of operations must always hold, enforce it in code before the tool runs. An audit finds the problem after the money has moved."
  },
  {
    "task": "1.4",
    "scenario": "cs",
    "stem": "When the agent escalates, the case appears in a queue. Human agents see a single ticket and have no access to the conversation transcript. They report spending the first minutes of each case asking customers to repeat themselves. What should escalate_to_human send?",
    "options": [
      "A structured summary: customer and order identifiers, what was verified, the root cause found, and the recommended action",
      "The complete transcript, including every tool call and tool result in the order they happened, so that nothing the customer said is lost",
      "The customer's last three messages quoted exactly, together with a sentiment score",
      "A one-line reason for the escalation and a link to the customer's account page"
    ],
    "explanation": "The human needs enough to act at once. A structured handoff carries the facts and the recommendation; a raw transcript makes them reconstruct the case, and the shorter options leave out what the agent already established."
  },
  {
    "task": "1.5",
    "scenario": "cs",
    "stem": "Three backend tools report order status in different forms: lookup_order returns a number (3), the billing tool a code ('SHP'), and the returns tool a word. The agent told a customer an order was 'in transit' when status 3 meant delivered. You need consistent interpretation whichever tool is called. What is the most reliable approach?",
    "options": [
      "A hook that runs after each tool call and rewrites the status into one canonical form before the model reads the result",
      "A table in the system prompt that maps every numeric and coded status to its meaning",
      "Few-shot examples that show the agent interpreting each of the three formats correctly",
      "An instruction to call a dedicated status-translation tool after every lookup, and to wait for its result before replying to the customer"
    ],
    "explanation": "A hook on tool results applies the conversion in code on every call. A mapping table, examples and an extra tool all rely on the model performing or requesting the conversion each time."
  },
  {
    "task": "1.5",
    "scenario": "dp",
    "stem": "The agent generates and edits Python files across a repository. The team requires every file the agent touches to pass the formatter, without relying on the agent to remember. You are adding a hook that runs the formatter. Where should it be attached?",
    "options": [
      "After the Write and Edit tools complete, operating on the file that now exists on disk",
      "Before the Write and Edit tools run, so that the content is formatted before it is saved",
      "Before the Read tool runs, so that files are formatted when the agent next opens them",
      "At the end of the session, running once across the whole repository"
    ],
    "explanation": "Formatting processes a tool's output, so it belongs after the tool. A hook before the call is the place to validate or block. A whole-repository pass at session end reformats files the agent never touched."
  },
  {
    "task": "1.6",
    "scenario": "ci",
    "stem": "Every pull request must be reviewed for security, then performance, then style, and each review should feed a short summary to the next. The team is deciding how to structure the work. Which approach fits best?",
    "options": [
      "A prompt chain with one fixed step per aspect, each step receiving the summary from the step before",
      "A coordinator that inspects each pull request and decides which aspects are worth reviewing",
      "One prompt that asks for all three aspects together, with a heading for each",
      "An adaptive plan that the agent revises after each finding, adding aspects as it goes"
    ],
    "explanation": "The steps and their order are known in advance, so a fixed chain of focused steps is the right pattern. Dynamic decomposition suits open-ended work, and a single prompt spreads attention across all three aspects."
  },
  {
    "task": "1.6",
    "scenario": "ci",
    "stem": "A single-pass review of an 18-file pull request produced detailed comments on four files and one-line comments on the rest. It flagged a retry helper as a bug in one file and approved identical code in another. How should the review be restructured?",
    "options": [
      "Run a focused pass on each file for local issues, then a separate pass over the cross-file interactions",
      "Run the same single pass three times and keep only the findings that appear in at least two of the three runs",
      "Move the review to a model with a larger context window so all 18 files fit comfortably",
      "Add an instruction to give each file equal attention and to stay consistent between files"
    ],
    "explanation": "The files fit; the problem is attention spread over too much at once. Focused per-file passes plus an integration pass fix depth and consistency. Voting between runs suppresses real findings that appear only once."
  },
  {
    "task": "1.7",
    "scenario": "dp",
    "stem": "On Monday you used a named session to map how a legacy billing module works. On Wednesday you want to continue, but a teammate's refactor has since renamed or rewritten most of the files that session read. What is the most reliable way to proceed?",
    "options": [
      "Start a new session and give it a structured summary of the conclusions that still hold",
      "Resume the session and list the changed files so the agent re-reads them when relevant",
      "Resume the session and run /compact so the outdated file contents are compressed",
      "Resume the session and ask the agent to verify each earlier finding before using it"
    ],
    "explanation": "Resuming is right when the earlier context is still mostly valid. When most of the tool results are stale, they keep misleading the agent, so a fresh session seeded with a summary is more reliable."
  },
  {
    "task": "1.7",
    "scenario": "dp",
    "stem": "After a long analysis session the agent has a full picture of a tangled payments module. You want it to explore two competing refactoring strategies, each starting from that same understanding, without one influencing the other. What should you use?",
    "options": [
      "fork_session, creating two independent branches from the shared analysis",
      "--resume on the same session, exploring the first strategy and then the second",
      "Two new sessions, each repeating the analysis before exploring one strategy",
      "One session with a prompt asking for both strategies side by side in one response"
    ],
    "explanation": "fork_session branches the conversation from a shared baseline, so each exploration keeps the analysis and stays independent. Exploring in sequence lets the first strategy colour the second; new sessions repeat expensive work."
  },
  {
    "task": "2.1",
    "scenario": "cs",
    "stem": "Logs show the agent calling get_customer when the customer has supplied an order number and asked about delivery. The descriptions read 'Retrieves customer information' and 'Retrieves order details'. Both tools accept an identifier string. What is the most effective first step?",
    "options": [
      "Rewrite both descriptions to state the input each expects, example queries, and when to use one over the other",
      "Add a pre-processing step that detects order numbers with a pattern and calls lookup_order directly, bypassing the model's choice",
      "Add ten few-shot examples of correct tool selection to the system prompt",
      "Merge the two tools into one lookup tool that accepts either kind of identifier"
    ],
    "explanation": "Tool descriptions are the main input to tool selection, and these two are nearly identical. Fixing them is the smallest change that addresses the cause; routing code, examples and a merge are heavier and belong later, if at all."
  },
  {
    "task": "2.1",
    "scenario": "ma",
    "stem": "The document analysis subagent has one tool, analyze_document, with the description 'Analyzes a document'. The coordinator uses it to extract data points, to summarize, and to check a claim against a source, and results vary between calls for the same document. What is the best redesign?",
    "options": [
      "Replace it with purpose-specific tools, each with its own defined inputs and outputs",
      "Keep the tool and add a 'mode' parameter whose three values are explained in one description",
      "Keep the tool and require the coordinator to state the intended use in each request",
      "Keep the tool and pass its output through a subagent that reformats it"
    ],
    "explanation": "One tool doing three jobs has no clear contract, so the model has to guess what a call will return. Purpose-specific tools make the choice and the output shape unambiguous."
  },
  {
    "task": "2.2",
    "scenario": "cs",
    "stem": "process_refund returns the string 'Operation failed' for every failure. When a refund exceeds the policy limit, the agent retries three times and then apologizes for a technical problem. When the payment service is briefly down, it behaves in exactly the same way. What should the tool return?",
    "options": [
      "A structured error with a category, a flag saying whether a retry can help, and an explanation",
      "The same message with the upstream HTTP status code appended in brackets",
      "A longer message that tells the agent not to retry unless it is confident that a retry will succeed",
      "An empty success result for policy violations, so that the retry loop does not start"
    ],
    "explanation": "The agent can only choose a sensible recovery if it knows what kind of failure occurred and whether retrying can help. A status code or a longer sentence still leaves it guessing, and a false success hides the failure."
  },
  {
    "task": "2.2",
    "scenario": "ma",
    "stem": "The web search tool returns an empty list when no pages match and also when the search provider times out. The synthesis subagent has started writing sentences such as 'no published research exists on this topic' after timeouts. What should change?",
    "options": [
      "Return an empty list as a normal success for no matches, and a structured, retryable error for a timeout",
      "Return an error in both cases, so the coordinator investigates every empty result",
      "Retry every empty result three times inside the tool before returning an empty list, so that timeouts rarely reach the agent",
      "Log timeouts for the operators and continue to return an empty list to the agent"
    ],
    "explanation": "'Nothing matched' is a valid answer and a timeout is a failure; the agent must be able to tell them apart. Treating both as errors, or both as empty, keeps the confusion in one direction or the other."
  },
  {
    "task": "2.3",
    "scenario": "ma",
    "stem": "For convenience, every subagent was given all 18 tools in the system. The synthesis subagent now sometimes runs its own web searches in the middle of drafting, and it picks the wrong tool more often than before. What is the most effective change?",
    "options": [
      "Limit each subagent to the tools its role needs, which for synthesis is a small set",
      "Rewrite all 18 tool descriptions so the differences between them are clearer",
      "Add a list of tools the synthesis subagent must not use to its system prompt",
      "Move the synthesis subagent to a more capable model with better tool selection"
    ],
    "explanation": "Selection gets less reliable as the tool count rises, and agents use what they are given. Scoping the tool set removes both problems in configuration, where a prompt list depends on compliance."
  },
  {
    "task": "2.3",
    "scenario": "ex",
    "stem": "Every document must first pass through extract_metadata, whose output determines which enrichment tool applies. With the default setting, the model sometimes calls an enrichment tool first, and occasionally replies in prose. How do you guarantee the first step?",
    "options": [
      "Force tool_choice to extract_metadata on the first request, then return to the default for later steps",
      "Set tool_choice to 'any' on every request so that a tool is always called",
      "Place extract_metadata first in the tools array and mark its description as mandatory for every document",
      "State in the system prompt that extract_metadata must always be the first call"
    ],
    "explanation": "A forced tool guarantees which tool runs. 'any' guarantees a tool call but leaves the choice to the model, and ordering or prompt wording only makes the right call more likely."
  },
  {
    "task": "2.4",
    "scenario": "dp",
    "stem": "Six engineers need the same GitHub MCP server in one repository. Each has a personal access token, and security policy forbids committing any credential. A new engineer should get the server on cloning the repository. Where does the configuration belong?",
    "options": [
      "In the project's .mcp.json, referencing the token as ${GITHUB_TOKEN} from each engineer's environment",
      "In each engineer's ~/.claude.json, with the token written into their own copy",
      "In the project's .mcp.json, with one shared team token kept in a git-ignored file",
      "In the project's CLAUDE.md, as setup instructions the agent follows at the start of a session"
    ],
    "explanation": "Servers the team shares belong in the project-level file under version control, and environment variable expansion keeps every secret out of it. The user-level file is for personal servers and is not shared on clone."
  },
  {
    "task": "2.4",
    "scenario": "dp",
    "stem": "Before the agent can plan a task, it spends 10 to 15 tool calls finding out which database schemas, design documents and open issues exist. The MCP server exposes these only through search tools. How should the server change to cut this overhead?",
    "options": [
      "Expose the catalogs as MCP resources, so the agent can see what exists without exploratory calls",
      "Add one more search tool per catalog, each with a narrower and more precise description than the current ones",
      "Paste the full text of all three catalogs into the system prompt of every session",
      "Cache the search tool results on the server so that repeated calls return faster"
    ],
    "explanation": "Resources are how an MCP server exposes content the agent can browse and read; tools are for actions. More tools add selection load, a pasted catalog fills context whether or not it is needed, and caching still spends the calls."
  },
  {
    "task": "2.5",
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
    "task": "2.5",
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
    "task": "3.1",
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
    "task": "3.1",
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
    "task": "3.2",
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
    "task": "3.2",
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
    "task": "3.3",
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
    "task": "3.3",
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
    "task": "3.4",
    "scenario": "cg",
    "stem": "The team has decided to replace its date library with a newer one. The old library is used in 47 files, and nobody knows how many usage patterns exist or which of them touch time zones. An engineer is about to start. What is the best way to proceed?",
    "options": [
      "Use plan mode to map the usage and design the migration, then switch to direct execution",
      "Use direct execution from the start, because the choice of library has already been made",
      "Stay in plan mode for the entire task, including the edits to all 47 files",
      "Hand the migration to the Explore subagent, so the edits stay out of the main context"
    ],
    "explanation": "The decision about which library is settled; how to migrate safely across unknown patterns is not. Plan mode is for that investigation and design. Explore is read-only discovery, and edits happen in direct execution."
  },
  {
    "task": "3.4",
    "scenario": "cg",
    "stem": "An engineer in their first week is asked to fix a crash. The stack trace points to one function that is missing a null check, and a failing test reproduces it. They are unsure whether to use plan mode, since they do not know the codebase. What is the best approach?",
    "options": [
      "Direct execution, because the change is well understood and confined to one function",
      "Plan mode, because the engineer is unfamiliar with the codebase",
      "The Explore subagent to map the surrounding module, followed by plan mode for the fix itself",
      "Plan mode for the fix, then direct execution to update the test"
    ],
    "explanation": "Choose the mode from the change, not from who is making it. A clear, single-function fix with a reproducing test has no architectural decision to plan."
  },
  {
    "task": "3.5",
    "scenario": "cg",
    "stem": "An engineer has described a log-to-event transformation in prose three times, each more detailed than the last. Each attempt produced code with a different mapping for the nested 'meta' fields. The engineer knows exactly what the output should be. What should they provide next?",
    "options": [
      "Two or three real log lines, each paired with the exact event it should produce",
      "A JSON schema describing the structure of the output event",
      "A request for Claude to interview them about the requirements",
      "A fourth description that defines each of the nested fields in more detail"
    ],
    "explanation": "When prose keeps being read differently, concrete input and output pairs communicate the mapping best. A schema checks the shape but not which source field goes where, and the interview pattern is for requirements that are not yet known."
  },
  {
    "task": "3.5",
    "scenario": "cg",
    "stem": "An engineer is asked to add rate limiting to a public API. They have never built it and are not sure what needs deciding: per user or per key, what a blocked client sees, how bursts are treated. What should happen before any code is written?",
    "options": [
      "Ask Claude to interview them about the requirements and the failure behaviour",
      "Provide three example requests with the responses they expect",
      "Write the tests first and iterate until they pass",
      "Ask Claude to implement a standard version, then adjust it once problems show up"
    ],
    "explanation": "The gap is decisions the engineer has not yet identified. The interview pattern surfaces them. Examples and tests both require the answers already, and building first pushes the decisions into rework."
  },
  {
    "task": "3.6",
    "scenario": "ci",
    "stem": "The review job runs Claude Code with -p and --output-format json, and a script posts each finding as an inline comment. The script needs file, line and severity for every finding, but the keys vary between runs: sometimes 'path', sometimes 'file', sometimes a nested location object. What is the right fix?",
    "options": [
      "Add --json-schema with the required structure, alongside --output-format json",
      "Describe the required keys in the project CLAUDE.md so that every run sees them",
      "Extend the script to accept every variation of the keys seen so far",
      "Add an example of the desired JSON to the prompt and ask for an exact match"
    ],
    "explanation": "--output-format json makes the output machine-readable; --json-schema is what enforces its structure. Instructions and examples raise the odds, and a tolerant script will break on the next variation."
  },
  {
    "task": "3.6",
    "scenario": "ci",
    "stem": "Each new commit to a pull request triggers a full review. Developers complain that the job re-posts the same eleven comments on every push, including ones they have already fixed or answered. What is the best change?",
    "options": [
      "Give the job its prior findings and ask for only new or still-unaddressed issues",
      "Review only the diff between the two most recent commits, so that earlier code is never commented on twice",
      "Skip any line that already carries a comment from the review bot",
      "Run the review once, when the pull request is opened, and not again"
    ],
    "explanation": "Carrying prior findings forward removes duplicates while still catching new problems and keeping open ones visible. Reviewing only the latest diff misses how a change interacts with earlier commits, and line-skipping hides regressions."
  },
  {
    "task": "4.1",
    "scenario": "ci",
    "stem": "Developers notice the same pattern, an unchecked array index, labelled 'critical' on one pull request and 'minor' on another. The review prompt says only 'assign a severity to each finding'. Temperature is already 0. What is the most effective fix?",
    "options": [
      "Define each severity level explicitly in the prompt, with a short code example for each",
      "Add a second pass that re-labels the severity of every finding",
      "Ask the model to report a numeric confidence score alongside each severity label it assigns",
      "Ask for conservative labelling and remove the 'critical' level"
    ],
    "explanation": "The labels vary because the criteria were never stated. A second pass applies the same undefined criteria again, and a confidence score does not make an undefined scale consistent."
  },
  {
    "task": "4.1",
    "scenario": "ci",
    "stem": "The 'naming and style' category is wrong about 60% of the time. Developers now dismiss every bot comment without reading it, including security findings that are almost always correct. Rewriting the style criteria will take two weeks. What should you do in the meantime?",
    "options": [
      "Disable the style category until its criteria are fixed, and keep the accurate categories running",
      "Add an instruction telling the model to report only its high-confidence findings in every category",
      "Post only findings whose self-reported confidence is above 0.9",
      "Keep every category running so that no correct style finding is lost"
    ],
    "explanation": "A noisy category destroys trust in the accurate ones, and that trust is what the system needs most. Switch the noisy category off. Self-reported confidence is poorly calibrated, so filtering on it removes the wrong things."
  },
  {
    "task": "4.2",
    "scenario": "cs",
    "stem": "The tool descriptions are detailed and accurate. For clear requests the agent chooses well. For messages such as 'I was charged twice and the replacement never arrived', it sometimes opens a billing dispute, sometimes a return, and rarely handles both. What is the most effective improvement?",
    "options": [
      "A few examples of ambiguous messages, each showing the reasoning that leads to the chosen actions",
      "Longer tool descriptions listing more of the keywords customers tend to use",
      "A classifier in front of the agent that assigns each incoming message to exactly one category before routing",
      "A forced tool_choice for the dispute tool, since billing issues are the most common"
    ],
    "explanation": "The descriptions are already good, so what is missing is judgment in ambiguous cases. Examples with reasoning teach that. A single-label classifier and a forced tool both guarantee that multi-issue messages are handled badly."
  },
  {
    "task": "4.2",
    "scenario": "ex",
    "stem": "The pipeline extracts cited sources from research papers. It works on papers with inline citations, but returns an empty list for papers that use numbered footnotes with a bibliography at the end. The instructions already describe both layouts in detail. What should you try next?",
    "options": [
      "Add few-shot examples showing correct extraction from each layout",
      "Make the sources field nullable so that empty results validate cleanly",
      "Retry with the same prompt whenever the sources list comes back empty",
      "Rewrite the instructions for the footnote layout at greater length"
    ],
    "explanation": "The data is in the document and detailed instructions have not worked, so show the model worked examples of each structure. Making the field nullable accepts the failure, and retrying the same prompt repeats it."
  },
  {
    "task": "4.3",
    "scenario": "ex",
    "stem": "Incoming documents may be invoices, purchase orders or receipts. There is one extraction tool per type, and the type is not known in advance. With the default setting, about 3% of responses are prose descriptions of the document, which breaks the parser downstream. Which setting fits?",
    "options": [
      "tool_choice 'any', which requires a tool call and lets the model choose the matching tool",
      "tool_choice 'auto', with an instruction in the prompt never to reply in prose",
      "A forced tool_choice for the invoice tool, since invoices are the most common type",
      "tool_choice 'auto', with a retry whenever the response contains no tool call"
    ],
    "explanation": "'any' guarantees a tool call while leaving the choice of tool to the model, which is what an unknown document type needs. 'auto' permits prose however the prompt is worded, and forcing one tool mislabels the other two types."
  },
  {
    "task": "4.3",
    "scenario": "ex",
    "stem": "The schema marks warranty_period as a required string. For products whose documents never mention a warranty, the output contains values such as '1 year' or '12 months', which downstream systems then show to customers. What is the most appropriate fix?",
    "options": [
      "Make the field optional and nullable, so the model can return null when the document is silent",
      "Add a prompt instruction that the model must never guess a value",
      "Add a validation step that rejects the output and retries when the warranty cannot be confirmed",
      "Add few-shot examples of documents in which the warranty is clearly stated"
    ],
    "explanation": "A required field obliges the model to produce something, and that is the source of the invention. Allowing null removes the pressure. A retry asks again for a value that does not exist."
  },
  {
    "task": "4.4",
    "scenario": "ex",
    "stem": "A validation-and-retry loop sends each schema error back to the model with the original document. For most fields it converges within two attempts. For supplier_tax_id it fails every time; on inspection, that value appears only on a cover sheet that is never sent to the pipeline. What should you conclude?",
    "options": [
      "Retrying cannot succeed, because the information is absent from the input",
      "The retry limit for this field should be raised from three attempts to five",
      "The validation message for this field should describe the expected format more precisely",
      "Few-shot examples of correctly extracted tax identifiers should be added"
    ],
    "explanation": "Retries with error feedback fix format and structure problems. They cannot supply information that is not in the source, so more attempts, clearer errors or examples all push the model toward inventing one."
  },
  {
    "task": "4.4",
    "scenario": "ex",
    "stem": "Some supplier invoices contain the supplier's own arithmetic errors: the printed total does not equal the sum of the line items. Your current output carries the printed total, and reconciliation fails later with no indication of why. What is the best design?",
    "options": [
      "Extract the stated total and a calculated total as separate fields, and flag any difference",
      "Have the model correct the printed total so that it matches the sum of the extracted line items",
      "Return null for the total whenever the figures disagree",
      "Send the invoice back through the retry loop until the two figures match"
    ],
    "explanation": "The inconsistency is in the source document. Record what it says and what the arithmetic says, and surface the gap. Correcting silently hides a supplier error, and a retry cannot change what the document contains."
  },
  {
    "task": "4.5",
    "scenario": "ex",
    "stem": "Documents arrive throughout the day and must be processed within 30 hours of arrival. To cut cost you are moving to the Message Batches API, where a batch can take up to 24 hours to complete. How often should you submit batches so that the commitment is always met?",
    "options": [
      "Every 4 hours, so the longest wait plus 24 hours of processing stays inside 30 hours",
      "Every 6 hours, so the longest wait plus 24 hours of processing lands on the limit",
      "Every 12 hours, since most batches finish well before the 24-hour maximum",
      "Once every 24 hours, to match the batch completion time"
    ],
    "explanation": "Plan for the worst case: a document that arrives just after a submission waits a full window and then up to 24 hours. Four hours leaves margin; six lands exactly on the limit with none; the others can exceed it."
  },
  {
    "task": "4.5",
    "scenario": "ci",
    "stem": "Two jobs use Claude: a pre-merge review that blocks the merge until it finishes, and a nightly job that generates missing unit tests for the whole repository. Finance asks you to move both to the Message Batches API for the 50% saving. What is the right response?",
    "options": [
      "Move the nightly job to batch and keep the pre-merge review synchronous",
      "Move both, and have developers wait for the batch before merging",
      "Move neither, because batch results come back in a different order from the requests",
      "Move the pre-merge review, since it runs far more often and saves more"
    ],
    "explanation": "Batch suits work that can wait up to 24 hours; developers blocked on a merge cannot. Result order is handled by matching each result to its custom_id, so it is no reason to avoid batch."
  },
  {
    "task": "4.6",
    "scenario": "ci",
    "stem": "One Claude Code session writes a patch and then reviews its own work before the pull request opens. It approves nearly everything, including a patch that later failed in production. Adding 'be highly critical' to the review step made no difference. What should change?",
    "options": [
      "Run the review in a separate instance that does not have the generating session's reasoning",
      "Run /compact between generating and reviewing, so the session starts the review with a lighter context",
      "Have the same session review three times and block on any disagreement between passes",
      "Enable extended thinking for the review step so that it examines the patch more deeply"
    ],
    "explanation": "A session keeps the reasoning that produced the code and tends to confirm it. An independent instance sees only the result. Compacting keeps a summary of that same reasoning, and repeated passes share the same blind spot."
  },
  {
    "task": "4.6",
    "scenario": "ci",
    "stem": "The review job produces about 40 findings per large pull request, of mixed reliability. The two human reviewers have time to look closely at roughly ten. You want their attention on the findings most likely to matter without discarding the rest. What helps most?",
    "options": [
      "A verification pass that re-examines each finding and reports a confidence level with it",
      "Posting all findings in the order they were generated, with the full reasoning for each",
      "Posting only the first ten findings and keeping the rest in a log",
      "Running the same review prompt twice and merging the two sets of findings"
    ],
    "explanation": "A verification pass with a confidence level per finding lets you route attention: confirmed findings first, uncertain ones marked for a look. Truncating by position is arbitrary, and a second identical run adds volume."
  },
  {
    "task": "5.1",
    "scenario": "cs",
    "stem": "In a long conversation the agent promised a refund of $247.83 by 14 March. The history has since been summarized twice to save context. Later the agent tells the customer they will receive 'about $200 in the next couple of weeks'. What is the most reliable fix?",
    "options": [
      "Keep amounts, dates and commitments in a case-facts block that is sent with every request and never summarized",
      "Instruct the summarization step to preserve all important details, including every amount, date and promise that was made",
      "Stop summarizing and send the complete history with every request",
      "Raise the summarization threshold so that summaries happen less often"
    ],
    "explanation": "Summaries turn exact values into approximations. Facts that must stay exact belong in their own block, outside the summarized history. Asking the summarizer to be careful still leaves exactness to chance."
  },
  {
    "task": "5.1",
    "scenario": "ma",
    "stem": "Nine subagent outputs are concatenated and passed to the synthesis subagent as about 30,000 tokens of text. The reports consistently reflect the first two and the last two outputs and omit important findings from the middle. Which change addresses this?",
    "options": [
      "Put a summary of the key findings at the top and organize the detail under explicit section headers",
      "Raise max_tokens for the synthesis subagent so that it has room to write a longer and more complete report",
      "Shuffle the order of the nine outputs on each run so that omissions average out",
      "Add an instruction to give equal attention to every part of the input"
    ],
    "explanation": "Models attend most reliably to the beginning and end of a long input. Leading with the key findings and structuring the rest counters that. Output length is not the limit, and shuffling only moves which findings are lost."
  },
  {
    "task": "5.2",
    "scenario": "cs",
    "stem": "A customer's first message reads: 'I need to change the delivery address on my order, and I want to speak to a person, please.' The agent could change the address with a single tool call. What should it do?",
    "options": [
      "Escalate to a human now, passing along the details of the request",
      "Change the address first, then ask whether the customer still wants a person",
      "Explain that it can make this change immediately and ask whether that would be acceptable",
      "Collect the order details and verify the customer's identity before handing off"
    ],
    "explanation": "An explicit request for a human is honoured immediately, however simple the issue. Resolving first or negotiating overrides what the customer asked for, and investigating before the handoff delays it."
  },
  {
    "task": "5.2",
    "scenario": "cs",
    "stem": "The refund policy covers damaged and incorrect items. A customer asks for compensation because a delivery arrived nine days late, which the policy does not address. The agent has confirmed the delay with lookup_order. What should it do?",
    "options": [
      "Escalate, because the policy does not cover the request",
      "Offer the standard credit for damaged items, as the closest matching case",
      "Decline politely, because the policy does not provide for late deliveries",
      "Ask the customer for evidence of the inconvenience before deciding"
    ],
    "explanation": "Where policy is silent, both granting and refusing invent policy. That decision belongs to a human. The delay is already confirmed, so asking for evidence only postpones the same decision."
  },
  {
    "task": "5.3",
    "scenario": "ma",
    "stem": "The web search subagent calls a slow academic source that times out. At present it either sends the raw timeout to the coordinator at once, or retries silently and then returns the text 'search unavailable'. Which behaviour is best?",
    "options": [
      "Retry locally, and if the problem persists, return the failure type, what was attempted, and any partial results",
      "Return every timeout to the coordinator immediately, so that one place controls all the retry decisions for the system",
      "Retry until the source responds, since the coordinator cannot continue without it",
      "Return an empty result marked as successful, so the pipeline keeps moving"
    ],
    "explanation": "Handle transient failures where they occur, and when they cannot be resolved, pass up enough structure for the coordinator to decide. A bare 'unavailable' or a false success removes the information it needs."
  },
  {
    "task": "5.3",
    "scenario": "ma",
    "stem": "Four sources were assigned for a report on battery recycling. One, a regulatory database, kept failing after retries. The client needs the report today. What should the synthesis output contain?",
    "options": [
      "The report, with coverage notes showing which findings are well supported and that the regulatory source is missing",
      "The report written from the three working sources, with no mention of the fourth, so that the client is not confused on delivery day",
      "An error in place of the report, since incomplete research should not be published",
      "The report, with the regulatory section written from the model's general knowledge"
    ],
    "explanation": "Deliver what is supported and state plainly what is missing, so the reader can judge it. Silent omission and filling from general knowledge both present unverified coverage as complete."
  },
  {
    "task": "5.4",
    "scenario": "dp",
    "stem": "To answer 'how does authentication work in this system', the agent reads about 40 files into its own conversation. By the end it contradicts what it said about the token refresh flow at the start. What is the best change?",
    "options": [
      "Delegate the exploration to subagents that each return a short structured summary to the main agent",
      "Have the agent read each file only once and rely on its recollection of the contents for the rest of the session",
      "Limit the agent to ten files per question, so that the context stays small",
      "Have the agent repeat the important code excerpts in every message it writes"
    ],
    "explanation": "Subagents absorb the verbose reading in their own context and return only the findings, so the main conversation stays focused. A file cap makes the answers incomplete, and repeating excerpts fills context faster."
  },
  {
    "task": "5.4",
    "scenario": "dp",
    "stem": "A coordinator and four subagents spend an hour mapping a legacy system. The process then crashes and all in-memory context is lost. You are redesigning for the next run. What allows a restart without repeating the hour of work?",
    "options": [
      "Each agent writes its state to a known location, and on restart the coordinator loads a manifest of what is done",
      "Each agent's session is given a name, so that all five can be resumed afterwards",
      "The coordinator compacts its context every ten minutes and reloads the latest summary",
      "Tool results are cached on disk, and the whole exploration is run again from the start against that cache"
    ],
    "explanation": "State that must survive a crash has to be exported somewhere outside the process, in a form the coordinator can reload. Compaction lives in the same lost context, and a cached re-run still repeats the reasoning."
  },
  {
    "task": "5.5",
    "scenario": "ex",
    "stem": "Extractions with confidence above a calibrated threshold are approved automatically; the rest go to human review. The threshold was calibrated on last year's documents. This quarter new supplier templates appeared, and a downstream team found wrong values that had been approved with high confidence. Which safeguard catches this kind of error?",
    "options": [
      "Ongoing random sampling of approved extractions, stratified by document type, for human review",
      "A higher threshold for automatic approval across all document types",
      "A monthly re-run of the original calibration set to confirm the threshold still holds",
      "A rule sending any extraction that takes longer than usual to human review"
    ],
    "explanation": "The errors are confident ones, so a confidence threshold cannot see them however high it is set. Sampling the approved output measures the real error rate, and stratifying shows which document types have drifted."
  },
  {
    "task": "5.5",
    "scenario": "ex",
    "stem": "The pipeline reports 97% field-level accuracy on a validation set. Management wants to reduce human review across all document types on that basis. What should you check before agreeing?",
    "options": [
      "Accuracy broken down by document type and by field, since an average can hide a weak segment",
      "That the 97% figure has held steady over the past month",
      "That the model's average confidence across the whole validation set is comfortably above 0.9",
      "That the reviewers themselves agree the output generally looks correct"
    ],
    "explanation": "A strong average can rest on a few common document types while a rarer type or a single field performs badly. Stability and average confidence are aggregates too, so they hide the same thing."
  },
  {
    "task": "5.6",
    "scenario": "ma",
    "stem": "The document analysis subagent finds two credible sources for the same statistic: one reports 4.1%, the other 4.6%. The surveys were run two years apart. What should the subagent return to the coordinator?",
    "options": [
      "Both values, each with its source and collection date, marked as a conflict to be reconciled",
      "The more recent value, with a note that an older figure also exists",
      "The midpoint of the two values, with a note that sources disagree",
      "An error describing the conflict, so that the coordinator re-runs the search for a third source"
    ],
    "explanation": "A conflict is a finding, not a failure. Keeping both values with source and date lets the coordinator see that the difference may simply be change over time. Choosing or averaging discards that information."
  },
  {
    "task": "5.6",
    "scenario": "ma",
    "stem": "Findings pass from the analysis subagent to the synthesis subagent as paragraphs of prose with a source list at the end. In the final report several citations are attached to claims that the cited source does not make. What is the most effective fix?",
    "options": [
      "Pass findings as structured records that keep each claim together with its own source details",
      "Ask the analysis subagent to write shorter paragraphs with fewer claims in each",
      "Send the complete text of every source along with the prose",
      "Ask the report subagent to check each citation and correct any that look wrong before publishing"
    ],
    "explanation": "Attribution survives a handoff only when each claim travels with its source. Prose with a list at the end forces the next agent to guess the pairing, and a later check has nothing reliable to check against."
  },
  {
    "task": "1.1",
    "scenario": "dp",
    "stem": "An engineer wrote a custom loop that executes each requested tool and then, to save tokens, sends a new request containing only the latest tool result. The agent re-reads the same three files again and again and never reaches an answer. What is the fix?",
    "options": [
      "Append each assistant response and its tool results to the history, and send the full history each time",
      "Add a line to the system prompt listing the files already read, and update it after every tool call",
      "Cap the loop at ten iterations and return whatever the agent has produced when the cap is reached",
      "Cache file contents inside the Read tool so that repeated reads return instantly and cost less"
    ],
    "explanation": "The model has no memory between requests; the conversation history is how it knows what it has already done. Dropping it makes every turn start from nothing. A cap or a cache treats the symptom."
  },
  {
    "task": "1.2",
    "scenario": "ma",
    "stem": "Every request, including 'summarize the one PDF I attached', passes through web search, document analysis, synthesis and report writing in that order. Simple requests take six minutes and come back padded with loosely related web sources. What should change?",
    "options": [
      "Have the coordinator analyze each request and invoke only the subagents it needs",
      "Keep the full pipeline, and instruct the web search subagent to return nothing when a search is not needed",
      "Keep the full pipeline, and run the four subagents in parallel so that simple requests finish sooner",
      "Add a second, shorter pipeline and let users choose between the two when they submit a request"
    ],
    "explanation": "A coordinator's job includes deciding which subagents a request calls for. Routing everything through every subagent wastes time and adds noise; running them in parallel breaks the dependencies between the stages."
  },
  {
    "task": "1.3",
    "scenario": "ma",
    "stem": "You define four subagents with AgentDefinition, each with a description and a prompt. In testing the coordinator never delegates: it answers research questions itself from general knowledge. Its allowed tools are Read, Grep and WebFetch. What is the most likely cause?",
    "options": [
      "The coordinator's allowed tools do not include the Task tool, which is what spawns subagents",
      "The subagent descriptions are too short for the coordinator to recognize when each one applies",
      "The coordinator's system prompt does not state firmly enough that research must always be delegated",
      "The subagents were not given the same allowed tools as the coordinator, so it cannot treat them as workers"
    ],
    "explanation": "Subagents are spawned through a tool, and a coordinator without that tool has no way to delegate, whatever its prompt says. The exam guide calls it Task; current SDK documentation names it Agent."
  },
  {
    "task": "1.4",
    "scenario": "cs",
    "stem": "A customer writes: 'My order arrived damaged, I was billed twice for it, and I need to change the email on my account.' The agent resolves the damage claim thoroughly and closes the conversation. Logs show the same pattern for most messages with several issues. What is the best change?",
    "options": [
      "Have the agent split the message into separate concerns, work each one with shared customer context, and send one combined reply",
      "Ask customers to raise one issue per conversation, and have the agent explain that rule whenever several issues arrive together",
      "Escalate every message that contains more than one issue, since such cases are too complex to automate",
      "Raise the iteration limit so that the agent has enough turns to notice the remaining issues"
    ],
    "explanation": "Multi-concern requests need explicit decomposition, then a single synthesized answer. Pushing the work back to the customer or to a human gives up resolutions the agent could make, and the iteration limit was never the constraint."
  },
  {
    "task": "1.5",
    "scenario": "cs",
    "stem": "Refunds above $500 need human approval, so you add a hook that denies process_refund above that amount. It works, but when it fires the agent tells the customer 'I am unable to process this' and the conversation ends there. What is the best refinement?",
    "options": [
      "Have the denial state the reason and direct the agent to escalate_to_human, so the blocked call becomes a handoff",
      "Remove the hook and put the $500 limit in the system prompt, so the agent can explain it in its own words",
      "Move the hook to run after the refund, and have it reverse any refund that turns out to be above the limit",
      "Have the hook reduce the amount to $500 and let the call proceed, so the customer receives something at once"
    ],
    "explanation": "A blocking hook should redirect to the compliant path as well as stop the violating one. Moving the rule back into the prompt gives up the guarantee, and acting after the refund means the money has already moved."
  },
  {
    "task": "1.6",
    "scenario": "dp",
    "stem": "An engineer asks the agent to 'add comprehensive tests' to a legacy codebase of 600 files with almost no coverage. Nobody knows which modules are critical or how they depend on each other. How should the agent approach the task?",
    "options": [
      "Map the structure first, identify the high-impact areas, then follow a prioritized plan that adapts as dependencies appear",
      "Define a fixed sequence of steps up front, one for each top-level directory, and work through them in order",
      "Write tests for every file in a single pass, so that coverage is spread evenly across the codebase",
      "Begin with the most recently changed files and continue until the context window is full"
    ],
    "explanation": "For open-ended work where the shape of the task is unknown, the plan has to come from what is discovered and change as more is learned. A fixed sequence suits tasks whose steps are known in advance."
  },
  {
    "task": "1.7",
    "scenario": "dp",
    "stem": "You want to continue a named session that analyzed 60 files yesterday. Since then a small bug fix modified two of those files; the other 58 are unchanged. What is the most efficient reliable approach?",
    "options": [
      "Resume the session and tell the agent which two files changed, so that it re-reads those",
      "Start a new session and have the agent read all 60 files again, so that nothing can be out of date",
      "Resume the session and carry on, since the agent detects modified files on its own",
      "Fork the session and work in the fork, since forking refreshes the tool results it inherits"
    ],
    "explanation": "When most of the earlier context is still valid, resume and point the agent at what changed. A fresh session is for cases where most of it is stale. Nothing refreshes old tool results automatically."
  },
  {
    "task": "2.1",
    "scenario": "cs",
    "stem": "A line was added to the system prompt: 'Always check the customer record first.' Since then the agent calls get_customer even for general questions such as 'what is your return window?', where no customer is involved, adding a wasted call and sometimes a request for identification. Where should you look first?",
    "options": [
      "At the system prompt wording, which has created an unintended tool association, and narrow it to account-specific requests",
      "At the get_customer description, shortening it so that the tool appears less relevant to general questions",
      "At the tool list, removing get_customer whenever a conversation opens with a general question",
      "At the few-shot examples, adding one in which a policy question is answered without any tool call"
    ],
    "explanation": "Tool selection is shaped by the system prompt as well as by descriptions, and a broad keyword-heavy instruction can override good descriptions. Fix the instruction that caused the behaviour before adding machinery around it."
  },
  {
    "task": "2.2",
    "scenario": "cs",
    "stem": "lookup_order fails for orders from a newly acquired brand, because the agent's service account has no access to that system. The tool returns only 'Error'. The agent retries twice and then tells the customer that the order does not exist. What should the tool return in this case?",
    "options": [
      "An error marked as a permission failure and not retryable, so the agent can explain and escalate",
      "An empty order list, since from the agent's side the order genuinely cannot be found",
      "The same generic message, but only after the tool has retried internally with exponential backoff",
      "A success response containing a note that asks the agent to avoid saying the order does not exist"
    ],
    "explanation": "A permission failure is not transient and is not an empty result. Telling the agent the category and that retrying will not help lets it stop, say something true, and hand off."
  },
  {
    "task": "2.3",
    "scenario": "ma",
    "stem": "The document analysis subagent has a general fetch_url tool for loading the documents it is assigned. Logs show it following links out of those documents and browsing unrelated sites, which is the web search subagent's role. What is the most effective change?",
    "options": [
      "Replace fetch_url with a constrained load_document tool that accepts only document URLs",
      "Keep fetch_url and add a rule to the subagent's prompt that it may load only its assigned documents",
      "Keep fetch_url and have the coordinator approve each URL before the call is allowed to run",
      "Remove the tool and have the coordinator paste the full text of every document into the subagent's prompt"
    ],
    "explanation": "Replacing a general tool with a constrained one removes the misuse by design. A prompt rule depends on compliance, per-call approval adds a round trip to every load, and pasting full documents fills the coordinator's context."
  },
  {
    "task": "2.4",
    "scenario": "dp",
    "stem": "The team wants the agent to read and update Jira tickets. An engineer proposes spending a sprint on a custom MCP server. A maintained community Jira server already covers every operation on the team's list. What is the best decision?",
    "options": [
      "Use the community server, and reserve custom servers for workflows specific to the team",
      "Build the custom server, because community servers cannot be declared in a project's .mcp.json file",
      "Skip MCP and have the agent call the Jira REST API through Bash with curl commands",
      "Build the custom server first, and fall back to the community one only if the sprint overruns"
    ],
    "explanation": "For standard integrations an existing server is the default; custom servers earn their cost when the workflow is unique to the team. Community servers are configured the same way as any other."
  },
  {
    "task": "2.5",
    "scenario": "dp",
    "stem": "An engineer asks how a request to /checkout flows through an unfamiliar service of about 900 files. The agent begins reading every file under src in directory order. What is a better strategy?",
    "options": [
      "Grep for the route to find the entry point, then Read along the imports from there",
      "Glob for every file under src, then Read them in order of size, beginning with the largest files",
      "Read every file once and write a short summary of each into the conversation before answering",
      "Run the service through Bash and infer the flow from whatever appears in its log output"
    ],
    "explanation": "Build understanding incrementally: locate the entry point by searching content, then follow the references. Reading everything up front spends the context on files that have nothing to do with the question."
  },
  {
    "task": "3.1",
    "scenario": "cg",
    "stem": "A monorepo has shared standards files for API design, database access and UI. Each package needs one or two of them. At present all three are pasted into every package's CLAUDE.md, and the copies have drifted apart. What is the best structure?",
    "options": [
      "Keep one copy of each standards file, and reference the relevant ones from each package's CLAUDE.md with @import",
      "Move all three files into each engineer's ~/.claude/CLAUDE.md, so that each person maintains a single copy",
      "Keep the pasted copies, and add a CI check that fails the build whenever they differ",
      "Merge all three files into the root CLAUDE.md and delete the package-level files"
    ],
    "explanation": "@import lets each package pull in only the standards it needs from a single source. A user-level file is not shared, a CI check keeps the duplication, and merging into the root loads every standard in every package."
  },
  {
    "task": "3.2",
    "scenario": "cg",
    "stem": "An engineer wants a variant of the team's /review skill that also checks for their own recurring mistakes. Teammates should keep getting the standard version unchanged. What should the engineer do?",
    "options": [
      "Create a personal skill under ~/.claude/skills/ with a different name",
      "Edit the project skill and add a condition that applies the extra checks only for their username",
      "Add the extra checks to the project CLAUDE.md, under a heading that carries their name",
      "Create a skill with the same name in the project's .claude/skills/ on a local branch that is never merged"
    ],
    "explanation": "Personal customizations belong in the user-level directory, under a distinct name so they do not collide with the shared skill. The other options either change what teammates load or depend on never merging a branch."
  },
  {
    "task": "3.3",
    "scenario": "cg",
    "stem": "The root CLAUDE.md has grown to 1,200 lines covering nine areas, from migrations to React components. Most sessions touch one area, yet all nine are loaded every time, and engineers report that instructions near the middle are often missed. What is the best restructuring?",
    "options": [
      "Split it into .claude/rules/ files with paths globs, so each one loads only when matching files are edited",
      "Split it into nine files and @import all nine of them from the root CLAUDE.md",
      "Keep it as one file and add a table of contents so that the model finds the relevant part",
      "Turn the nine areas into nine skills that engineers invoke whenever they need them"
    ],
    "explanation": "Path-scoped rules load only when relevant, which cuts irrelevant context. Importing all nine files loads exactly the same content as before, and skills depend on each engineer remembering to invoke them."
  },
  {
    "task": "3.4",
    "scenario": "cg",
    "stem": "A multi-phase task begins with finding every place a feature flag is read, across several hundred files. The engineer worries that the discovery output will crowd out the context needed for the later design phases. What is the best approach?",
    "options": [
      "Run the discovery in the Explore subagent and bring back only a summary",
      "Run the discovery in the main session, then use /compact before the design phases begin",
      "Skip the discovery and begin the design, looking up flag usages only as they come up",
      "Run the discovery in direct execution, since plan mode is unable to read files"
    ],
    "explanation": "The Explore subagent isolates verbose discovery in its own context and returns a summary, which keeps the main conversation clear for later phases. Compacting afterwards loses detail from the whole session, not only the noise."
  },
  {
    "task": "3.5",
    "scenario": "cg",
    "stem": "Claude wrote a date-parsing function. The engineer has replied 'it still does not work, please fix it' three times, and each attempt has broken a different input format. What should the engineer do instead?",
    "options": [
      "Write tests for the expected cases, run them, and share the specific failures each round",
      "Repeat the request with stronger wording, and ask Claude to take more care on this attempt",
      "Start a new session and describe the function again from the beginning",
      "Ask Claude to explain its code line by line before it makes the next attempt"
    ],
    "explanation": "Test-driven iteration gives Claude a precise target and precise feedback. 'It does not work' carries no information about which case failed, so each fix is a guess."
  },
  {
    "task": "3.6",
    "scenario": "ci",
    "stem": "A new pipeline step runs: claude \"Review this pull request for security issues\". The job hangs until the runner's timeout, and the log shows Claude Code waiting for input. What is the correct fix?",
    "options": [
      "Add the -p flag, so that Claude Code runs non-interactively and exits when done",
      "Pipe the word 'yes' into the command, so that any prompt it shows is answered automatically",
      "Wrap the command in a five-minute timeout, so the job fails quickly and can be retried",
      "Set CI=true in the job's environment, which Claude Code reads as a request to run without a terminal"
    ],
    "explanation": "-p (print mode) is the documented way to run Claude Code non-interactively: it processes the prompt, writes the result and exits. The other options do not change the mode it starts in."
  },
  {
    "task": "4.1",
    "scenario": "ci",
    "stem": "The review prompt says 'check that comments are accurate'. The job flags dozens of comments per pull request for being vague, old-fashioned or incomplete. Developers want to hear only about comments that are actually wrong. What is the most effective change?",
    "options": [
      "State the criterion: flag a comment only when what it claims contradicts what the code does",
      "Add the instruction: be conservative, and flag only the comments you are sure about",
      "Limit the job to five comment findings per pull request, selected by the model",
      "Ask for a confidence score on each comment finding, and hide those below 0.8"
    ],
    "explanation": "Explicit criteria about what to report and what to skip improve precision. 'Be conservative' and confidence filters leave the model's idea of 'accurate' as undefined as before, and a cap keeps an arbitrary five."
  },
  {
    "task": "4.2",
    "scenario": "ci",
    "stem": "Findings arrive in different shapes: some include a suggested fix, some have no line number, some are a paragraph of prose. The prompt already describes the required format in detail, and the posting script cannot rely on any field being present. What should you add?",
    "options": [
      "Three or four example findings in the exact format: location, issue, severity, suggested fix",
      "A second description of the format at the end of the prompt, written in capital letters",
      "Post-processing with regular expressions that pull out whichever fields happen to be present",
      "A lower temperature setting, so that the formatting varies less from one run to the next"
    ],
    "explanation": "When detailed instructions still give inconsistent formatting, examples are the most effective tool: the model copies a pattern more reliably than it follows a description of one."
  },
  {
    "task": "4.3",
    "scenario": "ex",
    "stem": "After moving to tool use with a JSON schema, malformed-JSON failures dropped to zero. A week later an audit finds invoices whose line items do not add up to the total, and a few with the invoice date in the due_date field. A colleague says the schema should have prevented this. What is the accurate response?",
    "options": [
      "A schema guarantees structure, not meaning; sums and field placement need their own validation",
      "The schema is being skipped on some requests; setting tool_choice to 'any' will enforce it",
      "A strict schema does prevent these errors once every field is marked as required",
      "These are sampling errors, and a lower temperature will remove them"
    ],
    "explanation": "Tool use with a schema eliminates syntax errors. It cannot know that numbers should add up or that a valid date is in the wrong field. Semantic checks have to be added on top."
  },
  {
    "task": "4.4",
    "scenario": "ci",
    "stem": "Developers dismiss about a third of the findings. You want to learn which code constructs trigger the false positives, but each finding records only a file, a line and a message, so the dismissals cannot be grouped. What should you change?",
    "options": [
      "Add a detected_pattern field to each finding, then analyze which patterns are dismissed most",
      "Ask developers to type a reason each time they dismiss a finding, and read the reasons monthly",
      "Lower the number of findings per pull request until the dismissal rate falls to an acceptable level",
      "Send dismissed findings back through the same prompt to see whether they are reported again"
    ],
    "explanation": "Recording which construct triggered each finding turns dismissals into data you can group and act on. The other options add work for developers or hide findings without explaining anything."
  },
  {
    "task": "4.5",
    "scenario": "ex",
    "stem": "A batch of 10,000 documents completes. 312 requests failed, most because the document exceeded the context limit. What is the right way to handle the failures?",
    "options": [
      "Identify them by custom_id and resubmit only those, splitting the oversized documents",
      "Resubmit the whole batch, since partial results cannot be trusted once any request has failed",
      "Resubmit the 312 unchanged, since batch failures are usually transient and pass on a second attempt",
      "Match the 312 to their inputs by position in the results file, then process them one at a time"
    ],
    "explanation": "custom_id ties each result to its request, so only the failures need to go again, and they need a change that addresses why they failed. Results are not guaranteed to be in request order."
  },
  {
    "task": "4.6",
    "scenario": "ci",
    "stem": "You add an independent instance to review generated patches. To help it, a teammate proposes passing along the generating session's full reasoning trace, so that the reviewer understands every decision that was made. What is the best response?",
    "options": [
      "Give the reviewer the diff and the requirements, and leave the generator's reasoning out",
      "Pass the full trace, since a reviewer with more context will find more issues",
      "Pass the trace, with an instruction to disregard any part the reviewer disagrees with",
      "Pass a summary of the trace written by the generating session itself"
    ],
    "explanation": "The value of an independent reviewer is that it has not absorbed the reasoning that produced the code. Handing that reasoning over, in full or in summary, recreates the bias of self-review."
  },
  {
    "task": "5.1",
    "scenario": "cs",
    "stem": "Each lookup_order result contains more than 40 fields; for return requests the agent uses about five. After several lookups the context is dominated by tool output, and the agent begins to miss things the customer said early in the conversation. What is the best change?",
    "options": [
      "Trim each tool result to the relevant fields before it is added to the conversation",
      "Summarize the customer's own messages more aggressively to make room for the tool output",
      "Instruct the agent to ignore the fields it does not need when it reads each result",
      "Limit the agent to two order lookups in any one conversation"
    ],
    "explanation": "Tool output accumulates in context whether or not it is useful. Cutting it down before it enters the conversation keeps room for what matters. Ignored fields still consume tokens and attention."
  },
  {
    "task": "5.2",
    "scenario": "cs",
    "stem": "A customer gives only the name 'J. Patel'. get_customer returns three matching accounts. At present the agent picks the account with the most recent order and carries on. What should it do?",
    "options": [
      "Ask the customer for another identifier, such as an email address or postcode",
      "Keep picking the most recent account, but tell the customer which one it chose",
      "Escalate to a human, since the agent cannot resolve an ambiguous identity",
      "Run lookup_order on all three accounts and choose the one whose orders fit the complaint"
    ],
    "explanation": "With several matches, ask for more identifying information. Choosing by a heuristic risks acting on the wrong person's account, and escalation is unnecessary when one question resolves it."
  },
  {
    "task": "5.3",
    "scenario": "ma",
    "stem": "When any subagent raises an exception, such as one unreachable source, the whole research run terminates and the user receives nothing, even if three other subagents had already finished. What is the best redesign?",
    "options": [
      "Catch the failure in the subagent, return a structured error, and let the coordinator decide how to proceed",
      "Let the exception end the run, so that no incomplete report can ever be produced",
      "Catch the failure and return an empty success, so the remaining subagents are not affected",
      "Restart the entire run from the first subtask whenever any single subagent fails"
    ],
    "explanation": "One failure should not discard completed work. A structured error gives the coordinator what it needs to retry, route around the gap or deliver a partial result with the gap stated. An empty success hides the failure."
  },
  {
    "task": "5.4",
    "scenario": "dp",
    "stem": "Two hours into exploring a codebase, the agent starts answering with phrases like 'following typical patterns, this service probably…' where earlier it gave the specific class names it had found. What is the most effective mitigation?",
    "options": [
      "Have it record key findings in a scratchpad file and consult that file for later questions",
      "Remind it in each message to be specific and to avoid generalizing",
      "Ask it to re-read every file from the start whenever an answer sounds generic",
      "Move to a model with a larger context window and continue in the same session"
    ],
    "explanation": "Generic answers late in a long session are a sign of context degradation. Findings kept in a file survive outside the context and can be re-read cheaply. Re-reading everything makes the context problem worse."
  },
  {
    "task": "5.5",
    "scenario": "ex",
    "stem": "The model outputs a confidence score for each extracted field, and you plan to send low-confidence fields to human review. Nobody has yet checked how those scores relate to actual correctness. What should you do first?",
    "options": [
      "Calibrate the review thresholds against a labeled validation set",
      "Route fields that score below 0.5, since under one half means the model thinks it is probably wrong",
      "Ask the model to explain each score, and trust the scores that come with clear explanations",
      "Use one threshold per document, based on the average of its field scores"
    ],
    "explanation": "Self-reported confidence means nothing until it has been compared with ground truth. Calibration on labeled data tells you which score corresponds to which error rate, field by field."
  },
  {
    "task": "5.6",
    "scenario": "ma",
    "stem": "The final report presents every finding in the same confident tone. Readers cannot tell which conclusions rest on several agreeing sources and which rest on one disputed study. What is the best change?",
    "options": [
      "Separate well-established findings from contested ones in the report, with sources attached to each",
      "Remove findings supported by only one source, so that everything left is reliable",
      "Add a general disclaimer at the top saying that some findings may be uncertain",
      "Ask the report subagent to use more cautious wording throughout"
    ],
    "explanation": "Readers need to see which claims are settled and which are disputed, and why. Deleting single-source findings loses information, and blanket caution blurs the distinction it is meant to show."
  }
];

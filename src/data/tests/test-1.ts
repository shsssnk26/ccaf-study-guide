/* Practice test 1. These questions appear nowhere else on the site. Saved answers are keyed by position ("t1-1" ...), so never reorder. */
import type { PracticeTestSource } from "../../lib/types";

export const test: PracticeTestSource = {
  "id": "t1",
  "name": "Practice test 1",
  "scenarios": [
    "cs",
    "cg",
    "ma",
    "ex"
  ],
  "questions": [
    {
      "task": "1.1",
      "scenario": "cs",
      "stem": "A response arrives with stop_reason 'tool_use' and two tool_use blocks, one for get_customer and one for lookup_order. Your loop executes only the first, appends its result and calls the API again. The API rejects the request. What is the correct handling?",
      "options": [
        "Execute both tools and return a tool_result for each tool_use block in the next user message",
        "Send the two results in two separate user messages, one after the other, in the order the tools finished",
        "Set tool_choice to a single named tool so that the model can only ever request one call at a time",
        "Remove the second tool_use block from the assistant message before appending it to the history"
      ],
      "explanation": "Every tool_use block in an assistant turn needs a matching tool_result in the following user message. Editing the assistant message or forcing one tool hides the model's actual request."
    },
    {
      "task": "1.1",
      "scenario": "cs",
      "stem": "To decide that a turn is finished, your loop checks the agent's text for the phrase 'Is there anything else'. When the agent closes differently, the loop sends 'please continue' and the customer receives a duplicate answer. What should the loop use instead?",
      "options": [
        "The stop_reason value 'end_turn' as the signal that the turn is complete",
        "A longer list of closing phrases, extended as new ones appear in the logs",
        "A fixed marker such as [DONE] that the agent is told to print at the end of every reply",
        "A rule that the turn is over once a reply is longer than fifty words"
      ],
      "explanation": "Completion is reported structurally by stop_reason. Any check on the wording of the reply, including a marker the model must remember to print, fails when the wording varies."
    },
    {
      "task": "1.4",
      "scenario": "cs",
      "stem": "A prerequisite gate lets process_refund run once the agent passes verified=true as an argument. An audit finds refunds where the agent set the flag without ever calling get_customer. How should the gate be changed?",
      "options": [
        "Check session state that your code records when get_customer returns a verified ID",
        "Add a second argument in which the agent states the method it used to verify the customer",
        "Add a system prompt rule that the flag may be set only after a successful verification",
        "Require the agent to call get_customer twice and compare the results before it sets the flag"
      ],
      "explanation": "A gate that trusts the model's own claim is still prompt-level compliance. The check has to read facts your code recorded from the tool result."
    },
    {
      "task": "1.4",
      "scenario": "cs",
      "stem": "You are reviewing four behaviours the team wants from the agent. Which one most needs programmatic enforcement instead of prompt guidance?",
      "options": [
        "Never issuing a refund before the customer's identity has been verified",
        "Using a warm and apologetic tone when an order arrives damaged",
        "Offering a replacement before a refund when either would settle the issue",
        "Summarizing the resolution for the customer at the end of each conversation"
      ],
      "explanation": "Use code for rules where a single failure is unacceptable, such as financial actions before verification. Tone, preferences and summaries tolerate occasional variation and suit prompts."
    },
    {
      "task": "1.5",
      "scenario": "cs",
      "stem": "Backend tools return dates as Unix timestamps, as ISO 8601 strings and as MM/DD/YYYY text. The agent regularly miscalculates whether an order is inside the 30-day return window. What is the most reliable fix?",
      "options": [
        "Normalize every date to one format in a PostToolUse hook",
        "Give the agent a date-conversion tool and tell it to use the tool whenever it is unsure",
        "List the three formats in the system prompt, with one worked example of each",
        "Ask the backend teams to agree on a single format, and add a prompt warning until they do"
      ],
      "explanation": "A PostToolUse hook transforms tool results in code before the model reads them, on every call. The alternatives leave the conversion to the model or to a future change."
    },
    {
      "task": "1.5",
      "scenario": "cs",
      "stem": "The agent has a close_account tool. Legal requires that an account with an open dispute is never closed. Dispute status lives in the billing system. Which design satisfies the requirement?",
      "options": [
        "A hook on close_account that checks the dispute status and denies the call when a dispute is open",
        "A system prompt rule, with the dispute status included in every get_customer result",
        "A few-shot example in which the agent declines to close an account that has a dispute, added to the system prompt",
        "A weekly report that lists every account closed while a dispute was open"
      ],
      "explanation": "A requirement that must never be broken is enforced by intercepting the tool call. Prompt rules and examples leave a failure rate, and a report finds the breach afterwards."
    },
    {
      "task": "1.5",
      "scenario": "cs",
      "stem": "Compliance asks for two things: block refunds to a card other than the original payment card, and cut card numbers in tool results down to the last four digits before the model sees them. Which hooks fit?",
      "options": [
        "A PreToolUse hook for the block and a PostToolUse hook for the masking",
        "A PostToolUse hook for the block and a PreToolUse hook for the masking",
        "PreToolUse hooks for both, since both must happen before the model acts",
        "PostToolUse hooks for both, since both depend on data that tools return"
      ],
      "explanation": "Blocking an action happens before the tool runs. Changing what a tool returned happens after it runs and before the model reads it."
    },
    {
      "task": "2.1",
      "scenario": "cs",
      "stem": "Two tools, check_order and order_status, were added by different teams. One returns payment state and the other delivery state, but their descriptions are almost the same. The agent picks between them nearly at random. What should you do?",
      "options": [
        "Rename them for what they return, and write descriptions that state the difference",
        "Set tool_choice to 'any' so that the agent always calls one of the two",
        "Add a system prompt rule: when unsure, call both tools and compare the answers",
        "Remove one of them, and have the agent ask the customer which information they want"
      ],
      "explanation": "Overlapping names and descriptions cause misrouting. Clear names and differentiated descriptions fix selection at its source."
    },
    {
      "task": "2.1",
      "scenario": "cs",
      "stem": "The agent passes values such as '#48213' to lookup_order, which accepts digits only and fails. The description reads 'Looks up an order'. What is the best first change?",
      "options": [
        "State the expected input format in the description, with an example value",
        "Return a more detailed error from the tool, and rely on the agent to retry correctly",
        "Add a system prompt rule telling the agent to strip symbols from every identifier",
        "Rename the parameter from id to order_identifier_string"
      ],
      "explanation": "A description should say what input the tool expects. The agent then gets it right on the first call instead of learning from a failure each time."
    },
    {
      "task": "2.2",
      "scenario": "cs",
      "stem": "A refund is refused because the order is outside the 30-day window. The tool returns only isError: true with the text 'DENIED'. The agent tells the customer there is a system problem and to try again later. What should the tool return?",
      "options": [
        "A business-rule error, marked not retryable, with an explanation the agent can pass on",
        "A transient error, so that the agent tries again after a short delay",
        "A success with an amount of zero, so that the conversation can continue without an error",
        "The raw exception text, so that the agent sees everything the backend knows about the refusal"
      ],
      "explanation": "The agent needs the category and whether a retry can help. A policy refusal is not transient, and a customer-ready explanation lets the agent say something true."
    },
    {
      "task": "5.1",
      "scenario": "cs",
      "stem": "A customer raises three separate issues in one long conversation. By the third, the agent is mixing up the order numbers from the first two. What is the best fix?",
      "options": [
        "Maintain a structured record for each issue (order, status, amounts) outside the running history",
        "Ask the customer to restate the order number each time the subject changes during the conversation",
        "Summarize the first two issues into one paragraph before starting on the third, to free up context",
        "Start a new conversation for each issue and discard the earlier context"
      ],
      "explanation": "Exact identifiers get blurred in long histories and summaries. A structured facts layer, kept per issue and included in each request, preserves them."
    },
    {
      "task": "5.1",
      "scenario": "cs",
      "stem": "After 40 turns the request is close to the context limit. A teammate proposes dropping the oldest 20 turns. What is the better approach?",
      "options": [
        "Summarize the old turns, and carry exact facts forward in a separate case-facts block",
        "Drop the oldest turns, since in support the most recent messages matter most",
        "Keep everything, and move to a model with a larger context window when needed",
        "Keep the customer's messages and drop the agent's replies and all tool results"
      ],
      "explanation": "Old turns can be compressed, but amounts, dates and commitments must survive exactly. Dropping turns or tool results loses facts the agent will be asked about."
    },
    {
      "task": "5.2",
      "scenario": "cs",
      "stem": "The agent escalates whenever a sentiment score falls below a threshold. Calm customers with complex policy exceptions are handled badly by the agent, while angry customers with simple issues are escalated needlessly. What should replace this rule?",
      "options": [
        "Explicit criteria: a request for a human, a gap in policy, or no meaningful progress",
        "A lower sentiment threshold, so that fewer conversations are escalated",
        "Sentiment combined with the model's self-rated confidence on a scale of 1 to 10 each turn",
        "Escalation when sentiment is low or when the conversation passes ten turns without a fix"
      ],
      "explanation": "Sentiment does not measure how complex a case is, and self-rated confidence is poorly calibrated. Escalation should follow explicit conditions."
    },
    {
      "task": "5.2",
      "scenario": "cs",
      "stem": "A customer writes angrily that a refund is late. The agent can see that the refund was approved and can re-issue it now. The customer has not asked for a human. What should the agent do?",
      "options": [
        "Acknowledge the frustration and resolve it, escalating if the customer then asks for a person",
        "Escalate at once, because an angry customer should always reach a human before anything is changed",
        "Resolve it without mentioning the tone, to keep the reply short",
        "Ask whether the customer would prefer a human before doing anything else"
      ],
      "explanation": "Frustration alone is not an escalation trigger when the agent can fix the problem. An explicit request for a human would be."
    },
    {
      "task": "4.2",
      "scenario": "cs",
      "stem": "The agent escalates simple address changes but tries to settle chargebacks on its own. The system prompt describes the escalation policy in two long paragraphs. What is the most effective change?",
      "options": [
        "Add explicit criteria with a few examples of when to escalate and when to resolve",
        "Have the agent rate its confidence and escalate whenever it is below a threshold",
        "Train a separate classifier on past tickets to predict which ones need escalation",
        "Rewrite the two paragraphs with more emphatic wording"
      ],
      "explanation": "Explicit criteria with a few examples address unclear decision boundaries directly. Confidence scores are unreliable, and a classifier is heavy machinery before the prompt has been fixed."
    },
    {
      "task": "3.1",
      "scenario": "cg",
      "stem": "An engineer wants one personal preference, that Claude explains its changes in Spanish, to apply in all their projects without affecting any teammate. Where does it go?",
      "options": [
        "In ~/.claude/CLAUDE.md on their own machine",
        "In the project CLAUDE.md, in a section under their name",
        "In a .claude/rules/ file in each repository they work on",
        "In a CLAUDE.md inside each project's src directory"
      ],
      "explanation": "User-level memory applies to one person across all projects and is not shared. Anything inside a repository reaches the whole team."
    },
    {
      "task": "3.1",
      "scenario": "cg",
      "stem": "The payments directory is self-contained and has stricter rules than the rest of the repository, for example never logging card data. The rules matter only when working in that directory. What is a suitable place for them?",
      "options": [
        "A CLAUDE.md inside the payments directory",
        "The lead engineer's user-level CLAUDE.md",
        "A project slash command that prints the rules",
        "A section in the repository README"
      ],
      "explanation": "A directory-level CLAUDE.md applies when Claude works in that directory and travels with the repository. A user-level file is not shared, and a command or README is not loaded automatically."
    },
    {
      "task": "3.2",
      "scenario": "cg",
      "stem": "A /cleanup skill is meant to read the repository and report unused files. During one run it deleted files through Bash. How do you prevent that?",
      "options": [
        "Set allowed-tools in the skill's frontmatter to the read-only tools it needs",
        "Add context: fork, so that its commands run in a separate context",
        "Add a sentence to the skill body saying it must never delete files",
        "Add argument-hint, so that engineers confirm the target directory first"
      ],
      "explanation": "allowed-tools restricts which tools a skill may use while it runs. context: fork isolates output, not permissions, and a sentence in the body is a request."
    },
    {
      "task": "3.2",
      "scenario": "cg",
      "stem": "The /migrate skill needs a table name. Engineers often invoke it with no argument, and it guesses a table. Which frontmatter option addresses this?",
      "options": [
        "argument-hint, so the expected argument is shown when the skill is invoked",
        "allowed-tools, so the skill cannot run without a table name being supplied first",
        "context: fork, so each run starts without assumptions",
        "paths, so the skill loads only inside the migrations folder"
      ],
      "explanation": "argument-hint tells the person invoking the skill which argument it expects. The other options control tools, isolation and loading."
    },
    {
      "task": "3.3",
      "scenario": "cg",
      "stem": "Terraform conventions should load when editing anything under infra/ and also for any .tf file elsewhere in the repository. What is the best configuration?",
      "options": [
        "One rules file whose paths list includes infra/**/* and **/*.tf",
        "A CLAUDE.md in infra/, plus a copy in every other folder that has a .tf file",
        "A section in the root CLAUDE.md headed 'Terraform'",
        "A user-level rules file on the infrastructure engineers' machines"
      ],
      "explanation": "A rules file can carry several glob patterns, so one file covers both the directory and the file type. Copies drift, the root file always loads, and user-level files are not shared."
    },
    {
      "task": "3.3",
      "scenario": "cg",
      "stem": "A file in .claude/rules/ holds conventions for SQL migrations. It has no frontmatter, and it loads in every session, whatever is being edited. What is the fix?",
      "options": [
        "Add YAML frontmatter with a paths glob that matches the migration files",
        "Move the file from .claude/rules/ into .claude/commands/",
        "Rename the file to migrations.local.md",
        "Add 'only for migrations' as the first line of the file"
      ],
      "explanation": "A rule without a paths entry is unconditional. The paths glob in its frontmatter is what limits when it loads."
    },
    {
      "task": "3.4",
      "scenario": "cg",
      "stem": "The team wants to break a monolith into services. There are several defensible ways to draw the boundaries, and the choice affects dozens of files. How should an engineer start?",
      "options": [
        "In plan mode, because the task has several valid designs with wide consequences",
        "In direct execution, reviewing the diff after each service has been extracted",
        "In direct execution, with a detailed prompt that describes the target layout",
        "With the Explore subagent, since it can investigate and then apply the changes"
      ],
      "explanation": "Plan mode suits large changes with architectural choices: explore and agree the approach before anything is edited. Explore is for discovery and does not make the changes."
    },
    {
      "task": "3.4",
      "scenario": "cg",
      "stem": "An engineer uses plan mode for every change out of habit, and complains that adding one validation check to a function they know well takes too long. What should they do?",
      "options": [
        "Use direct execution for small, well-scoped changes like this one",
        "Stay in plan mode, and approve the plans without reading them",
        "Stay in plan mode, and ask Claude to write shorter plans",
        "Run the Explore subagent to confirm the function before each change"
      ],
      "explanation": "Planning overhead pays off on complex or uncertain work. A small change with a clear scope should simply be made."
    },
    {
      "task": "3.5",
      "scenario": "cg",
      "stem": "A review of generated code found four problems. Two interact: changing a function's return type affects how its caller handles errors. The other two are unrelated. How should the engineer feed them back?",
      "options": [
        "Give the two interacting problems together, and fix the independent ones one at a time",
        "Send all four as separate messages, in order of severity",
        "Send all four in one message, so the session handles them in a single pass with full context",
        "Fix the easiest one first, then the others in whatever order is convenient for the engineer"
      ],
      "explanation": "Fixes that interact should be considered together, or one will undo the other. Independent problems are handled more reliably in sequence."
    },
    {
      "task": "3.5",
      "scenario": "cg",
      "stem": "A generated function fails on null inputs and on empty lists. The engineer replies 'handle the edge cases properly', and the next version fails on a different edge case. What works better?",
      "options": [
        "Test cases giving each specific input and the output expected for it",
        "A request for robust handling of all possible edge cases",
        "A request that Claude list the edge cases it can think of, then implement that list",
        "A switch to plan mode and a request for an edge-case strategy"
      ],
      "explanation": "Concrete input and output pairs remove the ambiguity that a general request leaves. They also give Claude something to run against."
    },
    {
      "task": "3.6",
      "scenario": "cg",
      "stem": "A pre-commit script calls Claude Code to produce a list of changed public functions, which another tool reads as JSON. How should the script invoke it?",
      "options": [
        "With -p, --output-format json and a --json-schema describing the list",
        "Interactively, with the script copying the answer out of the terminal",
        "With -p alone, parsing the JSON out of the prose with a regular expression",
        "With --output-format json alone, since that flag implies non-interactive mode"
      ],
      "explanation": "Scripts need non-interactive mode (-p), machine-readable output, and a schema to fix the structure. Parsing prose is fragile."
    },
    {
      "task": "3.6",
      "scenario": "cg",
      "stem": "A scripted job generates unit tests. The tests ignore the team's shared fixtures and often duplicate tests that already exist. What is the most effective change?",
      "options": [
        "Document the testing standards and fixtures in CLAUDE.md, and give the job the existing test files",
        "Raise the number of tests generated, so that useful ones appear among them and reviewers pick the best",
        "Delete the duplicate tests in a clean-up step after each run",
        "Run the job in plan mode, so that it proposes tests without writing them"
      ],
      "explanation": "A non-interactive job gets its project context from CLAUDE.md and from the files it is given. Without them it cannot know the fixtures or what is already covered."
    },
    {
      "task": "1.7",
      "scenario": "cg",
      "stem": "Yesterday's investigation ran in a session named auth-audit. Today the engineer wants to continue it, and the code has not changed. What is the right command?",
      "options": [
        "claude --resume auth-audit",
        "A new session, with yesterday's final answer pasted in as the prompt",
        "A new session, with a request that Claude recall the auth-audit work",
        "A new session, followed by fork_session to import yesterday's context"
      ],
      "explanation": "--resume with the session name continues that conversation with its context. A new session has no memory of the old one."
    },
    {
      "task": "1.7",
      "scenario": "cg",
      "stem": "A long session's context is mostly stale after a refactor, so the engineer starts a new one with a summary. What should the summary contain?",
      "options": [
        "The conclusions that still hold, the files involved, and what remains open",
        "The full transcript of the earlier session, pasted as the first message",
        "The final message of the earlier session and nothing else",
        "A list of every tool call the earlier session made, in order"
      ],
      "explanation": "A structured summary carries forward what is still true and what is left to do. The transcript brings the stale tool results back with it."
    },
    {
      "task": "2.5",
      "scenario": "cg",
      "stem": "An engineer asks which packages in the monorepo have their own jest.config.js. Which tool answers this most directly?",
      "options": [
        "Glob, with the pattern **/jest.config.js",
        "Grep, searching for the string 'jest' across the repository",
        "Read, opening each package.json to infer it from the scripts",
        "Bash, running a recursive listing and scanning the output"
      ],
      "explanation": "Finding files by name or path pattern is what Glob is for. Grep searches inside files and would match every mention of jest."
    },
    {
      "task": "1.2",
      "scenario": "ma",
      "stem": "Reports often leave one subtopic thin because the first search returned little. The coordinator currently runs each subagent exactly once. What should change?",
      "options": [
        "Have the coordinator evaluate the synthesis for gaps and re-delegate targeted searches",
        "Have the search subagent always return twice as many results as it does now for each query",
        "Have the report subagent fill thin sections with general background material on the subject",
        "Run the entire pipeline twice and merge the two reports"
      ],
      "explanation": "A coordinator should assess what came back and refine: find the gaps, then send focused follow-up work. More volume or padding does not target the gap."
    },
    {
      "task": "1.2",
      "scenario": "ma",
      "stem": "Two search subagents return results that are 70% the same sources. Their subtasks were 'renewable energy policy' and 'government policy on renewables'. Where is the problem?",
      "options": [
        "In the coordinator's partitioning, which should give each subtask a distinct scope",
        "In the subagents, which should message each other to divide the sources",
        "In the synthesis subagent, which should deduplicate and accept the wasted searches",
        "In the prompts, which should be identical so that results are at least consistent"
      ],
      "explanation": "Dividing the scope is the coordinator's job. Overlapping assignments duplicate work, and subagents do not talk to each other."
    },
    {
      "task": "1.2",
      "scenario": "ma",
      "stem": "To simplify the system, a teammate gives the coordinator every search and analysis tool and removes the subagents. On broad topics the reports get shallower and early findings are forgotten. What is the best correction?",
      "options": [
        "Restore the subagents, each working in its own context, with the coordinator delegating and aggregating",
        "Keep the single agent, and raise max_tokens so that it can hold more findings",
        "Keep the single agent, and tell it to summarize its findings after every tool call so that nothing is lost",
        "Keep the single agent, and limit reports to topics with fewer than five subtopics"
      ],
      "explanation": "Subagents keep verbose work in isolated contexts, so the coordinator's context holds only results. One agent doing everything fills its own context."
    },
    {
      "task": "1.3",
      "scenario": "ma",
      "stem": "The coordinator passes search results to the synthesis subagent as one block of concatenated page text. Synthesis cannot tell where one source ends and the next begins, and citations are unreliable. What should be passed instead?",
      "options": [
        "Each finding as a structured item with its content, URL, title and date",
        "The URLs alone, leaving the synthesis subagent to fetch the pages again",
        "One paragraph summarizing all the sources together",
        "The same block, with a line of dashes inserted between pages"
      ],
      "explanation": "Structured items that separate content from source metadata keep attribution intact across the handoff."
    },
    {
      "task": "1.3",
      "scenario": "ma",
      "stem": "The coordinator's prompts to the search subagent list the exact queries to run, in order. Results are poor whenever the field's vocabulary differs from what the coordinator guessed. What is the better way to delegate?",
      "options": [
        "State the research goal and the quality criteria, and let the subagent choose its queries",
        "Have the coordinator list twice as many exact queries for each subtask",
        "Have the subagent run the listed queries and report which ones returned nothing so they can be replaced",
        "Fix the queries in the subagent's system prompt, so that runs are comparable across topics"
      ],
      "explanation": "Delegation prompts work best when they give goals and criteria. Step-by-step procedure stops the subagent from adapting to what it finds."
    },
    {
      "task": "2.3",
      "scenario": "ma",
      "stem": "A teammate set tool_choice to 'any' on the coordinator so that it always delegates. Now a follow-up such as 'which year was that figure from?' triggers a full research cycle. Which setting fits the coordinator?",
      "options": [
        "'auto', so that it can answer directly or delegate as the request requires",
        "'any', with a prompt rule not to delegate simple follow-ups",
        "A forced Task call, with a cheaper subagent used for follow-ups to limit the cost",
        "'none', so that it never calls tools after the first report"
      ],
      "explanation": "'any' and a forced tool both guarantee a tool call, which is wrong when a direct answer is sometimes right. 'auto' leaves that decision to the model."
    },
    {
      "task": "2.2",
      "scenario": "ma",
      "stem": "The document analysis tool fails on a scanned PDF that has no text layer. It returns isError: true with 'Could not process'. The coordinator retries it four times. What should the tool return?",
      "options": [
        "The category (unsupported input), that a retry will not help, and a suggested alternative",
        "An empty analysis, so that the pipeline continues without interruption",
        "The same message, after retrying internally up to five times",
        "The parser's stack trace, so that the coordinator can diagnose the fault and choose a response"
      ],
      "explanation": "A structured error tells the caller what kind of failure this is and what to do next. Retrying an input that cannot be processed wastes calls."
    },
    {
      "task": "2.1",
      "scenario": "ma",
      "stem": "The coordinator sends statistical questions to the web_researcher subagent when data_analyst would be right. Their descriptions read 'Research agent' and 'Analysis agent'. What is the most effective fix?",
      "options": [
        "Write each description to say what the subagent handles and when to choose it",
        "Rename the subagents agent_1 and agent_2 to remove any misleading hints",
        "Put routing rules into every user request before it reaches the coordinator",
        "Merge the two subagents so that no selection is needed"
      ],
      "explanation": "The coordinator chooses a subagent from its description, as it would a tool. Vague descriptions give it nothing to choose on."
    },
    {
      "task": "5.3",
      "scenario": "ma",
      "stem": "The patent database subagent returns: failure type rate_limited, three retries attempted, 12 of roughly 40 results retrieved. What should the coordinator do?",
      "options": [
        "Proceed with the partial results, mark the coverage gap, and decide whether to retry later",
        "Discard the partial results, since an incomplete set would bias the report toward those twelve",
        "Treat the 12 results as the complete set, since the retries are exhausted and no more will arrive",
        "Abort the report and ask the user to submit the topic again later"
      ],
      "explanation": "This is what a structured failure report is for: the coordinator can use what arrived, be explicit about the gap, and choose a recovery."
    },
    {
      "task": "5.3",
      "scenario": "ma",
      "stem": "A wrapper around one subagent catches every exception and returns results: []. Reports then state confidently that no evidence exists on the subtopic. What should change?",
      "options": [
        "Stop suppressing the failure, and return it with its type so it is not read as 'no evidence'",
        "Keep the wrapper, and add a prompt line saying that empty results may be errors in some cases",
        "Keep the wrapper, and tell the synthesis subagent to avoid absolute statements about evidence",
        "Keep the wrapper, and log the exceptions for a weekly review"
      ],
      "explanation": "Silently turning a failure into an empty success is an anti-pattern: downstream agents cannot tell 'nothing found' from 'could not look'."
    },
    {
      "task": "5.6",
      "scenario": "ma",
      "stem": "Two subagents report the market size as $4.2bn and $6.8bn. One source counts hardware only; the other includes services. What should the report do?",
      "options": [
        "Give both figures with their scope and source, and explain the difference",
        "Use the larger figure, since it is the more inclusive of the two",
        "Average the two figures and cite both sources for the result",
        "Leave the statistic out, since the sources cannot be reconciled"
      ],
      "explanation": "Conflicting values are reported with attribution and context. Choosing, averaging or dropping them loses information the reader needs."
    },
    {
      "task": "1.6",
      "scenario": "ma",
      "stem": "A user asks an open question: what is driving change in an industry? The pipeline runs the same five research steps for every topic and regularly misses threads that only appear midway through. What fits this kind of request?",
      "options": [
        "Let the coordinator plan subtasks from the topic and add new ones as findings suggest them",
        "Add more fixed steps until the pipeline covers the common cases",
        "Keep the fixed steps and give each one a larger token budget",
        "Ask users to break the topic into subtopics before they submit it, so the plan is known up front"
      ],
      "explanation": "Open-ended investigation needs dynamic decomposition that adapts to what is found. Fixed chains suit predictable, repeatable work."
    },
    {
      "task": "2.4",
      "scenario": "ma",
      "stem": "One developer on the team wants to try an experimental MCP server for a citation database, for their own use only. Where should it be configured?",
      "options": [
        "At user level, in ~/.claude.json",
        "In the project's .mcp.json on the main branch",
        "In the project's .mcp.json, with a note asking teammates to ignore it",
        "In the coordinator's system prompt, as pasted tool definitions"
      ],
      "explanation": "Personal or experimental servers belong in user-level configuration. The project file is for servers the whole team should have."
    },
    {
      "task": "4.6",
      "scenario": "ma",
      "stem": "The synthesis subagent reviews its own draft for unsupported claims and finds none. A human reader finds several. What is the most effective change?",
      "options": [
        "Have a separate instance check the draft's claims against the source records",
        "Ask the synthesis subagent to review its draft a second time, more slowly",
        "Ask the synthesis subagent to rate its confidence in each paragraph",
        "Lengthen the synthesis prompt with a list of common mistakes"
      ],
      "explanation": "The instance that wrote the draft carries the reasoning behind it and tends to confirm it. An independent instance checks the output against the evidence."
    },
    {
      "task": "5.4",
      "scenario": "ma",
      "stem": "The coordinator's context fills with raw subagent output. Later delegation prompts start to omit decisions that were made early in the run. What is the best change?",
      "options": [
        "Have subagents return concise structured summaries, with the full output saved to files",
        "Have subagents return everything, and compact the coordinator whenever it fills up with output",
        "Have the coordinator re-run early subagents when it forgets their findings later in the run",
        "Limit every research topic to three subagent calls"
      ],
      "explanation": "Summaries keep the coordinator's context for decisions, and files keep the detail available. Compacting after the fact loses detail unpredictably."
    },
    {
      "task": "4.1",
      "scenario": "ex",
      "stem": "The prompt says 'extract all relevant dates'. The output includes print dates, fax timestamps and dates from page footers. What is the most effective change?",
      "options": [
        "Name the dates wanted, such as invoice date and due date, and say which to ignore",
        "Add 'be precise and avoid irrelevant dates' to the prompt",
        "Filter the output with a rule that drops any date more than a year old or in a footer",
        "Ask for a relevance score with every date and keep those above 0.7 in the final output"
      ],
      "explanation": "'Relevant' is undefined, so the model guesses. Explicit criteria for what to extract and what to skip remove the guess."
    },
    {
      "task": "4.1",
      "scenario": "ex",
      "stem": "Documents are labelled 'contract' or 'amendment' inconsistently: the same kind of document gets different labels on different days. The prompt lists the two labels with no further detail. What should you add?",
      "options": [
        "A definition of each category, with its distinguishing features and an example",
        "A majority vote over three classification runs for each document, to smooth out the variation",
        "A third label, 'other', for the documents whose label varies",
        "An instruction to think carefully before choosing a label"
      ],
      "explanation": "Consistency comes from explicit definitions. Voting averages over the same undefined boundary, and an extra label hides the problem."
    },
    {
      "task": "4.2",
      "scenario": "ex",
      "stem": "Product sheets give dimensions as '12 x 8 x 3 in', as 'approx. a foot long', or in a table. Extraction of dimensions is inconsistent although the schema is clear. What helps most?",
      "options": [
        "Examples covering each way the dimensions appear, with the expected output",
        "A regular expression that captures numbers followed by units",
        "String-typed dimension fields, so that any value validates",
        "An instruction to convert every measurement to centimetres first"
      ],
      "explanation": "Few-shot examples show the model how to handle varied formats that a schema alone cannot describe."
    },
    {
      "task": "4.3",
      "scenario": "ex",
      "stem": "The category field is an enum with eight values. Documents that fit none of them are forced into the nearest one, which corrupts the downstream reports. What is the best schema change?",
      "options": [
        "Add an 'other' value with a companion free-text detail field",
        "Remove the enum and accept any string as the category",
        "Add twenty more enum values to cover the cases seen so far",
        "Keep the enum, and retry when the chosen category has low confidence"
      ],
      "explanation": "An 'other' value plus a detail field keeps the enum's structure while giving non-fitting documents an honest place to go."
    },
    {
      "task": "4.3",
      "scenario": "ex",
      "stem": "A contract says payment is 'net 30 or as otherwise agreed'. The payment_terms enum forces a single definite value, and the model picks one. How should the schema handle cases like this?",
      "options": [
        "Allow an 'unclear' value, so that ambiguity is recorded instead of resolved by a guess",
        "Instruct the model to choose the value that is most common in such contracts as a default",
        "Make the field required, so that a decision is always made",
        "Default the field to 'net 30' whenever more than one term appears in the same clause of a contract"
      ],
      "explanation": "When the source is ambiguous, the schema should let the model say so. A forced choice produces confident data that the document does not support."
    },
    {
      "task": "4.4",
      "scenario": "ex",
      "stem": "When output fails validation, the pipeline re-sends the identical request. The second attempt usually fails in the same way. What should the retry contain?",
      "options": [
        "The document, the failed output and the specific validation error",
        "The identical request again, with the limit raised from two attempts to five",
        "The same request at a higher temperature, for variety",
        "The same request with the schema repeated twice in the prompt"
      ],
      "explanation": "Retry with error feedback: the model can correct a mistake it is shown. An identical request tends to produce the identical result."
    },
    {
      "task": "4.4",
      "scenario": "ex",
      "stem": "Some contracts state two different effective dates in different sections. The schema has a single effective_date field. What is the best design?",
      "options": [
        "Extract both dates with their locations, and set a conflict flag for review",
        "Take whichever date appears first in the document",
        "Take the date that appears in the signature block",
        "Leave the field null and move on to the next document whenever two dates are found"
      ],
      "explanation": "A conflict inside the source should be surfaced, with enough detail for a reviewer to resolve it. Silent rules for picking one hide the problem."
    },
    {
      "task": "4.5",
      "scenario": "ex",
      "stem": "One extraction step needs the model to call lookup_vendor and use the result within the same extraction. The team wants to move this step to the Message Batches API. What is the correct assessment?",
      "options": [
        "Keep it synchronous, or fetch the vendor data first and include it in each batch request",
        "Move it unchanged, since tools are executed between batch polling cycles by the batch service",
        "Move it, and send the tool results in a follow-up batch matched by position in the output",
        "Move it, and raise max_tokens so that the lookup fits in one response"
      ],
      "explanation": "A batch request is a single request with no tool round trip in the middle. Work that needs one must stay synchronous or have the data supplied up front."
    },
    {
      "task": "4.5",
      "scenario": "ex",
      "stem": "You are about to submit 50,000 documents to the batch API with a newly written prompt. What should you do first?",
      "options": [
        "Test the prompt on a small sample, then submit the full batch",
        "Submit everything, and fix failures by resubmitting them afterwards",
        "Split the work into 50 batches and submit them all at once",
        "Submit with a higher max_tokens to absorb any prompt problems"
      ],
      "explanation": "A prompt flaw repeated across 50,000 requests is costly and slow to discover. A sample run finds it first."
    },
    {
      "task": "4.6",
      "scenario": "ex",
      "stem": "A 300-page contract is extracted in one pass. Clauses from the first sections are accurate, and those from the last sections are often missed. What is the best restructuring?",
      "options": [
        "Extract section by section, then run a pass that reconciles across sections",
        "Run the whole document a second time and merge the two outputs",
        "Tell the model to pay equal attention to the final pages",
        "Extract only from the first 100 pages, where accuracy is highest"
      ],
      "explanation": "Splitting a large input into focused passes, followed by an integration pass, counters the loss of attention over long documents."
    },
    {
      "task": "5.5",
      "scenario": "ex",
      "stem": "Reviewers can check about 5% of the pipeline's output. At present they review a random 5% of whole documents. How should their time be used?",
      "options": [
        "On low-confidence and ambiguous fields, plus a random sample of everything else",
        "On a random 5% as now, because random review is unbiased",
        "On the longest documents, because they contain the most fields and so the most errors",
        "On documents in arrival order, until the daily budget is spent"
      ],
      "explanation": "Send limited review capacity where errors are most likely, and keep a random sample to catch confident errors the scores miss."
    },
    {
      "task": "2.3",
      "scenario": "ex",
      "stem": "A batch of documents is known to be invoices. The agent has four extraction tools and sometimes chooses the receipt tool for them. What guarantees the right tool for this batch?",
      "options": [
        "A forced tool_choice naming the invoice extraction tool",
        "tool_choice 'any', with the document type stated in the prompt",
        "tool_choice 'auto', with the invoice tool listed first",
        "Blank descriptions on the other three tools"
      ],
      "explanation": "When the tool is known in advance, forcing it guarantees the call. 'any' and 'auto' leave the choice to the model."
    },
    {
      "task": "2.4",
      "scenario": "ex",
      "stem": "The agent has an MCP tool, registry_search, that finds vendors by fuzzy name match. It keeps using Grep on an out-of-date CSV export instead. The MCP tool's description is the single word 'Search'. What should you do first?",
      "options": [
        "Expand the description to say what the tool searches and when it is better than Grep",
        "Delete the CSV export, so that Grep finds nothing",
        "Remove Grep from the agent's tools for every task",
        "Add a prompt rule banning Grep for vendor names, and list the cases in which it is still allowed"
      ],
      "explanation": "The agent prefers tools it understands. A description that explains the MCP tool's capability and when to use it corrects the choice at its cause."
    },
    {
      "task": "2.5",
      "scenario": "ex",
      "stem": "The agent must change one known value in a 40-line schema file. The text to replace appears exactly once. Which tool is appropriate?",
      "options": [
        "Edit, replacing the unique text",
        "Read then Write, sending the whole file back",
        "Bash, with a sed command built from a line number",
        "Write, creating a new file and deleting the old one"
      ],
      "explanation": "Edit is the targeted tool when the text to change is unique. Read plus Write is the fallback for when it is not."
    },
    {
      "task": "1.6",
      "scenario": "ex",
      "stem": "One prompt classifies a document, extracts 40 fields and validates the totals. When the output is wrong, nobody can tell which part failed. What is the better structure?",
      "options": [
        "A chain of three focused steps: classify, extract with that type's schema, validate",
        "The same prompt, with a heading for each of the three jobs",
        "The same prompt run twice, with the two outputs compared",
        "A design in which the model decides for each document how many steps it needs to take"
      ],
      "explanation": "The steps are known and always the same, so a fixed chain fits. Each step can be checked and improved separately."
    }
  ]
};

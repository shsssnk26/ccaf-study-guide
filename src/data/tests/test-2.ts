/* Practice test 2. These questions appear nowhere else on the site. Saved answers are keyed by position ("t2-1" ...), so never reorder. */
import type { PracticeTestSource } from "../../lib/types";

export const test: PracticeTestSource = {
  "id": "t2",
  "name": "Practice test 2",
  "scenarios": [
    "dp",
    "ci",
    "ex",
    "cs"
  ],
  "questions": [
    {
      "task": "1.1",
      "scenario": "dp",
      "stem": "The loop ends when stop_reason is 'end_turn'. To be safe, a teammate adds a second exit after five iterations. Complex codebase explorations now stop half-finished. What is the right design?",
      "options": [
        "Keep end_turn as the stop signal, and keep any cap as a high safety limit only",
        "Raise the cap to six and see whether the complaints stop before changing anything else",
        "Replace both checks with a test for the word 'done' in the output of every single turn",
        "Exit when the agent calls the same tool twice in a row"
      ],
      "explanation": "The model signals completion through stop_reason. An iteration cap is a guard against runaway loops, set high, and never the normal way to finish."
    },
    {
      "task": "1.2",
      "scenario": "dp",
      "stem": "A coordinator hands 'explain this system' unchanged to three exploration subagents. Their outputs overlap heavily, and all three skip the build system. What should change?",
      "options": [
        "The coordinator should assign distinct areas and check the combined coverage",
        "Each subagent should read the others' output before it finishes its own summary",
        "A fourth subagent with the same prompt should be added for extra coverage of gaps",
        "The coordinator should keep the longest of the three outputs"
      ],
      "explanation": "Decomposing the task and checking coverage is the coordinator's work. Identical prompts give overlapping results and shared blind spots."
    },
    {
      "task": "1.3",
      "scenario": "dp",
      "stem": "The agent has to summarize four independent services. It spawns one subagent, waits for it, then spawns the next. How can the four run at the same time?",
      "options": [
        "Issue the four Task calls in a single response",
        "Issue them in four consecutive turns without reading the results",
        "Use one subagent and list the four services in its prompt",
        "Lower each subagent's max_tokens so that the sequence finishes sooner"
      ],
      "explanation": "Subagents run in parallel when their Task calls are emitted together in one response."
    },
    {
      "task": "1.3",
      "scenario": "dp",
      "stem": "The main agent has learned that the project uses a custom ORM. It delegates 'write a query helper' to a subagent, which produces raw SQL. What went wrong?",
      "options": [
        "The subagent's prompt did not include the relevant findings, such as the custom ORM",
        "The subagent inherited the findings but gave them low priority compared with its instructions",
        "The subagent had too few tools to discover the ORM quickly",
        "The subagent needed a second attempt with a reminder to follow conventions in the project"
      ],
      "explanation": "Subagents do not inherit the parent's conversation. Whatever they need to know has to be written into their prompt."
    },
    {
      "task": "1.6",
      "scenario": "dp",
      "stem": "The agent is hunting a bug with a fixed plan to read ten files in order. Evidence in the third file points to a different module that is not on the list. What should it do?",
      "options": [
        "Follow the evidence to the new module, letting each finding decide the next step",
        "Finish the ten files in order before considering anything else, so the plan stays complete",
        "Restart with a new fixed list that includes the new module",
        "Read the first three files again to confirm the evidence"
      ],
      "explanation": "Investigation is adaptive work: the plan should change as findings come in. A fixed list suits tasks whose steps are known beforehand."
    },
    {
      "task": "1.6",
      "scenario": "dp",
      "stem": "Creating a new service always involves the same four steps: scaffold the project, add configuration, register the route, write a smoke test. Which structure fits?",
      "options": [
        "A fixed sequence of prompts, one per step",
        "A coordinator that decides for each service which steps to run",
        "A single prompt that asks for the complete service",
        "An open-ended agent that explores before deciding the steps"
      ],
      "explanation": "Predictable, repeatable steps call for a fixed prompt chain. Dynamic decomposition adds variability where none is wanted."
    },
    {
      "task": "1.7",
      "scenario": "dp",
      "stem": "An engineer runs three long investigations side by side and keeps picking up the wrong one when returning to work. What should they do?",
      "options": [
        "Name each session and resume it by name with --resume",
        "Call fork_session each time before continuing",
        "Keep one session and mark topic changes with a heading",
        "Start a new session each time and explain the investigation again"
      ],
      "explanation": "Named sessions let you return to a specific conversation. Forking creates new branches; it does not help you find an existing one."
    },
    {
      "task": "1.7",
      "scenario": "dp",
      "stem": "An engineer forks a session to try a risky refactoring idea and wonders what happens to the original conversation. Which statement is accurate?",
      "options": [
        "The fork is an independent branch, and the original conversation is unchanged",
        "The original now contains the fork's messages and must be compacted",
        "The original is closed, and only the fork can be resumed",
        "Both share one history, so the most recent message wins"
      ],
      "explanation": "fork_session branches the conversation, leaving the original as it was. It isolates conversation history only; files on disk are shared unless you separate them, for example with a git worktree."
    },
    {
      "task": "2.3",
      "scenario": "dp",
      "stem": "The team wants an exploration agent that can never modify the repository. The current agent has Bash and has used it to run sed and rm. What is the most reliable configuration?",
      "options": [
        "Give the agent only Read, Grep and Glob",
        "Keep Bash and list the forbidden commands in the prompt",
        "Keep Bash and have the agent ask for confirmation in its output first",
        "Keep every tool and review the transcript after each session"
      ],
      "explanation": "Restricting the tool set makes the unwanted action impossible. A prompt list or a review depends on compliance or on catching it afterwards."
    },
    {
      "task": "2.4",
      "scenario": "dp",
      "stem": "The agent needs GitHub and Jira in the same session. An engineer believes only one MCP server can be active at a time and plans to merge them. What is correct?",
      "options": [
        "Configure both; tools from all connected servers are available together",
        "Switch servers between tasks by editing .mcp.json",
        "Combine both into one custom server before using either",
        "Run two agents, one per server, and merge their output in a final summarizing step"
      ],
      "explanation": "Several MCP servers can be connected at once, and the agent sees the tools from all of them."
    },
    {
      "task": "2.4",
      "scenario": "dp",
      "stem": "A custom MCP tool signals failure by returning the text 'failed' as ordinary content. The agent sometimes treats that text as data and carries on. What should the tool do?",
      "options": [
        "Return failures with the isError flag set and structured details",
        "Prefix the failure text with 'ERROR:' in capitals",
        "Return an empty string whenever it fails",
        "Throw an exception that stops the MCP server"
      ],
      "explanation": "isError is how an MCP tool tells the agent that a call failed. Text conventions are easy to misread, and an empty string looks like an empty result."
    },
    {
      "task": "2.5",
      "scenario": "dp",
      "stem": "To change one line, the agent rewrites a 2,000-line file with Write, and in doing so drops a function. What is the better practice?",
      "options": [
        "Use Edit for targeted changes, and keep Write for new files or full rewrites",
        "Use Write, and ask the agent to check the file afterwards",
        "Use Bash to append the changed line to the end of the file, leaving the rest untouched",
        "Use Read before every Write and compare the two lengths"
      ],
      "explanation": "Edit changes only the matched text, so the rest of the file cannot be lost. Rewriting a large file to change a line invites omissions."
    },
    {
      "task": "2.5",
      "scenario": "dp",
      "stem": "After fixing a bug, the agent needs to confirm that the fix works. Which tool is appropriate?",
      "options": [
        "Bash, to run the test command and read its output",
        "Read, opening the test files to judge whether they would pass",
        "Grep, searching the tests for the word 'fail'",
        "Glob, listing the test files that changed"
      ],
      "explanation": "Running a command is what Bash is for. Reading or searching test files does not execute them."
    },
    {
      "task": "5.4",
      "scenario": "dp",
      "stem": "During a long exploration session the context fills with verbose discovery output, and answers become less precise. What is the best practice?",
      "options": [
        "Save the key findings to a file, then use /compact to reduce the context",
        "Continue until the limit is reached, then start again from the beginning",
        "Ask the agent to forget the earlier files",
        "Paste the earlier findings in again so that they are recent"
      ],
      "explanation": "/compact reduces context use, and saving findings first makes sure the important details survive the compaction."
    },
    {
      "task": "5.4",
      "scenario": "dp",
      "stem": "Exploration (phase 1) is complete. Phase 2 will use several subagents to implement changes in different modules. How should the phase 1 results reach them?",
      "options": [
        "As a summary of the findings, written into each phase 2 subagent's prompt",
        "By having each phase 2 subagent repeat the exploration it needs for its module",
        "As the complete phase 1 transcript, passed to every subagent so nothing is omitted",
        "Not at all, so that phase 2 is not biased by phase 1"
      ],
      "explanation": "Summarize one phase before starting the next, and pass the summary explicitly. Full transcripts fill each subagent's context, and repeating exploration wastes the first phase."
    },
    {
      "task": "3.1",
      "scenario": "ci",
      "stem": "The review job ignores conventions that Claude follows on a developer's laptop. The conventions are in that developer's ~/.claude/CLAUDE.md. What is the fix?",
      "options": [
        "Put the conventions in the project CLAUDE.md, so that the runner loads them",
        "Copy the developer's home directory onto the runner image",
        "Paste the conventions into the description of each pull request",
        "Pass the developer's username to the job, so that it loads their settings"
      ],
      "explanation": "A CI runner has only what is in the repository. Project-level configuration is what reaches it."
    },
    {
      "task": "3.1",
      "scenario": "ci",
      "stem": "A developer committed a personal preference, 'skip tests when I say quick', into the project CLAUDE.md. The CI job now sometimes skips test generation. What is the correct fix?",
      "options": [
        "Move the preference to that developer's user-level CLAUDE.md",
        "Add a line saying the preference does not apply in CI",
        "Delete CLAUDE.md in the CI checkout step",
        "Reword the preference so that the job does not recognize it"
      ],
      "explanation": "Personal preferences belong at user level. In the project file they apply to everyone, including automation."
    },
    {
      "task": "3.2",
      "scenario": "ci",
      "stem": "A 300-line release checklist sits in the project CLAUDE.md. It loads in every review run, although it is needed only when cutting a release. What is the better home for it?",
      "options": [
        "A skill that is invoked for releases",
        "The same file, with 'ignore unless releasing' added at the top",
        "The release manager's user-level CLAUDE.md",
        "Three CLAUDE.md files in subdirectories, each holding a third"
      ],
      "explanation": "Skills load on demand, which suits task-specific material. CLAUDE.md is always loaded, and a user-level file would hide the checklist from the team."
    },
    {
      "task": "3.2",
      "scenario": "ci",
      "stem": "The CI job fails with 'unknown skill'. The skill it calls exists only under ~/.claude/skills on one developer's laptop. What is the fix?",
      "options": [
        "Commit the skill under .claude/skills/ in the repository",
        "Install Claude Code on the runner under that developer's account",
        "Paste the skill's text into the job's prompt on every run",
        "Turn the skill into a section of the README"
      ],
      "explanation": "Project-scoped skills are shared through version control, so every checkout, including the runner's, has them."
    },
    {
      "task": "3.3",
      "scenario": "ci",
      "stem": "The test generator must follow different conventions for end-to-end tests (*.spec.ts) and unit tests (*.test.ts). Both kinds sit side by side in the same directories. How should the conventions be set up?",
      "options": [
        "Two rules files, each with a paths glob for its own file pattern",
        "One CLAUDE.md per directory that describes both conventions",
        "A flag in the prompt telling the job which kind of test it is writing",
        "A single rule telling the job to infer the convention from nearby files"
      ],
      "explanation": "When conventions follow the file type and not the directory, glob-scoped rules are the mechanism that matches."
    },
    {
      "task": "3.3",
      "scenario": "ci",
      "stem": "A rule scoped with paths: src/*.ts applies to src/index.ts but not to src/api/users.ts. What is the fix?",
      "options": [
        "Change the glob to src/**/*.ts, so that nested files match",
        "Move the nested files up into src",
        "Copy the rule file into each nested folder",
        "Remove the paths entry, so that the rule always loads for everything"
      ],
      "explanation": "A single * does not cross directory boundaries; ** does. Removing the scope would load the rule everywhere."
    },
    {
      "task": "3.4",
      "scenario": "ci",
      "stem": "An engineer is adding the review job to the pipeline: one new step in a YAML file, copied from an existing step with small edits. Which mode is appropriate?",
      "options": [
        "Direct execution, since it is a small change that follows an existing pattern",
        "Plan mode, since pipeline changes affect everyone",
        "The Explore subagent, to survey every pipeline file first and report on what each one does",
        "Plan mode, followed by a second plan for the rollback"
      ],
      "explanation": "Pick the mode from the size and uncertainty of the change. A small edit that copies a known pattern needs no planning phase."
    },
    {
      "task": "3.4",
      "scenario": "ci",
      "stem": "The team is moving its pipelines to a different CI provider. There are 60 workflow files, and nobody is sure which shared templates they depend on. How should the work start?",
      "options": [
        "In plan mode, mapping the workflows and agreeing an approach before editing",
        "In direct execution, working through the files in alphabetical order one at a time",
        "In direct execution, starting with the largest file as a template for the others",
        "In direct execution, with a prompt that says to be careful"
      ],
      "explanation": "A large change with unknown dependencies is the case plan mode exists for: explore and design first, then execute."
    },
    {
      "task": "3.5",
      "scenario": "ci",
      "stem": "A developer asks Claude to 'make the generated tests better'. The next version is longer but no more useful. What should the developer provide?",
      "options": [
        "The specific gaps: which cases are missing and what each test should assert",
        "The same request, with a note that quality matters a great deal for this project",
        "A request for twice as many tests",
        "A request that Claude rate its own tests out of ten"
      ],
      "explanation": "Iteration works when the feedback is specific. A general request for 'better' gives Claude nothing to aim at."
    },
    {
      "task": "3.5",
      "scenario": "ci",
      "stem": "A generated test fails intermittently in CI. The developer tells Claude: 'the test is flaky, fix it'. What would lead to a better fix?",
      "options": [
        "The actual failure output, and the conditions under which the test fails",
        "A request to add retries around the test",
        "A request to rewrite the test from scratch using a different testing approach",
        "A request to mark the test as skipped for now"
      ],
      "explanation": "Concrete failure output lets Claude find the cause. Retries, rewrites and skips act on the symptom."
    },
    {
      "task": "3.6",
      "scenario": "ci",
      "stem": "The CI job generates tests and then, in the same invocation, reviews them. It has never rejected one of its own tests. What should change?",
      "options": [
        "Run the review as a separate invocation with a fresh context",
        "Add a pause between the generation and the review",
        "Ask for the review first and the generation second",
        "Use stricter wording for the review in the prompt"
      ],
      "explanation": "The session that generated the code keeps the reasoning behind it and reviews it less critically. A separate invocation starts without that context."
    },
    {
      "task": "3.6",
      "scenario": "ci",
      "stem": "The test-generation job keeps proposing scenarios that the existing suite already covers. What is the most effective change?",
      "options": [
        "Include the existing test files in the job's context, so that it can see what is covered",
        "Ask for more unusual scenarios in the prompt",
        "Remove duplicate tests in a later pipeline step that compares new tests with the existing suite",
        "Limit the job to three new tests per run"
      ],
      "explanation": "The job cannot avoid what it cannot see. Providing the existing tests lets it target the gaps."
    },
    {
      "task": "4.1",
      "scenario": "ci",
      "stem": "Developers ask the review bot to stop commenting on formatting, which a linter already enforces. What is the most effective prompt change?",
      "options": [
        "State what to report (bugs, security) and what to skip (formatting, naming preferences)",
        "Tell the bot to comment only when it is very confident that a developer would want to hear it",
        "Hide any comment shorter than 100 characters",
        "Lower the maximum number of comments to three"
      ],
      "explanation": "Explicit criteria for what is in scope and what is out reduce false positives. Confidence instructions and caps do not tell the model which kind of finding is unwanted."
    },
    {
      "task": "4.6",
      "scenario": "ci",
      "stem": "The independent reviewer approves a patch that compiles and reads cleanly but does not implement the ticket's acceptance criteria. What should the reviewer be given?",
      "options": [
        "The acceptance criteria along with the diff",
        "The generator's reasoning, so that it can see the intent",
        "An instruction to infer the requirements from the code",
        "A second run, with both runs required to approve"
      ],
      "explanation": "An independent reviewer needs the requirements to judge correctness. It should not receive the generator's reasoning, which would bias it."
    },
    {
      "task": "4.6",
      "scenario": "ci",
      "stem": "The team can afford one extra model call per pull request to review generated code. Which use of that call gives the most independent review?",
      "options": [
        "A separate instance that receives the diff and the requirements",
        "The generating session, after running /compact",
        "The generating session, with extended thinking enabled",
        "The generating session, prompted to act as a strict reviewer"
      ],
      "explanation": "Independence comes from a context that does not hold the generator's reasoning. The other three options all keep reviewing inside the same session."
    },
    {
      "task": "4.1",
      "scenario": "ex",
      "stem": "The schema has one field called amount. Invoices show a subtotal, tax, a total and an amount due, and the value extracted varies between them. What should change?",
      "options": [
        "Define which amount is wanted and how to tell it from the others",
        "Extract the largest number that follows a currency symbol",
        "Ask the model to pick the amount it considers most important",
        "Extract the first amount that appears on the page"
      ],
      "explanation": "The instruction is ambiguous, so the output varies. Say exactly which figure the field means."
    },
    {
      "task": "4.2",
      "scenario": "ex",
      "stem": "Financial tables with merged header cells come out with the columns shifted by one. The instructions already describe merged cells in words. What should you add?",
      "options": [
        "Two worked examples of merged-header tables with the correct output",
        "A longer description of how merged cells work",
        "A step that converts every table to an image first",
        "A rule that rejects documents containing merged cells before extraction"
      ],
      "explanation": "When written instructions have not worked on a structural case, show the model worked examples of it."
    },
    {
      "task": "4.2",
      "scenario": "ex",
      "stem": "To improve accuracy, a colleague proposes adding 60 examples to the prompt, one for every vendor. What is the better approach?",
      "options": [
        "A few targeted examples for the ambiguous cases, with brief reasoning",
        "All 60, since more examples always improve accuracy on the vendors they cover",
        "No examples, with longer instructions in their place",
        "60 examples, chosen from the easy and typical cases"
      ],
      "explanation": "A small number of well-chosen examples aimed at the hard cases teaches the pattern. Dozens of easy ones add tokens without adding guidance."
    },
    {
      "task": "4.3",
      "scenario": "ex",
      "stem": "Dates arrive as '3 March 2025', '03/03/25' and '2025-03-03' in the same field, and a downstream parser fails. What is the right fix?",
      "options": [
        "State the required format, ISO 8601, in the schema description and the prompt",
        "Accept any string, and correct the dates by hand downstream when the parser fails",
        "Retry until the date happens to arrive in the right format for the downstream parser",
        "Change the field to a number and store a timestamp"
      ],
      "explanation": "A schema type of string says nothing about format. Format rules have to be stated alongside the schema."
    },
    {
      "task": "4.3",
      "scenario": "ex",
      "stem": "The pipeline asks for 'JSON only' in the prompt. About 2% of replies include a sentence before the JSON or a trailing comma, and parsing fails. What is the most reliable fix?",
      "options": [
        "Define the output as a tool with a JSON schema, and read the tool input",
        "Add 'no extra text' to the prompt in capitals",
        "Strip everything before the first brace with a regular expression in the parser",
        "Lower max_tokens so that there is no room for extra text"
      ],
      "explanation": "Tool use with a schema produces structured input that matches the schema, which removes syntax failures. Prompt wording and clean-up code reduce them without eliminating them."
    },
    {
      "task": "4.4",
      "scenario": "ex",
      "stem": "A date field fails validation. The model returned 2025-13-01, and the document reads 'January 13, 2025'. Should the pipeline retry?",
      "options": [
        "Yes, with the specific error, since this is a format mistake the model can correct",
        "No, since the value is absent from the document",
        "No; accept the value and let the downstream system reject it if it turns out to be invalid",
        "No; set the field to null without another attempt, since dates like this cannot be repaired"
      ],
      "explanation": "The information is in the document and the error is one of format, which is what retry with feedback fixes. Retries are futile only when the source lacks the information."
    },
    {
      "task": "4.4",
      "scenario": "ex",
      "stem": "One validation error, a missing currency code, accounts for 40% of all retries. What does this suggest?",
      "options": [
        "A gap in the prompt or schema that should be fixed at its source",
        "A retry limit that should be raised so these cases pass in the end",
        "A field that should be excluded from validation",
        "A class of documents that should go to manual entry"
      ],
      "explanation": "A recurring error is a signal about the instructions. Fix the cause instead of paying for the same retry each time."
    },
    {
      "task": "4.5",
      "scenario": "ex",
      "stem": "Batch results arrive, and the code assumes they are in the same order as the inputs. Some extractions end up attached to the wrong documents. What is the fix?",
      "options": [
        "Match each result to its document by custom_id",
        "Sort the results by completion time before matching",
        "Submit one document per batch to preserve the order",
        "Put the file name in the prompt and parse it from the reply"
      ],
      "explanation": "Batch results are not guaranteed to come back in request order. custom_id exists to tie each result to its request."
    },
    {
      "task": "4.5",
      "scenario": "ex",
      "stem": "Three workloads use Claude: an upload a user waits for on screen, a weekly re-extraction of the archive, and a nightly audit of the previous day's output. Which should use the Message Batches API?",
      "options": [
        "The weekly re-extraction and the nightly audit",
        "All three, since the saving applies to every request",
        "The on-screen upload, since it has the highest volume",
        "None, since batch requests cannot return structured output"
      ],
      "explanation": "Batch trades latency for cost, so it fits work that can wait up to 24 hours. A user waiting on screen needs a synchronous call."
    },
    {
      "task": "5.5",
      "scenario": "ex",
      "stem": "A 2% random sample of approved extractions is reviewed each week. Customs forms are 0.5% of volume and almost never appear in the sample; an error pattern in them went unnoticed for two months. What should change?",
      "options": [
        "Stratify the sample, so that rare document types are reviewed too",
        "Raise the overall random sample from 2% to 3%",
        "Exclude the rare types from automation altogether",
        "Review the rare types only when a customer complains"
      ],
      "explanation": "A simple random sample under-represents rare segments. Stratified sampling guarantees each type is measured."
    },
    {
      "task": "5.5",
      "scenario": "ex",
      "stem": "Documents are approved automatically on a document-level confidence score. A document with 30 confident fields and one very doubtful tax ID still passes. What is the better design?",
      "options": [
        "Field-level confidence, so that a doubtful field is sent to review on its own",
        "A higher document-level threshold, raised until the problem disappears from audits",
        "Review of every document that contains a tax ID",
        "An average of confidence over the supplier's last ten documents as the deciding score"
      ],
      "explanation": "An aggregate score hides a weak field. Field-level confidence routes review to the place where the doubt is."
    },
    {
      "task": "5.6",
      "scenario": "ex",
      "stem": "A downstream team asks where a particular extracted value came from. The output holds values only. What should the pipeline record?",
      "options": [
        "The source location, such as page and section, with each extracted value",
        "Nothing more; keep the documents and search them when asked about a value",
        "A note that all values come from the document",
        "The model's explanation of its overall approach"
      ],
      "explanation": "Provenance means each value carries its own source. Without it, every question about a value means going back through the document."
    },
    {
      "task": "5.6",
      "scenario": "ex",
      "stem": "A packet holds two versions of a contract with different renewal dates; the later one is an amendment. What should the extraction return?",
      "options": [
        "Both dates with their document dates, so that the amendment can be seen to supersede",
        "The date from whichever file was uploaded first",
        "The date that appears more often across the packet, on the basis that repetition signals intent",
        "No values, with the packet flagged as invalid"
      ],
      "explanation": "Keeping both values with their dates lets a reader or a later step see which one is current. A difference over time is not a contradiction."
    },
    {
      "task": "2.3",
      "scenario": "ex",
      "stem": "The extraction agent was given 14 tools, including one that sends email. During one run it emailed a vendor to ask about a missing field. What is the right fix?",
      "options": [
        "Remove tools unrelated to extraction from this agent",
        "Add a prompt warning about sending emails",
        "Have the agent request permission in its output first",
        "Rename the email tool so that it sounds less useful"
      ],
      "explanation": "Agents use the tools they are given. Scoping the tool set to the role removes the possibility."
    },
    {
      "task": "5.3",
      "scenario": "ex",
      "stem": "The OCR service fails on about 5% of pages, and the pipeline substitutes empty text. The extraction then returns nulls that look the same as 'field not present in the document'. What should change?",
      "options": [
        "Propagate the OCR failure as an error state, distinct from a field that is absent",
        "Fill the nulls with values from the supplier's previous document",
        "Treat the nulls as absent, since the downstream result is the same in both situations",
        "Retry the extraction step on the empty text"
      ],
      "explanation": "A failure upstream must stay visible as a failure. Turning it into an empty input makes missing data and failed processing indistinguishable."
    },
    {
      "task": "1.1",
      "scenario": "cs",
      "stem": "Your loop appends tool output to the conversation as plain user text, such as 'Result: {...}'. When the model requests two tools in one turn, it confuses which result belongs to which call. What is the fix?",
      "options": [
        "Return each output as a tool_result block carrying the matching tool_use_id",
        "Label each plain-text result with the name of its tool",
        "Force the model to call one tool per turn",
        "Send the results in the order in which the tools finished so the timing shows the pairing"
      ],
      "explanation": "tool_result blocks are linked to their requests by tool_use_id. That link is what lets the model pair results with calls."
    },
    {
      "task": "1.2",
      "scenario": "cs",
      "stem": "The team splits the agent into a coordinator with a billing subagent and a returns subagent. The billing subagent, needing an order's return status, tries to ask the returns subagent directly. How should this work?",
      "options": [
        "Through the coordinator, which decides what is needed and passes the result back",
        "Through a shared scratch file that both subagents read and write during the conversation",
        "By giving the billing subagent all the returns tools as well",
        "By having the billing subagent guess and mark its answer unverified for the coordinator"
      ],
      "explanation": "In a hub-and-spoke design, subagents communicate through the coordinator, which keeps the flow observable and each role's tools scoped."
    },
    {
      "task": "1.2",
      "scenario": "cs",
      "stem": "For a message about both a refund and a return, the billing and returns subagents each produce a reply, and the customer receives the two pasted together, with different greetings and a contradiction. What should happen instead?",
      "options": [
        "The coordinator synthesizes one reply from the subagents' results",
        "The two replies are sent as separate messages a minute apart",
        "Only the reply from the subagent that finished first is sent",
        "Each subagent addresses the customer directly in turn"
      ],
      "explanation": "Aggregating subagent results into one coherent answer is part of the coordinator's role."
    },
    {
      "task": "1.4",
      "scenario": "cs",
      "stem": "The gate allows a refund once any order lookup has succeeded in the session. The agent looked up order A and then refunded order B, which the customer had also mentioned. How should the gate change?",
      "options": [
        "Require that the refund's order ID matches an order looked up in this session",
        "Add a prompt rule telling the agent to double-check order numbers before each refund",
        "Limit each conversation to one order",
        "Require the agent to repeat the order number in its reply so the customer can confirm it"
      ],
      "explanation": "A prerequisite check should verify the specific data the action depends on, not merely that an earlier step ran."
    },
    {
      "task": "1.4",
      "scenario": "cs",
      "stem": "Which of these behaviours is appropriately left to prompt guidance, without programmatic enforcement?",
      "options": [
        "Offering a replacement before a refund when either would settle the issue",
        "Blocking refunds above the approval limit",
        "Requiring identity verification before account changes",
        "Preventing closure of an account that has an open dispute with the billing team"
      ],
      "explanation": "A preference that tolerates occasional variation suits a prompt. The other three are rules where one failure is unacceptable, so they belong in code."
    },
    {
      "task": "1.5",
      "scenario": "cs",
      "stem": "One tool returns amounts in cents and another in dollars. The agent refunded $4,999 when the amount was $49.99. What is the most reliable fix?",
      "options": [
        "Normalize amounts to one unit in a PostToolUse hook before the model reads them",
        "Explain the two units in the system prompt",
        "Ask the agent to sanity-check large amounts against the order total before refunding",
        "Add the unit to each tool's name"
      ],
      "explanation": "Normalizing tool results in a hook makes the data consistent in code. The other options still rely on the model noticing the unit each time."
    },
    {
      "task": "1.5",
      "scenario": "cs",
      "stem": "A manager wants empathy 'enforced' with a hook that blocks any reply lacking an approved apology phrase. What is the better division of work?",
      "options": [
        "Leave tone to the prompt and examples, and keep hooks for rules that code can check exactly",
        "Block any reply that lacks one of twenty approved phrases",
        "Append a fixed apology sentence to every reply in a hook",
        "Score each reply's tone in a hook, and retry low scores up to five times before sending the reply"
      ],
      "explanation": "Hooks give deterministic guarantees for rules that can be checked exactly. Tone is a matter of judgment and is shaped by prompts and examples."
    },
    {
      "task": "1.5",
      "scenario": "cs",
      "stem": "A hook denies refunds above the limit but returns no reason. The agent retries the same call again and again. What should the hook return?",
      "options": [
        "A denial reason that says why, and what the agent should do instead",
        "A silent denial, with retries capped at three",
        "An approval on the fourth identical attempt",
        "A signal that ends the conversation whenever the hook fires"
      ],
      "explanation": "The agent can only change course if the denial tells it why and points to the compliant path, such as escalation."
    },
    {
      "task": "2.1",
      "scenario": "cs",
      "stem": "A new tool, issue_credit, is added for goodwill credits. The agent keeps using process_refund for them. Both descriptions say 'returns money to the customer'. What is the fix?",
      "options": [
        "Describe in both tools when each applies, including the boundary between them",
        "Remove process_refund while credits are being introduced, and restore it once usage settles",
        "Add a routing rule on the word 'credit' in customer messages that selects the new tool",
        "Move issue_credit higher in the tool list"
      ],
      "explanation": "When two tools are similar, each description should say when to use it and when to use the other."
    },
    {
      "task": "2.1",
      "scenario": "cs",
      "stem": "One tool, manage_account(action, ...), handles email changes, address changes and closure. When a customer asked to 'close the ticket', the agent passed action 'close'. What is the best redesign?",
      "options": [
        "Split it into separate tools with clear names and descriptions",
        "Keep one tool and add a confirmation parameter",
        "Keep one tool and list its actions in capitals",
        "Keep one tool and remove 'close' from its description"
      ],
      "explanation": "A multi-purpose tool with a mode argument is easy to misuse. Separate, clearly named tools make each action a deliberate choice."
    },
    {
      "task": "2.1",
      "scenario": "cs",
      "stem": "After every get_customer call, the agent calls lookup_order to learn the customer's most recent order, which get_customer already returns. What is the simplest fix?",
      "options": [
        "State in get_customer's description what it returns, including recent orders",
        "Cache lookup_order, so that the extra call costs less",
        "Remove recent orders from get_customer to avoid duplication between the two tools",
        "Limit the agent to one tool call per turn"
      ],
      "explanation": "A description should cover what a tool returns as well as what it takes. The agent cannot use output it does not expect."
    },
    {
      "task": "2.2",
      "scenario": "cs",
      "stem": "During deployments the payment service returns 503 for a few seconds. The refund tool reports this as a generic, non-retryable error, and the agent escalates every such case. What should change?",
      "options": [
        "Classify it as transient and retryable, so that the agent tries again before escalating",
        "Classify every failure as a business error, for safety, so that the agent never retries a payment",
        "Hide the failure and report the refund as pending",
        "Escalate all failures, since a human can check the payment system directly and confirm the state"
      ],
      "explanation": "Transient failures should be marked retryable. Correct categories let the agent recover where it can and escalate only what needs a person."
    },
    {
      "task": "2.2",
      "scenario": "cs",
      "stem": "The agent calls process_refund with a negative amount, and the tool returns 'failed'. The agent tries the same value twice more. What should the tool return?",
      "options": [
        "A validation error naming the field and the accepted range",
        "A transient error, so that the agent retries unchanged",
        "A success, after silently converting the amount to a positive number",
        "A permission error, to discourage further attempts"
      ],
      "explanation": "A validation error that names the problem lets the agent correct its input. A wrong category sends it down the wrong recovery path."
    },
    {
      "task": "5.1",
      "scenario": "cs",
      "stem": "A 30-page policy document is included in every request. The clause that applies usually sits in the middle, and the agent often misses it. What helps most?",
      "options": [
        "Place the relevant clauses up front, or retrieve only the sections that apply",
        "Include the policy document twice to reinforce it",
        "Ask the agent to read the policy more carefully",
        "Split the policy across three consecutive system messages so that each part is shorter"
      ],
      "explanation": "Material in the middle of a long input gets the least attention. Put what matters first, or supply less."
    },
    {
      "task": "5.2",
      "scenario": "cs",
      "stem": "After three different attempts the agent has not resolved a login problem, and the customer has done everything asked. What should the agent do?",
      "options": [
        "Escalate, with a summary of what has been tried",
        "Keep trying alternatives until the customer leaves",
        "Close the conversation and suggest contacting support later",
        "Offer a goodwill credit to end the conversation on a positive note"
      ],
      "explanation": "Being unable to make meaningful progress is an escalation trigger. The summary spares the customer from repeating every step."
    }
  ]
};

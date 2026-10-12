/* Drill questions for 4.1 Explicit criteria in prompts. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("4.1-1", "4.1-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
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
    "scenario": "ci",
    "stem": "The review prompt says 'check that comments are accurate'. The job flags dozens of comments per pull request for being vague, old-fashioned or incomplete. Developers want to hear only about comments that are actually wrong. What is the most effective change?",
    "options": [
      "State the criterion: flag a comment only when what it claims contradicts what the code does",
      "Add the instruction: be conservative, and flag only the comments you are sure about",
      "Limit the job to five comment findings per pull request, selected by the model",
      "Ask for a confidence score on each comment finding, and hide those below 0.8"
    ],
    "explanation": "Explicit criteria about what to report and what to skip improve precision. 'Be conservative' and confidence filters leave the model's idea of 'accurate' as undefined as before, and a cap keeps an arbitrary five."
  }
];

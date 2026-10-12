/* Drill questions for 4.4 Validation, retry and feedback loops. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("4.4-1", "4.4-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
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
    "scenario": "ci",
    "stem": "Developers dismiss about a third of the findings. You want to learn which code constructs trigger the false positives, but each finding records only a file, a line and a message, so the dismissals cannot be grouped. What should you change?",
    "options": [
      "Add a detected_pattern field to each finding, then analyze which patterns are dismissed most",
      "Ask developers to type a reason each time they dismiss a finding, and read the reasons monthly",
      "Lower the number of findings per pull request until the dismissal rate falls to an acceptable level",
      "Send dismissed findings back through the same prompt to see whether they are reported again"
    ],
    "explanation": "Recording which construct triggered each finding turns dismissals into data you can group and act on. The other options add work for developers or hide findings without explaining anything."
  }
];

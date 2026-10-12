/* Drill questions for 4.5 Batch processing. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("4.5-1", "4.5-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
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
    "scenario": "ex",
    "stem": "A batch of 10,000 documents completes. 312 requests failed, most because the document exceeded the context limit. What is the right way to handle the failures?",
    "options": [
      "Identify them by custom_id and resubmit only those, splitting the oversized documents",
      "Resubmit the whole batch, since partial results cannot be trusted once any request has failed",
      "Resubmit the 312 unchanged, since batch failures are usually transient and pass on a second attempt",
      "Match the 312 to their inputs by position in the results file, then process them one at a time"
    ],
    "explanation": "custom_id ties each result to its request, so only the failures need to go again, and they need a change that addresses why they failed. Results are not guaranteed to be in request order."
  }
];

/* Drill questions for 5.5 Human review and confidence calibration. options[0] is the correct answer; options are shuffled on screen.
   Saved answers are keyed by position ("5.5-1", "5.5-2", ...), so add new questions at the end and never reorder or delete. */
import type { TaskQuestion } from "../../../../lib/types";

export const questions: TaskQuestion[] = [
  {
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
    "scenario": "ex",
    "stem": "The model outputs a confidence score for each extracted field, and you plan to send low-confidence fields to human review. Nobody has yet checked how those scores relate to actual correctness. What should you do first?",
    "options": [
      "Calibrate the review thresholds against a labeled validation set",
      "Route fields that score below 0.5, since under one half means the model thinks it is probably wrong",
      "Ask the model to explain each score, and trust the scores that come with clear explanations",
      "Use one threshold per document, based on the average of its field scores"
    ],
    "explanation": "Self-reported confidence means nothing until it has been compared with ground truth. Calibration on labeled data tells you which score corresponds to which error rate, field by field."
  }
];

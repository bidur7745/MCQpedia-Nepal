import mongoose from "mongoose";

const UserQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
    category: { type: String, required: true },  // Added category field
    difficulty: { type: String, required: true, enum: ["easy", "medium", "hard"] },
    explanation: { type: String, required: true },    // Added difficulty field
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("UserQuestion",  UserQuestionSchema);

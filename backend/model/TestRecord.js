import mongoose from "mongoose";

const testRecordSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    totalQuestions: { type: Number, required: true },
    correctAnswers: { type: Number, required: true },
    percentage: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("TestRecord", testRecordSchema);

import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    amount: Number,
    type: { type: String, enum: ["credit", "debit"] },
    date: String,
    status: { type: String, enum: ["completed", "pending", "failed"], default: "completed" }
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);

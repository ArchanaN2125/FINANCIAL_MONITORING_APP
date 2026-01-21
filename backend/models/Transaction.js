import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    amount: Number,
    type: { type: String, enum: ["credit", "debit"] },
    date: String
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);

import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  department: String,
  allocated: Number,
  spent: Number,
  month: String,
  status: String,
});

export default mongoose.model("Budget", budgetSchema);

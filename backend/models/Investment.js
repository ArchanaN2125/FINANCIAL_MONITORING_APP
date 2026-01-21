import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema({
  name: String,
  type: String,
  amount: Number,
  currentValue: Number,
  returns: Number,
});

export default mongoose.model("Investment", investmentSchema);

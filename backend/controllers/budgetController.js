import Budget from "../models/Budget.js";

export const getBudgets = async (req, res) => {
  const budgets = await Budget.find();
  res.json(budgets);
};

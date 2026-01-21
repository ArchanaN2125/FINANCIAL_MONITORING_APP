import Transaction from "../models/Transaction.js";

export const getTransactions = async (req, res) => {
  const data = await Transaction.find();
  res.json(data);
};

export const addTransaction = async (req, res) => {
  const newTrans = await Transaction.create(req.body);
  res.json(newTrans);
};

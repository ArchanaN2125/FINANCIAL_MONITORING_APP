import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// GET all transactions
router.get("/", async (req, res) => {
  const data = await Transaction.find().sort({ createdAt: -1 });
  res.json(data);
});

// ADD transaction
router.post("/", async (req, res) => {
  const transaction = new Transaction(req.body);
  await transaction.save();
  res.json({ message: "Transaction added successfully" });
});

// GENERATE report
router.get("/report", async (req, res) => {
  const transactions = await Transaction.find();
  res.json({
    totalTransactions: transactions.length,
    data: transactions
  });
});

export default router;


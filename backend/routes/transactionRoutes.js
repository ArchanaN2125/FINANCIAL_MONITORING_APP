import express from "express";
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from "../controllers/transactionController.js";

const router = express.Router();

// GET all transactions
router.get("/", getTransactions);

// ADD transaction
router.post("/", addTransaction);

// UPDATE transaction
router.put("/:id", updateTransaction);

// DELETE transaction
router.delete("/:id", deleteTransaction);

// GENERATE report
router.get("/report", async (req, res) => {
  const Transaction = (await import("../models/Transaction.js")).default;
  const transactions = await Transaction.find();
  res.json({
    totalTransactions: transactions.length,
    data: transactions
  });
});

export default router;


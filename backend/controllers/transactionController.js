import Transaction from "../models/Transaction.js";

export const getTransactions = async (req, res) => {
  try {
    const data = await Transaction.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions", error: error.message });
  }
};

export const addTransaction = async (req, res) => {
  try {
    const { title, category, amount, type, date, status } = req.body;

    // Validate required fields
    if (!title || !category || !amount || !type || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTrans = await Transaction.create({
      title,
      category,
      amount,
      type,
      date,
      status: status || "completed"
    });

    res.status(201).json({
      message: "Transaction added successfully",
      transaction: newTrans
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add transaction", error: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, amount, type, date, status } = req.body;

    const updatedTrans = await Transaction.findByIdAndUpdate(
      id,
      { title, category, amount, type, date, status },
      { new: true }
    );

    if (!updatedTrans) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({
      message: "Transaction updated successfully",
      transaction: updatedTrans
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update transaction", error: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTrans = await Transaction.findByIdAndDelete(id);

    if (!deletedTrans) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({
      message: "Transaction deleted successfully",
      transaction: deletedTrans
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete transaction", error: error.message });
  }
};

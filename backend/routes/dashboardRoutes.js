import express from "express";

const router = express.Router();

// In-memory store (later replace with MongoDB)
let transactions = [
  { title: "Client Payment - Tata Steel", category: "Revenue", date: "19 Jan 2026", amount: 250000, type: "credit" },
  { title: "Office Rent - Mumbai", category: "Operations", date: "18 Jan 2026", amount: 85000, type: "debit" },
  { title: "Software Subscription", category: "Technology", date: "17 Jan 2026", amount: 12500, type: "debit" },
  { title: "Consulting Fee - Infosys", category: "Revenue", date: "16 Jan 2026", amount: 175000, type: "credit" },
  { title: "Employee Reimbursement", category: "HR", date: "15 Jan 2026", amount: 8750, type: "debit" }
];

// ✅ SUMMARY CARDS
router.get("/summary", (req, res) => {
  res.json([
    { title: "TOTAL BALANCE", value: "₹45,23,500", trend: "+12.5%", trendType: "positive" },
    { title: "MONTHLY REVENUE", value: "₹29,50,000", trend: "+8.2%", trendType: "positive" },
    { title: "MONTHLY EXPENSES", value: "₹17,80,000", trend: "-3.4%", trendType: "negative" },
    { title: "NET PROFIT", value: "₹11,70,000", trend: "+15.8%", trendType: "positive" }
  ]);
});

// ✅ REVENUE vs EXPENSES CHART
router.get("/revenue-expenses", (req, res) => {
  res.json({
    labels: ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan"],
    datasets: [
      {
        label: "Revenue",
        data: [18,20,19,24,23,26,24,27,30,28]
      },
      {
        label: "Expenses",
        data: [12,13,12,15,14,16,15,16,17,16]
      }
    ]
  });
});

// ✅ EXPENSE DISTRIBUTION
router.get("/expense-distribution", (req, res) => {
  res.json({
    labels: ["Operations","Salaries","Technology","Marketing","Others"],
    datasets: [{ data: [35,25,15,15,10] }]
  });
});

// ✅ RECENT TRANSACTIONS (Dashboard)
router.get("/recent-transactions", (req, res) => {
  res.json(transactions.slice(0, 5));
});

// ✅ VIEW ALL TRANSACTIONS
router.get("/transactions", (req, res) => {
  res.json(transactions);
});

// ✅ ADD TRANSACTION
router.post("/add-transaction", (req, res) => {
  const newTransaction = req.body;
  transactions.unshift(newTransaction);
  res.json({ message: "Transaction added successfully" });
});

// ✅ GENERATE REPORT
router.get("/generate-report", (req, res) => {
  const totalRevenue = transactions
    .filter(t => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);

  res.json({
    totalRevenue,
    totalExpense,
    netProfit: totalRevenue - totalExpense
  });
});

export default router;

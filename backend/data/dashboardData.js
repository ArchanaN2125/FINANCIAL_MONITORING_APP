export const dashboardSummary = {
  totalBalance: 4523500,
  monthlyRevenue: 2950000,
  monthlyExpenses: 1780000,
  netProfit: 1170000,
  balanceChange: "+12.5%",
  revenueChange: "+8.2%",
  expenseChange: "-3.4%",
  profitChange: "+15.8%"
};

export const revenueExpenseChart = {
  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
  revenue: [18, 20, 19, 24, 23, 26, 24, 27, 30, 28],
  expenses: [12, 13, 12, 15, 14, 16, 15, 16, 17, 16]
};

export const expenseDistribution = [
  { label: "Operations", value: 35 },
  { label: "Salaries", value: 25 },
  { label: "Technology", value: 15 },
  { label: "Marketing", value: 15 },
  { label: "Others", value: 10 }
];

export const recentTransactions = [
  {
    title: "Client Payment - Tata Steel",
    category: "Revenue",
    date: "19 Jan 2026",
    amount: "+₹2,50,000",
    type: "credit"
  },
  {
    title: "Office Rent - Mumbai",
    category: "Operations",
    date: "18 Jan 2026",
    amount: "-₹85,000",
    type: "debit"
  },
  {
    title: "Software Subscription",
    category: "Technology",
    date: "17 Jan 2026",
    amount: "-₹12,500",
    type: "debit"
  },
  {
    title: "Consulting Fee - Infosys",
    category: "Revenue",
    date: "16 Jan 2026",
    amount: "+₹1,75,000",
    type: "credit"
  },
  {
    title: "Employee Reimbursement",
    category: "HR",
    date: "15 Jan 2026",
    amount: "-₹8,750",
    type: "debit"
  }
];

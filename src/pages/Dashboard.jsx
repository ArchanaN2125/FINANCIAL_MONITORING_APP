import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

function Dashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState([]);
  const [revenueExpenseData, setRevenueExpenseData] = useState(null);
  const [expenseDistributionData, setExpenseDistributionData] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // SUMMARY
    fetch("http://localhost:5000/api/dashboard/summary")
      .then(res => res.json())
      .then(data => setSummary(data));

    // REVENUE vs EXPENSES
    fetch("http://localhost:5000/api/dashboard/revenue-expenses")
      .then(res => res.json())
      .then(data =>
        setRevenueExpenseData({
          labels: data.labels,
          datasets: [
            {
              ...data.datasets[0],
              label: "Revenue",
              borderColor: "#2563eb",
              backgroundColor: "rgba(37, 99, 235, 0.25)",
              fill: true,
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: "#2563eb"
            },
            {
              ...data.datasets[1],
              label: "Expenses",
              borderColor: "#facc15",
              backgroundColor: "rgba(250, 204, 21, 0.25)",
              fill: true,
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: "#facc15"
            }
          ]
        })
      );

    // EXPENSE DISTRIBUTION (FIXED COLORS)
    fetch("http://localhost:5000/api/dashboard/expense-distribution")
      .then(res => res.json())
      .then(data =>
        setExpenseDistributionData({
          labels: data.labels,
          datasets: [
            {
              data: data.datasets[0].data,
              backgroundColor: [
                "#2563eb", // Operations
                "#facc15", // Salaries
                "#16a34a", // Technology
                "#06b6d4", // Marketing
                "#9ca3af"  // Others
              ],
              borderWidth: 2,
              borderColor: "#ffffff"
            }
          ]
        })
      );

    // TRANSACTIONS - Fetch real user data
    fetch("http://localhost:5000/api/transactions")
      .then(res => res.json())
      .then(data => setTransactions(data.slice(0, 5))); // Show last 5 transactions
  }, []);

  const handleDeleteTransaction = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/transactions/${id}`, {
          method: "DELETE"
        });
        if (response.ok) {
          setTransactions(transactions.filter(tx => tx._id !== id));
          alert("Transaction deleted successfully!");
        }
      } catch (error) {
        alert("Failed to delete transaction");
      }
    }
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true
        }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true }
    }
  };

  const doughnutOptions = {
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 15
        }
      }
    }
  };

  return (
    <>
      <h4 className="fw-bold">Welcome, Archana!</h4>
      <p className="text-muted">Here's your financial overview</p>

      {/* SUMMARY */}
      <div className="row g-4 mt-3">
        {summary.map((item, i) => (
          <div className="col-md-3" key={i}>
            <div className="summary-card">
              <p className="label">{item.title}</p>
              <h5>{item.value}</h5>
              <span className={item.trendType}>{item.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="row g-4 mt-4">
        <div className="col-md-8">
          <div className="box-card">
            <h6 className="fw-bold">Revenue vs Expenses</h6>
            {revenueExpenseData && (
              <Line data={revenueExpenseData} options={lineOptions} />
            )}
          </div>
        </div>

        <div className="col-md-4">
          <div className="box-card">
            <h6 className="fw-bold">Expense Distribution</h6>
            {expenseDistributionData && (
              <Doughnut
                data={expenseDistributionData}
                options={doughnutOptions}
              />
            )}
          </div>
        </div>
      </div>

      {/* TRANSACTIONS + ACTIONS */}
      <div className="row g-4 mt-4">
        <div className="col-md-8">
          <div className="box-card">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold">Recent Transactions</h6>
              <span 
                className="view-all" 
                style={{cursor: 'pointer'}} 
                onClick={() => navigate("/transactions")}
              >
                View All →
              </span>
            </div>

            <ul className="transaction-list">
              {transactions.length > 0 ? (
                transactions.map((tx, i) => (
                  <li className="transaction-item" key={tx._id || i}>
                    <span className={`icon ${tx.type === "credit" ? "green" : "red"}`}>
                      {tx.type === "credit" ? "↗" : "↘"}
                    </span>
                    <div>
                      <strong>{tx.title}</strong>
                      <p>{tx.category} • {tx.date}</p>
                      <span className={`status-badge ${tx.status || "completed"}`}>
                        {tx.status || "completed"}
                      </span>
                    </div>
                    <span className={`amount ${tx.type === "credit" ? "positive" : "negative"}`}>
                      {tx.type === "credit" ? "+" : "-"}₹{tx.amount.toLocaleString()}
                    </span>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon edit" 
                        title="Edit"
                        onClick={() => navigate(`/transactions/edit/${tx._id}`)}
                      >
                        ✎
                      </button>
                      <button 
                        className="btn-icon delete" 
                        title="Delete"
                        onClick={() => handleDeleteTransaction(tx._id)}
                      >
                        🗑
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <li className="transaction-item">
                  <p className="text-muted">No transactions yet</p>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="col-md-4">
          <div className="box-card">
            <h6 className="fw-bold">Quick Actions</h6>
            <button
              className="btn btn-outline-primary w-100 mt-3"
              onClick={() => navigate("/transactions/add")}
            >
              + Add Transaction
            </button>
            <button className="btn btn-outline-secondary w-100 mt-2">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

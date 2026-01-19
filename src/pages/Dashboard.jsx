import "./Dashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const revenueExpenseData = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
    datasets: [
      {
        label: "Revenue",
        data: [18, 20, 19, 24, 23, 26, 24, 27, 30, 28],
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13,110,253,0.1)",
        fill: true
      },
      {
        label: "Expenses",
        data: [12, 13, 12, 15, 14, 16, 15, 16, 17, 16],
        borderColor: "#ffc107",
        backgroundColor: "rgba(255,193,7,0.2)",
        fill: true
      }
    ]
  };

  const expenseDistributionData = {
    labels: ["Operations", "Salaries", "Technology", "Marketing", "Others"],
    datasets: [
      {
        data: [35, 25, 15, 15, 10],
        backgroundColor: [
          "#0d6efd",
          "#ffc107",
          "#198754",
          "#0dcaf0",
          "#6c757d"
        ]
      }
    ]
  };

  return (
    <div>
      <h4 className="fw-bold">Welcome, Amit!</h4>
      <p className="text-muted">Here's your financial overview</p>

      {/* SUMMARY CARDS */}
      <div className="row g-4 mt-3">
        {[
          ["TOTAL BALANCE", "₹45,23,500", "+12.5%", "positive"],
          ["MONTHLY REVENUE", "₹29,50,000", "+8.2%", "positive"],
          ["MONTHLY EXPENSES", "₹17,80,000", "-3.4%", "negative"],
          ["NET PROFIT", "₹11,70,000", "+15.8%", "positive"]
        ].map((item, i) => (
          <div className="col-md-3" key={i}>
            <div className="summary-card">
              <p className="label">{item[0]}</p>
              <h5>{item[1]}</h5>
              <span className={item[3]}>{item[2]}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="row g-4 mt-4">
        <div className="col-md-8">
          <div className="box-card">
            <h6 className="fw-bold">Revenue vs Expenses</h6>
            <Line data={revenueExpenseData} />
          </div>
        </div>

        <div className="col-md-4">
          <div className="box-card">
            <h6 className="fw-bold">Expense Distribution</h6>
            <Doughnut data={expenseDistributionData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

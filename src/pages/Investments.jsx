import "./Investments.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Investments() {
  const allocationData = {
    labels: ["Mutual Funds", "Fixed Deposits", "Equity", "Bonds", "PPF"],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
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
      <h4 className="fw-bold">Investments</h4>
      <p className="text-muted">Track your investment portfolio</p>

      {/* TOP SUMMARY */}
      <div className="row g-4 mt-3">
        <SummaryCard title="Invested" value="₹54.50 L" />
        <SummaryCard title="Current Value" value="₹62.08 L" />
        <SummaryCard title="Returns" value="+₹7.58 L" positive />
        <SummaryCard title="Overall Return" value="+13.91%" positive />
      </div>

      {/* MAIN CONTENT */}
      <div className="row g-4 mt-4">
        {/* Portfolio Allocation */}
        <div className="col-md-5">
          <div className="box-card">
            <h6 className="fw-bold mb-3">Portfolio Allocation</h6>
            <Doughnut data={allocationData} />
            <div className="legend mt-3">
              <span className="dot blue"> Mutual Funds</span>
              <span className="dot yellow"> Fixed Deposits</span>
              <span className="dot green"> Equity</span>
              <span className="dot cyan"> Bonds</span>
              <span className="dot gray"> PPF</span>
            </div>
          </div>
        </div>

        {/* Investment List */}
        <div className="col-md-7">
          <div className="box-card">
            <h6 className="fw-bold mb-3">All Investments</h6>

            <InvestmentItem
              name="Nifty 50 Index Fund"
              type="Mutual Fund"
              value="₹18.25 L"
              gain="+₹3.25 L (21.67%)"
            />

            <InvestmentItem
              name="Fixed Deposit - HDFC"
              type="FD"
              value="₹21.40 L"
              gain="+₹1.40 L (7%)"
            />

            <InvestmentItem
              name="Government Bonds"
              type="Bonds"
              value="₹10.72 L"
              gain="+₹72,000 (7.2%)"
            />

            <InvestmentItem
              name="Reliance Industries"
              type="Equity"
              value="₹6.85 L"
              gain="+₹1.85 L (37%)"
            />

            <InvestmentItem
              name="PPF Account"
              type="PPF"
              value="₹4.86 L"
              gain="+₹36,000 (8%)"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, positive }) {
  return (
    <div className="col-md-3">
      <div className="summary-card">
        <p className="label">{title}</p>
        <h5 className={positive ? "positive" : ""}>{value}</h5>
      </div>
    </div>
  );
}

function InvestmentItem({ name, type, value, gain }) {
  return (
    <div className="investment-item">
      <div className="left">
        <div className="icon">₹</div>
        <div>
          <strong>{name}</strong>
          <p>{type}</p>
        </div>
      </div>
      <div className="right">
        <strong>{value}</strong>
        <p className="positive">{gain}</p>
      </div>
    </div>
  );
}

export default Investments;

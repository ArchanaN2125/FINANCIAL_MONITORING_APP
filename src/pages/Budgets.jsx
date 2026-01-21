import "./Budgets.css";

function Budgets() {
  return (
    <div>
      <h4 className="fw-bold">Budgets</h4>
      <p className="text-muted">Monitor and manage department budgets</p>

      {/* TOP SUMMARY */}
      <div className="row g-4 mt-3">
        <div className="col-md-4">
          <div className="summary-card">
            <p className="label">Total Allocated</p>
            <h5>₹22,00,000</h5>
          </div>
        </div>

        <div className="col-md-4">
          <div className="summary-card">
            <p className="label">Total Spent</p>
            <h5>₹17,92,000</h5>
          </div>
        </div>

        <div className="col-md-4">
          <div className="summary-card">
            <p className="label">Remaining</p>
            <h5 className="positive">₹4,08,000</h5>
          </div>
        </div>
      </div>

      {/* BUDGET CARDS */}
      <div className="row g-4 mt-4">
        <BudgetCard
          title="Operations"
          spent="₹4,50,000"
          allocated="₹6,00,000"
          percent={75}
          status="ontrack"
        />

        <BudgetCard
          title="Marketing"
          spent="₹1,85,000"
          allocated="₹2,00,000"
          percent={92}
          status="warning"
        />

        <BudgetCard
          title="Technology"
          spent="₹1,20,000"
          allocated="₹2,50,000"
          percent={48}
          status="ontrack"
        />

        <BudgetCard
          title="HR & Payroll"
          spent="₹8,90,000"
          allocated="₹10,00,000"
          percent={89}
          status="ontrack"
        />

        <BudgetCard
          title="Travel"
          spent="₹1,15,000"
          allocated="₹1,00,000"
          percent={100}
          status="exceeded"
          exceededText="Exceeded by ₹15,000"
        />

        <BudgetCard
          title="Office Supplies"
          spent="₹32,000"
          allocated="₹50,000"
          percent={64}
          status="ontrack"
        />
      </div>
    </div>
  );
}

function BudgetCard({
  title,
  spent,
  allocated,
  percent,
  status,
  exceededText
}) {
  return (
    <div className="col-md-6">
      <div className="box-card">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="fw-bold">{title}</h6>
            <p className="text-muted">January 2026</p>
          </div>
          <span className={`status ${status}`}>
            {status === "ontrack"
              ? "On Track"
              : status === "warning"
              ? "Warning"
              : "Exceeded"}
          </span>
        </div>

        <div className="mt-3">
          <div className="d-flex justify-content-between">
            <span className="text-muted">Spent</span>
            <strong>{spent}</strong>
          </div>

          <div className="progress mt-2">
            <div
              className={`progress-bar ${status}`}
              style={{ width: `${percent}%` }}
            ></div>
          </div>

          <div className="d-flex justify-content-between mt-2">
            <span className="text-muted">Allocated</span>
            <strong>{allocated}</strong>
          </div>
        </div>

        {status === "exceeded" && (
          <div className="exceeded-box mt-3">
            ⚠ {exceededText}
          </div>
        )}
      </div>
    </div>
  );
}

export default Budgets;
import "./Transactions.css";

function Transactions() {
  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold">Transactions</h4>
          <p className="text-muted">Manage all financial transactions</p>
        </div>

        <div>
          <button className="btn btn-outline-secondary me-2">Export</button>
          <button className="btn btn-primary">+ Add Transaction</button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="box-card mb-4">
        <div className="row g-3">
          <div className="col-md-9">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
            />
          </div>
          <div className="col-md-3">
            <select className="form-select">
              <option>All Types</option>
              <option>Revenue</option>
              <option>Expense</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="box-card">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th>Transaction</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-end">Amount</th>
            </tr>
          </thead>

          <tbody>
            <TransactionRow
              icon="green"
              title="Client Payment - Tata Steel"
              category="Revenue"
              date="19 Jan 2026"
              status="completed"
              amount="+₹2,50,000"
            />

            <TransactionRow
              icon="red"
              title="Office Rent - Mumbai"
              category="Operations"
              date="18 Jan 2026"
              status="completed"
              amount="-₹85,000"
            />

            <TransactionRow
              icon="red"
              title="Software Subscription - Adobe"
              category="Technology"
              date="17 Jan 2026"
              status="completed"
              amount="-₹12,500"
            />

            <TransactionRow
              icon="green"
              title="Consulting Fee - Infosys"
              category="Revenue"
              date="16 Jan 2026"
              status="pending"
              amount="+₹1,75,000"
            />

            <TransactionRow
              icon="red"
              title="Employee Reimbursement - Travel"
              category="HR"
              date="15 Jan 2026"
              status="completed"
              amount="-₹8,750"
            />

            <TransactionRow
              icon="green"
              title="Client Retainer - Wipro"
              category="Revenue"
              date="14 Jan 2026"
              status="completed"
              amount="+₹3,50,000"
            />

            <TransactionRow
              icon="red"
              title="Cloud Services - AWS"
              category="Technology"
              date="13 Jan 2026"
              status="completed"
              amount="-₹45,000"
            />

            <TransactionRow
              icon="red"
              title="Marketing Campaign - Google Ads"
              category="Marketing"
              date="12 Jan 2026"
              status="failed"
              amount="-₹75,000"
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TransactionRow({ icon, title, category, date, status, amount }) {
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center gap-3">
          <span className={`tx-icon ${icon}`}>
            {icon === "green" ? "↗" : "↘"}
          </span>
          <span>{title}</span>
        </div>
      </td>

      <td>
        <span className="pill">{category}</span>
      </td>

      <td>{date}</td>

      <td>
        <span className={`status ${status}`}>{status}</span>
      </td>

      <td className={`text-end fw-bold ${amount.startsWith("+") ? "positive" : "negative"}`}>
        {amount}
      </td>
    </tr>
  );
}

export default Transactions;

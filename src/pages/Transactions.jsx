import "./Transactions.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Transactions() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All Types");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/transactions");
      const data = await response.json();
      setTransactions(data);
      setFilteredTransactions(data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    applyFilters(term, filterType);
  };

  const handleFilter = (e) => {
    const type = e.target.value;
    setFilterType(type);
    applyFilters(searchTerm, type);
  };

  const applyFilters = (search, type) => {
    let filtered = transactions;

    if (type !== "All Types") {
      filtered = filtered.filter(t => {
        if (type === "Revenue") return t.type === "credit";
        if (type === "Expense") return t.type === "debit";
        return true;
      });
    }

    if (search) {
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(search) ||
        t.category.toLowerCase().includes(search)
      );
    }

    setFilteredTransactions(filtered);
  };

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
          <button className="btn btn-primary" onClick={() => navigate("/transactions/add")}>+ Add Transaction</button>
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
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="col-md-3">
            <select className="form-select" value={filterType} onChange={handleFilter}>
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
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <span className={`tx-icon ${tx.type === "credit" ? "green" : "red"}`}>
                        {tx.type === "credit" ? "↗" : "↘"}
                      </span>
                      <span>{tx.title}</span>
                    </div>
                  </td>
                  <td>
                    <span className="pill">{tx.category}</span>
                  </td>
                  <td>{tx.date}</td>
                  <td>
                    <span className="status completed">completed</span>
                  </td>
                  <td className={`text-end fw-bold ${tx.type === "credit" ? "positive" : "negative"}`}>
                    {tx.type === "credit" ? "+" : "-"}₹{tx.amount.toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;

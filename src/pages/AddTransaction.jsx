import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddTransaction.css";

function AddTransaction() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    type: "expense",
    amount: "",
    date: "",
    status: "completed"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
          type: formData.type === "expense" ? "debit" : "credit",
          status: formData.status
        })
      });

      if (!response.ok) {
        throw new Error("Failed to add transaction");
      }

      alert("Transaction added successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Error adding transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-transaction-container">
      <h2>Add New Transaction</h2>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            placeholder="e.g., Office Rent, Salary Bonus"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category *</label>
          <input
            type="text"
            name="category"
            placeholder="e.g., Operations, Salaries, Technology"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Type *</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="expense">Expense</option>
            <option value="revenue">Revenue</option>
          </select>
        </div>

        <div className="form-group">
          <label>Amount *</label>
          <input
            type="number"
            name="amount"
            placeholder="0.00"
            value={formData.amount}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Status *</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Save Transaction"}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTransaction;

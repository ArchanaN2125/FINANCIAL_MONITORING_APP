import { useState } from "react";
function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const addTransaction = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      text,
      amount,
      type,
      date: new Date().toLocaleDateString()
    };

    setTransactions([...transactions, newTransaction]);
    setText("");
    setAmount("");
  };

  return (
    <div style={{ marginLeft: "220px", padding: "20px" }}>
      <h2>Transactions</h2>

      <form onSubmit={addTransaction}>
        <input
          type="text"
          placeholder="Description"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.text} - ₹{t.amount} ({t.type}) - {t.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;

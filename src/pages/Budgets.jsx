import { useState } from "react";

function Budgets() {
  const [budget, setBudget] = useState("");
  const [savedBudget, setSavedBudget] = useState(null);

  return (
    <div style={{ marginLeft: "220px", padding: "20px" }}>
      <h2>Budgets</h2>

      <input
        type="number"
        placeholder="Enter Monthly Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />
      <button onClick={() => setSavedBudget(budget)}>Save Budget</button>

      {savedBudget && <p>Saved Budget: ₹{savedBudget}</p>}
    </div>
  );
}

export default Budgets;

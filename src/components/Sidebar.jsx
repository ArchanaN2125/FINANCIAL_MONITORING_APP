import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>₹ FinanceHub</h2>
        <p className="subtitle">Money Tracker</p>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/transactions">Transactions</NavLink>
        <NavLink to="/budgets">Budgets</NavLink>
        <NavLink to="/investments">Investments</NavLink>
        <NavLink to="/notifications">Notifications</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>

      <div className="sidebar-footer">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

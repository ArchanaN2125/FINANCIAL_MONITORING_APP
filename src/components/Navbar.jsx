import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <h4>Financial Monitoring System - B.Tech CSE Project</h4>

      <div className="navbar-right">
        <select className="role-select">
          <option>Admin</option>
          <option>Manager</option>
          <option>User</option>
        </select>

        <div className="notification-icon" onClick={() => navigate("/notifications")}>
          🔔
          <span className="notification-dot"></span>
        </div>

        <div className="profile">RK</div>
      </div>
    </header>
  );
}

export default Navbar;

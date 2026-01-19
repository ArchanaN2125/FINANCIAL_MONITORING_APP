import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Transactions", path: "/transactions" },
    { name: "Analytics", path: "/analytics" },
    { name: "Budgets", path: "/budgets" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" }
  ];

  return (
    <div className="sidebar">
      <h4 className="logo">💰 FinanceHub</h4>

      {menu.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`menu-item ${
            location.pathname === item.path ? "active" : ""
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;

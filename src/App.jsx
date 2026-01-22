import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddTransaction from "./pages/AddTransaction";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Investments from "./pages/Investments";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

// Auth check
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// Protected Route Wrapper
function ProtectedLayout() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/transactions/add" element={<AddTransaction />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH ROUTES (NO SIDEBAR) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED APP */}
        <Route path="/*" element={<ProtectedLayout />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

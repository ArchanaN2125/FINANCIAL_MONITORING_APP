import "./Settings.css";
import { useState } from "react";

function Settings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [paymentNotif, setPaymentNotif] = useState(true);
  const [budgetNotif, setBudgetNotif] = useState(false);

  return (
    <div className="settings-page">
      <h4 className="fw-bold">Settings</h4>
      <p className="text-muted">Manage your account and preferences</p>

      <div className="settings-container">
        {/* LEFT MENU */}
        <div className="settings-menu">
          <div className="menu-item active">Profile</div>
          <div className="menu-item">Notifications</div>
          <div className="menu-item">Security</div>
          <div className="menu-item">Company</div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="settings-content">
          {/* PROFILE */}
          <div className="settings-card">
            <h6 className="fw-bold mb-3">Profile Information</h6>

            <div className="profile-header">
              <div className="avatar">Ar</div>
              <button className="btn-outline">Change Photo</button>
            </div>

            <div className="form-grid">
              <div>
                <label>Full Name</label>
                <input type="text" value="Archana" />
              </div>

              <div>
                <label>Email</label>
                <input type="email" value="rajesh.kumar@company.com" />
              </div>

              <div>
                <label>Phone</label>
                <input type="text" value="+91 98765 43210" />
              </div>

              <div>
                <label>Department</label>
                <input type="text" value="Engineering" />
              </div>
            </div>

            <button className="btn-primary mt-3">Save Changes</button>
          </div>

          {/* NOTIFICATIONS */}
          <div className="settings-card">
            <h6 className="fw-bold mb-3">Notification Preferences</h6>

            <Toggle
              label="Email Notifications"
              desc="Receive email alerts for updates"
              checked={emailNotif}
              onChange={() => setEmailNotif(!emailNotif)}
            />

            <Toggle
              label="Payment Alerts"
              desc="Get notified for transactions"
              checked={paymentNotif}
              onChange={() => setPaymentNotif(!paymentNotif)}
            />

            <Toggle
              label="Budget Warnings"
              desc="Alert when budgets exceed limits"
              checked={budgetNotif}
              onChange={() => setBudgetNotif(!budgetNotif)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({ label, desc, checked, onChange }) {
  return (
    <div className="toggle-row">
      <div>
        <strong>{label}</strong>
        <p>{desc}</p>
      </div>
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider"></span>
      </label>
    </div>
  );
}

export default Settings;

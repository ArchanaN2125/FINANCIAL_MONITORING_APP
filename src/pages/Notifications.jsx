import "./Notifications.css";
import { useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Payment Received",
      message: "Payment of ₹2,50,000 received from Tata Steel",
      time: "10 min ago",
      type: "success",
      isNew: true,
    },
    {
      id: 2,
      title: "Budget Alert",
      message: "Marketing budget is 92% utilized",
      time: "1 hour ago",
      type: "warning",
      isNew: true,
    },
    {
      id: 3,
      title: "Report Ready",
      message: "Q4 2025 Financial Report is ready",
      time: "2 hours ago",
      type: "info",
      isNew: true,
    },
    {
      id: 4,
      title: "Payment Failed",
      message: "Transaction to Google Ads failed",
      time: "3 hours ago",
      type: "error",
      isNew: false,
    },
    {
      id: 5,
      title: "New Team Member",
      message: "Arjun Nair joined Engineering",
      time: "5 hours ago",
      type: "info",
      isNew: false,
    },
  ]);

  const unreadCount = notifications.filter(n => n.isNew).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isNew: false })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div>
      <div className="notifications-header">
        <div>
          <h4 className="fw-bold">Notifications</h4>
          <p className="text-muted">{unreadCount} unread notifications</p>
        </div>

        <div className="actions">
          <button className="btn-outline" onClick={markAllRead}>
            ✓ Mark All Read
          </button>
          <button className="btn-outline danger" onClick={clearAll}>
            🗑 Clear All
          </button>
        </div>
      </div>

      <div className="notifications-list">
        {notifications.map(n => (
          <div key={n.id} className={`notification-card ${n.type}`}>
            <div className="icon">{getIcon(n.type)}</div>

            <div className="content">
              <strong>{n.title}</strong>
              <p>{n.message}</p>
              <span className="time">⏱ {n.time}</span>
            </div>

            {n.isNew && <span className="badge">New</span>}
          </div>
        ))}

        {notifications.length === 0 && (
          <p className="text-muted mt-4">No notifications</p>
        )}
      </div>
    </div>
  );
}

function getIcon(type) {
  if (type === "success") return "✔";
  if (type === "warning") return "⚠";
  if (type === "error") return "✖";
  return "ℹ";
}

export default Notifications;

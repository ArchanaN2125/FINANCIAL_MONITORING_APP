import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  title: String,
  message: String,
  time: String,
  status: { type: String, default: "new" }
});

export default mongoose.model("Notification", notificationSchema);

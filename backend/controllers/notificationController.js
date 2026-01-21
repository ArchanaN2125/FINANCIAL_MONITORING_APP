import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  const notes = await Notification.find();
  res.json(notes);
};

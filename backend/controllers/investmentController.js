import Investment from "../models/Investment.js";

export const getInvestments = async (req, res) => {
  const investments = await Investment.find();
  res.json(investments);
};

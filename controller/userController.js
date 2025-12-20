const practiceUser = require("../models/userModel");


const addUser = async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(404).json({ "error": "Invalid Username" })
  const user = await practiceUser.create({ username })
  res.status(200).json(user)
};

const getUser = async (req, res) => {
  const users = await practiceUser.find()
  res.json(users);
}

module.exports = { addUser, getUser }
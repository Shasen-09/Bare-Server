const practiceUser = require("../models/userModel");


const addUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username) return res.status(404).json({ "error": "Invalid Username" })
    if (!password) return res.status(404).json({ "error": "Invalid Password" })
    if (!role) return res.status(404).json({ "error": "Invalid Role" })
    const user = await practiceUser.create({ username, password, role })
    res.status(200).json({ message: "User succesfully created", user })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Username already exist" })
    }
    res.status(500).json({ error: err.message })
  }
};

const getUser = async (req, res) => {
  const users = await practiceUser.find()
  res.json(users);
}

module.exports = { addUser, getUser }
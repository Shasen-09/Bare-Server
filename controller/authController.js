const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const users = require('../models/userModel')

const JSON_WEBTOKEN = process.env.JSON_WEBTOKEN || "secret";
const JSON_REFRESHED_TOKEN = process.env.JSON_WEBTOKEN || "mysecret";

let refreshTokens = [];

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id, role: user.role
    }, JSON_WEBTOKEN,
    {
      expiresIn: '7m'
    }
  )
}

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    JSON_REFRESHED_TOKEN,
    { expiresIn: '15m' }
  )
}
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await users.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid Username" })

    const isPasswordValid = await user.comparePassword({ password });
    if (!isPasswordValid) return res.status(400).json({ error: "Invalid Password" })

    const accessToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    res.json({ accessToken, refreshToken })

  } catch (err) {
    next(err);
  }

}

module.exports = login;
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const users = require('../models/userModel')

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;


let refreshTokens = [];

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id, role: user.role
    }, JWT_ACCESS_SECRET,
    {
      expiresIn: '7m'
    }
  )
}

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    JWT_REFRESH_SECRET,
    { expiresIn: '15m' }
  )
}
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await users.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid Username" })

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) return res.status(400).json({ error: "Invalid Password" })

    const accessToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    res.json({ accessToken, refreshToken })

  } catch (err) {
    console.error(err);
    next(err);
  }

}

const refresh = async (req, res, next) => {

  const { token } = req.body;

  if (!token) return res.status(400).json({ error: "Invalid Token" })
  if (!refreshTokens.includes(token)) return res.json(404).json({ error: "Invalid Refresh Token" })

  try {
    const payload = jwt.verify(token, JWT_REFRESH_SECRET);

    refreshTokens = refreshTokens.filter(t => t !== token)

    const newAccessToken = jwt.sign({ id: payload.id, role: payload.role }, JWT_ACCESS_SECRET, { expiresIn: '7m' })
    const newRefreshToken = jwt.sign({ id: payload.id }, JWT_REFRESH_SECRET, { expiresIn: '15m' })
    refreshTokens.push(newRefreshToken)
    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken })



  } catch (err) {
    next(err)
  }



}

module.exports = { login, refresh };
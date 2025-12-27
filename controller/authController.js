const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const users = require('../models/userModel')
const crypto = require('crypto')
const RefreshedToken = require('../models/refreshToken')
const { ObjectId } = require('mongodb');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;



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

const generateRefreshToken = async (userId) => {
  const token = crypto.randomBytes(64).toString('hex');
  const tokenHash = await bcrypt.hash(token, 10);
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

  await RefreshedToken.create({ userId, tokenHash, revoked: false, expiresAt })
  return token;
}
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await users.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid Username" })

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) return res.status(400).json({ error: "Invalid Password" })

    const accessToken = generateToken(user);
    const refreshToken = await generateRefreshToken(user._id);

    res.json({ accessToken, refreshToken })

  } catch (err) {
    console.error(err);
    next(err);
  }

}

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: "Token invalid" })
    const deleteToken = await RefreshedToken.find({ revoked: false })

    for (const t of deleteToken) {
      const match = await bcrypt.compare(refreshToken.trim(), t.tokenHash)
      if (match) {
        await RefreshedToken.deleteOne({ _id: new ObjectId(t._id) });
        break;
      }

    }
    res.json({ message: "Logout Successfull" })
  } catch (err) {
    next(err);
  }
}

const refresh = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) return res.status(400).json({ error: "Invalid Token" });

    const tokens = await RefreshedToken.find({ revoked: false, expiresAt: { $gt: new Date() } })
    let tokenRecord = null;

    for (const t of tokens) {
      if (await bcrypt.compare(token, t.tokenHash)) {
        tokenRecord = t;
        break;
      }
    }
    if (!tokenRecord) return res.status(401).json({ error: "Invalid or expired refresh token" });

    tokenRecord.revoked = true;
    await tokenRecord.save();


    const user = await users.findById(tokenRecord.userId)
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const newAccessToken = generateToken(user);
    const newRefreshToken = await generateRefreshToken(user._id);

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });

  } catch (err) {
    next(err);

  }
}

module.exports = { login, refresh, logout };
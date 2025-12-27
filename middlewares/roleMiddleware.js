module.exports = function roles(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(404).json({ message: "Not authorize" })
    }
    next();
  }
}
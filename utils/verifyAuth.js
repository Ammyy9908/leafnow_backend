const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
async function verifyAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Access Denied - No token provided",
      error: true,
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).json({
        message: "Access Denied - No token provided",
        error: true,
      });
    } else {
      req.user = decoded;
      next();
    }
  } catch (e) {
    return res.status(401).json({
      message: "Access Denied - Invalid token",
      error: true,
    });
  }
}
module.exports = verifyAuth;

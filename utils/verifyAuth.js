const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
async function verifyAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Access Denied - No token provided",
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).json({
        message: "Access Denied - No token provided",
      });
    } else {
      req.user = decoded;
      next();
    }
  } catch (e) {
    return res.status(401).json({
      message: "Access Denied - Invalid token",
    });
  }
}
module.exports = verifyAuth;

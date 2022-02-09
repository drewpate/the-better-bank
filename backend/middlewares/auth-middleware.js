const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

function authMiddleWare(req, res, next) {
  const token = req.header("x-auth-token");

  //Check for token
  if (!token) res.status(401).json({ msg: "no token, unauthorized" });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = authMiddleWare;

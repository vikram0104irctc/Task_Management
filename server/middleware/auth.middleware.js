require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifytoken = (req, res, next) => {
  let token = req.params.token;
  try {
    let verify = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = { verifytoken };

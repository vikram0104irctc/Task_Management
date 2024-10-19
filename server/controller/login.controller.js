const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { USERMODEL } = require("../model/user.model");

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await USERMODEL.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id, email: email },
      process.env.JWT_SECRET
    );
    return res.json({ message: "Login successful", token, email });
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { userLogin };

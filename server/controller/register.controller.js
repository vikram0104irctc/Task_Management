const argon2 = require("argon2");
const { USERMODEL } = require("../model/user.model");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let hashpassword = await argon2.hash(password);
    const user = await USERMODEL.create({
      name,
      email,
      password: hashpassword,
    });
    return res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

module.exports = { registerUser };

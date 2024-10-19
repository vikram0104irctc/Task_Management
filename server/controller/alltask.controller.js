require("dotenv").config();
const jwt = require("jsonwebtoken");
const { TASKMODEL } = require("../model/task.model");

const getTask = async (req, res) => {
  const token = req.params.token;
  try {
    let verify = jwt.verify(token, process.env.JWT_SECRET);
    let email = verify.email;
    const tasks = await TASKMODEL.find({ email: email });
    return res.status(200).json(tasks);
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { getTask };

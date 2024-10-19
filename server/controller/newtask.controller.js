const { TASKMODEL } = require("../model/task.model");

const createTask = async (req, res) => {
  const { title, description, priority, deadline, status, email } = req.body;
  try {
    const newTask = await TASKMODEL.create({
      title,
      description,
      priority,
      deadline,
      status,
      email,
    });
    return res.status(201).json(newTask);
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createTask };

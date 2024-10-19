const { TASKMODEL } = require("../model/task.model");

const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, description, priority, deadline, status, email } = req.body;
  try {
    const updatedTask = await TASKMODEL.updateOne(
      { _id: taskId },
      {
        $set: {
          title,
          description,
          priority,
          deadline,
          status,
          email,
        },
      },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.json(updatedTask);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = { updateTask };

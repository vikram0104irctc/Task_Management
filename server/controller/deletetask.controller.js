const { TASKMODEL } = require("../model/task.model");

const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await TASKMODEL.deleteOne({ _id: taskId });
    return res.status(200).json({ message: "Task deleted successfully", task });
  } catch (e) {
    return res
      .status(500)
      .json({ error: "Failed to delete task", message: e.message });
  }
};

module.exports = { deleteTask };

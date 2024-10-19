const { getTask } = require("../controller/alltask.controller");
const { deleteTask } = require("../controller/deletetask.controller");
const { updateTask } = require("../controller/edittask.controller");
const { createTask } = require("../controller/newtask.controller");
const { verifytoken } = require("../middleware/auth.middleware");

const taskRoute = require("express").Router();

taskRoute.post("/:token", verifytoken, createTask);

taskRoute.get("/:token", verifytoken, getTask);

taskRoute.put("/:id/:token", verifytoken, updateTask);

taskRoute.delete("/:id/:token", verifytoken, deleteTask);

module.exports = { taskRoute };

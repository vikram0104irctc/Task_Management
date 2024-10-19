require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { registerRoute } = require("./routes/register.route");
const { connection } = require("./config/db");
const { loginRoute } = require("./routes/login.route");
const { taskRoute } = require("./routes/task.route");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/register", registerRoute);

app.use("/api/login", loginRoute);

app.use("/api/task", taskRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
  connection;
  console.log("Connected to the database");
});

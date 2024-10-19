const registerRoute = require("express").Router();

const { registerUser } = require("../controller/register.controller");

registerRoute.post("/", registerUser);

module.exports = { registerRoute };

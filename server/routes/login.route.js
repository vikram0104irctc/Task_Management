const loginRoute = require("express").Router();

const { userLogin } = require("../controller/login.controller");

loginRoute.post("/", userLogin);

module.exports = { loginRoute };

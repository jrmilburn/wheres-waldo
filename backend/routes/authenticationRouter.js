const { Router } = require("express");
const userController = require("../controllers/userController");

const authenticationRouter = Router();

authenticationRouter.post("/register", userController.register);
authenticationRouter.post("/login", userController.login);

module.exports = authenticationRouter;
const { Router } = require("express");
const authController = require("../controllers/authController");
const validateLogin = require("../validators/authValidator");
const handleValidationErrors = require("../middlewares/errorMiddlewares/handleValidationError");
const passport = require("passport");

const authRouter = Router();

authRouter.get("/login", authController.renderLoginForm);
authRouter.post(
    "/login",
    validateLogin,
    handleValidationErrors("loginForm"),
    passport.authenticate("local", {
        failureRedirect: "/login"
    }),
    authController.login);

authRouter.post("/logout", authController.logout);

module.exports = authRouter;
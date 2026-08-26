const { Router } = require("express");

const authController = require("../controllers/authController");

const validateLogin = require("../validators/authValidator");
const verifyCsrfToken =
    require("../middlewares/securityMiddlewares/verifyCsrfToken");

const handleValidationErrors =
    require("../middlewares/errorMiddlewares/handleValidationError");

const passport = require("passport");

const authRouter = Router();

authRouter.get(
    "/login",
    authController.renderLoginForm
);

authRouter.post(
    "/login",
    verifyCsrfToken,

    validateLogin,

    handleValidationErrors("loginForm"),

    (req, res, next) => {

        passport.authenticate("local", (err, user, info) => {

            if (err) {
                return next(err);
            }

            if (!user) {

                return res.render("loginForm", {
                    errors: {
                        auth: {
                            msg: "Invalid email or password."
                        }
                    },
                    values: req.body,
                    returnTo: req.body.returnTo
                });

            }

            req.logIn(user, (err) => {

                if (err) {
                    return next(err);
                }

                return authController.login(req, res);
            });

        })(req, res, next);

    }
);

authRouter.post(
    "/logout",
    verifyCsrfToken,
    authController.logout
);

module.exports = authRouter;
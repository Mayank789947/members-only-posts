const { Router } = require("express");

const userController = require("../controllers/userController");

const validateCreateUser = require("../validators/userValidator");
const verifyCsrfToken =
    require("../middlewares/securityMiddlewares/verifyCsrfToken");

const handleValidationErrors =
    require("../middlewares/errorMiddlewares/handleValidationError");

const requireAuth =
    require("../middlewares/authMiddlewares/requireAuth");

const userRouter = Router();

userRouter.get(
    "/create",
    userController.renderSignupForm
);

userRouter.post(
    "/create",
    verifyCsrfToken,
    validateCreateUser,
    handleValidationErrors("signupForm"),
    userController.createUser
);

userRouter.get(
    "/profile",
    requireAuth,
    userController.renderProfile
);

userRouter.post(
    "/join-club",
    requireAuth,
    verifyCsrfToken,
    userController.joinClub
);

userRouter.post(
    "/leave-club",
    requireAuth,
    verifyCsrfToken,
    userController.leaveClub
);

module.exports = userRouter;
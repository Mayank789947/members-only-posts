const { Router } = require("express");

const userController = require("../controllers/userController");

const validateCreateUser = require("../validators/userValidator");

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
    userController.joinClub
);

userRouter.post(
    "/leave-club",
    requireAuth,
    userController.leaveClub
);

module.exports = userRouter;
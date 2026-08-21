const { Router } = require("express");
const userController = require("../controllers/userController");
const validateCreateUser = require("../validators/userValidator");
const handleValidationErrors = require("../middlewares/errorMiddlewares/handleValidationError");

const userRouter = Router();

userRouter.post(
    "/create",
    validateCreateUser,
    handleValidationErrors("signUp"), 
    userController.createUser);
    
userRouter.post("/join-club", userController.updateMembershipStatus);

module.exports = userRouter;
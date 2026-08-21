const { Router } = require("express");
const messageController = require("../controllers/messageController");
const validateCreateMessage = require("../validators/messageValidator");
const handleValidationErrors = require("../middlewares/errorMiddlewares/handleValidationError");

const messageRouter = Router();

messageRouter.post(
    "/create",
    validateCreateMessage,
    handleValidationErrors("newMessage"),
    messageController.createMessage);
    
messageRouter.post("/delete/:messageId", messageController.deleteMessage);

module.exports = messageRouter;
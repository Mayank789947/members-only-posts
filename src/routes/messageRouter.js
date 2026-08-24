const { Router } = require("express");
const messageController = require("../controllers/messageController");
const validateCreateMessage = require("../validators/messageValidator");
const handleValidationErrors = require("../middlewares/errorMiddlewares/handleValidationError");
const requireAuth = require("../middlewares/authMiddlewares/requireAuth");
const requireAdmin = require("../middlewares/authMiddlewares/requireAdmin");

const messageRouter = Router();

messageRouter.get(
    "/new",
    requireAuth,
    messageController.renderNewMessageForm
);

messageRouter.get(
    "/:messageId",
    messageController.getMessage
);

messageRouter.post(
    "/create",
    requireAuth,
    validateCreateMessage,
    handleValidationErrors("newMessage"),
    messageController.createMessage
);
    
messageRouter.post(
    "/delete/:messageId",
    requireAuth,
    requireAdmin,
    messageController.deleteMessage
);

module.exports = messageRouter;
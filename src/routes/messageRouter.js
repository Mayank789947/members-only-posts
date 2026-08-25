const { Router } = require("express");
const messageController = require("../controllers/messageController");
const handleValidationErrors = require("../middlewares/errorMiddlewares/handleValidationError");
const requireAuth = require("../middlewares/authMiddlewares/requireAuth");
const requireAdmin = require("../middlewares/authMiddlewares/requireAdmin");
const requireMessageOwnerOrAdmin = require("../middlewares/authMiddlewares/requireMessageOwnerOrAdmin");
const validateMessage = require("../validators/messageValidator");

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
    validateMessage,
    handleValidationErrors("newMessage"),
    messageController.createMessage
);
    
messageRouter.post(
    "/delete/:messageId",
    requireAuth,
    requireAdmin,
    messageController.deleteMessage
);

messageRouter.get(
    "/:messageId/edit",
    requireAuth,
    requireMessageOwnerOrAdmin,
    messageController.renderEditMessageForm
);

messageRouter.post(
    "/:messageId/edit",
    requireAuth,
    requireMessageOwnerOrAdmin,
    validateMessage,
    messageController.updateMessage
);

module.exports = messageRouter;
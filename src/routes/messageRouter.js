const { Router } = require("express");
const messageController = require("../controllers/messageController");
const handleValidationErrors = require("../middlewares/errorMiddlewares/handleValidationError");
const requireAuth = require("../middlewares/authMiddlewares/requireAuth");
const requireAdmin = require("../middlewares/authMiddlewares/requireAdmin");
const requireMessageOwnerOrAdmin = require("../middlewares/authMiddlewares/requireMessageOwnerOrAdmin");
const validateMessage = require("../validators/messageValidator");
const verifyCsrfToken =
    require("../middlewares/securityMiddlewares/verifyCsrfToken");

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
    verifyCsrfToken,
    validateMessage,
    handleValidationErrors("newMessage"),
    messageController.createMessage
);
    
messageRouter.post(
    "/delete/:messageId",
    requireAuth,
    verifyCsrfToken,
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
    verifyCsrfToken,
    requireMessageOwnerOrAdmin,
    validateMessage,
    messageController.updateMessage
);

module.exports = messageRouter;
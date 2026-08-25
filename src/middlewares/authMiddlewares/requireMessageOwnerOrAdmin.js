const messageModel = require("../../models/messageModel");
const NotFoundError = require("../../errors/NotFoundError");

async function requireMessageOwnerOrAdmin(req, res, next) {
    try {
        const messageId = req.params.messageId;

        const message = await messageModel.getMessageById(messageId);

        if (!message) {
            throw new NotFoundError("Message not found");
        }

        if (
            req.user.is_admin ||
            req.user.id === message.user_id
        ) {
            req.message = message;

            return next();
        }

        return res.status(403).send("You are not allowed to edit this message.");

    } catch (error) {
        next(error);
    }
}

module.exports = requireMessageOwnerOrAdmin;
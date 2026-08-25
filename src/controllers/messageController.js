const { matchedData } = require("express-validator");
const messageModel = require("../models/messageModel");
const NotFoundError = require("../errors/NotFoundError");

function renderNewMessageForm(req, res, next) {
    try {
        res.render("newMessage", {
            errors: {},
            values: {}
        });
    } catch (error) {
        next(error);
    }
}

function renderEditMessageForm(req, res, next) {
    try {
        res.render("editMessage", {
            message: req.message,
            errors: {},
            values: {
                title: req.message.title,
                message: req.message.message
            }
        });
    } catch (error) {
        next(error);
    }
}

async function createMessage(req, res, next) {
    try {
        const { title, message } = matchedData(req);

        const userId = req.user.id;

        await messageModel.createNewMessage(title, message, userId);

        return res.redirect("/");
    } catch (error) {
        next(error);
    }
}

async function getMessages(req, res, next) {
    try {
        if (
            req.user &&
            (req.user.membership_status || req.user.is_admin)
        ) {
            const messages = await messageModel.getMemberMessages();

            return res.render("homePage", {
                messages
            });
        }

        const messages = await messageModel.getPublicMessages();

        return res.render("homePage", {
            messages
        });

    } catch (error) {
        next(error);
    }
}

async function getMessage(req, res, next) {
    try {
        const messageId = req.params.messageId;

        const message = await messageModel.getMessageById(messageId);

        if (!message) {
            throw new NotFoundError("Message not found");
        }

        let access = "guest";

        if (!req.user) {
            req.session.returnTo = req.originalUrl;
        } else if (req.user.is_admin) {
            access = "admin";
        } else if (req.user.id === message.user_id) {
            access = "owner";
        } else if (req.user.membership_status) {
            access = "member";
        } else {
            access = "non-member";
        }

        return res.render("message", {
            message,
            access
        });

    } catch (error) {
        next(error);
    }
}

async function updateMessage(req, res, next) {
    try {
        const messageId = req.params.messageId;

        const { title, message } = matchedData(req);

        const updatedMessage = await messageModel.updateMessage(
            messageId,
            title,
            message
        );

        if (!updatedMessage) {
            throw new NotFoundError("Message not found");
        }

        req.session.flash = {
            type: "success",
            message: "Message updated successfully!"
        };

        return res.redirect(`/messages/${messageId}`);

    } catch (error) {
        next(error);
    }
}

async function deleteMessage(req, res, next) {
    try {
        const messageId = req.params.messageId;

        await messageModel.deleteMessage(messageId);

        req.session.flash = {
            type: "success",
            message: "Message deleted successfully!"
        };

        return res.redirect("/");
    } catch (error) {
        next(error);
    }
}

module.exports = {
    renderNewMessageForm,
    renderEditMessageForm,
    createMessage,
    getMessages,
    getMessage,
    updateMessage,
    deleteMessage
}
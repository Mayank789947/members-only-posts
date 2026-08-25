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
    createMessage,
    getMessages,
    getMessage,
    deleteMessage
}
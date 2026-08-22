const { matchedData } = require("express-validator");
const messageModel = require("../models/messageModel");

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

async function deleteMessage(req, res, next) {
    try {
        const messageId = req.params.messageId;

        await messageModel.deleteMessage(messageId);

        return res.redirect("/");
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createMessage,
    getMessages,
    deleteMessage
}
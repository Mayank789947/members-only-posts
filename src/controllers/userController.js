const { matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const NotFoundError = require("../errors/NotFoundError");

async function createUser(req, res, next) {
    try {
        const { 
            first_name,
            last_name,
            email,
            password
        } = matchedData(req);

        const username = `${first_name}.${last_name}`.toLowerCase();

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.createUser(first_name, last_name, email, username, hashedPassword);

        return res.redirect("/login");
    } catch (error) {
        next(error);
    }
}

async function updateMembershipStatus(req, res, next) {
    try {
        const userId = req.user.id;

        await userModel.updateMembershipStatus(true, userId);

        return res.redirect("/profile");
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createUser,
    updateMembershipStatus
}
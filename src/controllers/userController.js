const { matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const NotFoundError = require("../errors/NotFoundError");

function renderSignupForm(req, res, next) {
    try {
        res.render("signupForm", {
            errors: {},
            values: {}
        });
    } catch (error) {
        next(error);
    }
}

function renderProfile(req, res, next) {
    try {
        return res.render("profile", {
            user: req.user
        });
    } catch (error) {
        next(error);
    }
}

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

async function joinClub(req, res, next) {
    try {
        await userModel.updateMembershipStatus(true, req.user.id);

        return res.redirect("/users/profile");
    } catch (error) {
        next(error);
    }
}

async function leaveClub(req, res, next) {
    try {
        await userModel.updateMembershipStatus(false, req.user.id);

        return res.redirect("/users/profile");
    } catch (error) {
        next(error);
    }
}

module.exports = {
    renderSignupForm,
    renderProfile,
    createUser,
    joinClub,
    leaveClub
}
const { body } = require("express-validator");

const validateLogin = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .bail()
        .isEmail()
        .withMessage("Please provide a valid email address."),

    body("password")
        .notEmpty()
        .withMessage("Password is required.")
];

module.exports = validateLogin;
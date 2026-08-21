const { body } = require("express-validator");

const validateCreateMessage = [
    body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .bail()
    .isLength({ min: 3, max: 150 })
    .withMessage("Title must be between 3 and 150 characters."),

    body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required.")
];

module.exports = validateCreateMessage;
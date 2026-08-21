const { body } = require("express-validator");

const validateCreateUser = [
    body("first_name")
    .trim()
    .notEmpty()
    .withMessage("First Name is required.")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("First Name must be between 2 and 50 characters."),
    
    body("last_name")
    .trim()
    .notEmpty()
    .withMessage("Last Name is required.")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Last Name must be between 2 and 50 characters."),

    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .bail()
    .isLength({ max: 50 })
    .withMessage("Email must be 50 characters or fewer."),

    body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .bail()
    .isLength({ min: 8, max: 72 })
    .withMessage("Password must be between 8 and 72 characters."),

    body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required.")
    .bail()
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match.");
        }
        return true;
    })
];

module.exports = validateCreateUser;
const AppError = require("../../errors/AppError");

function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return next(new AppError("You must be logged in.", 401));
    }

    next();

}

module.exports = requireAuth;
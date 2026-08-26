const AppError = require("../../errors/AppError");

function requireAdmin(req, res, next) {
    if (!req.user.is_admin) {
        return next(new AppError("Admins only.", 403));
    }

    next();

}

module.exports = requireAdmin;
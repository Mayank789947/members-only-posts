const crypto = require("crypto");

function csrfToken(req, res, next) {
    if (!req.session.csrfToken) {
        req.session.csrfToken = crypto.randomBytes(32).toString("hex");
    }

    res.locals.csrfToken = req.session.csrfToken;

    next();
}

module.exports = csrfToken;
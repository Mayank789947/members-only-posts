function verifyCsrfToken(req, res, next) {
    const submittedToken = req.body._csrf;
    const sessionToken = req.session.csrfToken;

    if (
        !submittedToken ||
        !sessionToken ||
        submittedToken !== sessionToken
    ) {
        return res.status(403).send("Invalid CSRF token.");
    }

    next();
}

module.exports = verifyCsrfToken;
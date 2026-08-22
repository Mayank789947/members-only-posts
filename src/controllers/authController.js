function renderLoginForm(req, res, next) {
    try {
        res.render("loginForm", {
            errors: {},
            values: {}
        });
    } catch (error) {
        next(error);
    }
}

function login(req, res) {
    const returnTo = req.session.returnTo;

    delete req.session.returnTo;

    if (
        returnTo &&
        returnTo.startsWith("/") &&
        !returnTo.startsWith("//")
    ) {
        return res.redirect(returnTo);
    }

    return res.redirect("/");
}

function logout(req, res, next) {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        return res.redirect("/login");
    });
}

module.exports = {
    renderLoginForm,
    login,
    logout
}
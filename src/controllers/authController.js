function renderLoginForm(req, res, next) {
    try {
        res.render("loginForm", {
            returnTo: req.session.returnTo,
            errors: {},
            values: {}
        });
    } catch (error) {
        next(error);
    }
}

function login(req, res) {

    const returnTo = req.body.returnTo;

    req.session.flash = {
        type: "success",
        message: "Welcome back!"
    };

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

        req.session.flash = {
            type: "success",
            message: "You have been logged out."
        };

        return res.redirect("/");

    });
}

module.exports = {
    renderLoginForm,
    login,
    logout
};
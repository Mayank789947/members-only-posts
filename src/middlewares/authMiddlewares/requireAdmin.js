function requireAdmin(req, res, next) {
    if (!req.user.is_admin) {
        return res.status(403).send("Admins only.");
    }

    next();
}

module.exports = requireAdmin;
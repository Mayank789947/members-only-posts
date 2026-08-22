function requireMember(req, res, next) {
    if (!req.user.membership_status) {
        return res.status(403).send("Members only.");
    }

    next();
}

module.exports = requireMember;
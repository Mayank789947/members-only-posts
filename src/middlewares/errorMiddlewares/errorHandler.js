function errorHandler(err, req, res, next) {
    console.error(err);

    const statusCode = err.statusCode || 500;
    const status = err.status || "error";
    const message = err.message || "Internal server error";

    if (req.accepts("html")) {
        res.status(statusCode).render("errors/error", {
            statusCode,
            message
        });
    } else {
        res.status(statusCode).json({
            statusCode,
            message
        });
    }
}

module.exports = errorHandler;
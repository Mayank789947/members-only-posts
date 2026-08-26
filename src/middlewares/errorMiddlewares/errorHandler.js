function errorHandler(err, req, res, next) {
    console.error(err);

    const statusCode = err.statusCode || 500;
    const status = err.status || "error";

    const message =
        statusCode >= 500
            ? "Internal server error"
            : err.message || "An error occurred.";

    if (req.accepts("html")) {
        return res.status(statusCode).render("errors/error", {
            statusCode,
            message
        });
    }

    return res.status(statusCode).json({
        statusCode,
        message
    });
}
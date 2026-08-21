const express = require("express");
const errorHandler = require("./src/middlewares/errorMiddlewares/errorHandler");

const app = express();

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.use((req, res, next) => {
    next(new NotFoundError("Route not found"));
});

app.use(errorHandler);

module.exports = app;
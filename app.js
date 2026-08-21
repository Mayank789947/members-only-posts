const express = require("express");
const errorHandler = require("./src/middlewares/errorMiddlewares/errorHandler");
const userRouter = require("./src/routes/userRouter");
const messageRouter = require("./src/routes/messageRouter");
const messageController = require("./src/controllers/messageController");
const NotFoundError = require("./src/errors/NotFoundError");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/messages", messageRouter);

app.get("/", messageController.getMessages);

app.use((req, res, next) => {
    next(new NotFoundError("Route not found"));
});

app.use(errorHandler);

module.exports = app;
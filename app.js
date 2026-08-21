const express = require("express");
const errorHandler = require("./src/middlewares/errorMiddlewares/errorHandler");
const userRouter = require("./src/routes/userRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);

app.get("/", (req, res) => {
    res.send("Home Page");
});


app.use((req, res, next) => {
    next(new NotFoundError("Route not found"));
});

app.use(errorHandler);

module.exports = app;
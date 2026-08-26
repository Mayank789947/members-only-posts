const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const errorHandler = require("./src/middlewares/errorMiddlewares/errorHandler");
const userRouter = require("./src/routes/userRouter");
const messageRouter = require("./src/routes/messageRouter");
const messageController = require("./src/controllers/messageController");
const NotFoundError = require("./src/errors/NotFoundError");
const passport = require("passport");
const authRouter = require("./src/routes/authRouter");
require("./src/config/passport");
const path = require("path");
const flashMessage = require("./src/middlewares/flashMessage");
const pool = require("./src/db/pool");
const csrfToken = require("./src/middlewares/securityMiddlewares/csrf");

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: "session"
    }),
    name: "members_session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    }
}));

app.use(csrfToken);
app.use(flashMessage);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.user = req.user;
    next();
});

app.use(authRouter);
app.use("/users", userRouter);
app.use("/messages", messageRouter);

app.get("/", messageController.getMessages);

app.use((req, res, next) => {
    next(new NotFoundError("Route not found"));
});

app.use(errorHandler);

module.exports = app;
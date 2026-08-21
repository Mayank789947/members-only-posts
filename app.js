const express = require("express");
const pool = require("./src/db/pool");

const app = express();

app.get("/", (req, res) => {
    res.send("Home Page");
});

module.exports = app;
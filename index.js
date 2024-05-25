const express = require("express");
const path = require("path");
const fs = require("fs");
const config = require("./config.json");
const eurix = require("./Lorenzo.js");

const app = express();
const port = config.port;


app.get("/", async function (_, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
    console.log(`Bot is running on port ${port}`);
});
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "../client/build/")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, `../client/build/index.html`));
});

const PORT = process.env.CLIENT_PORT || 4000;

module.exports = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

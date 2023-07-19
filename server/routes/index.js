const express = require("express");
const router = express.Router();

const test = require("./test.route");

console.log("indexFile.js");
router.use("/test",test);

module.exports = router;

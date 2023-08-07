const express = require("express");
const router = express.Router();
const controller = require("../controllers/ticket.controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post(
  "/create",
  //   upload.fields([
  //     { name: "file" },
  //     { name: "eventName" },
  //     { name: "date" },
  //     { name: "numberOfTickets" },
  //     { name: "location" },
  //     { name: "siteUrl" },
  //     { name: "QR" },
  //   ]),
  upload.single("file"),
  controller.createTicket
);

module.exports = router;

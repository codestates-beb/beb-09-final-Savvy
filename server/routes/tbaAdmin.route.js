const express = require('express');
const router = express.Router();
const controller = require('../controllers/tbaAdmin.controller');

router.get('/', controller.tbaAdmin);

module.exports = router;

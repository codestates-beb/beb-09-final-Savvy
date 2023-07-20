const express = require('express');
const router = express.Router();
const controller = require('../controllers/information.controller');

router.get('/', controller.information);

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers/manager.controller');

router.get('/', controller.manager);

module.exports = router;

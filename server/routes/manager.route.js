const express = require('express');
const router = express.Router();
const controller = require('../controllers/manager.controller');

router.post('/community', controller.community);

module.exports = router;

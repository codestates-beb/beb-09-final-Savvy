const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

router.get('/', controller.user);

module.exports = router;
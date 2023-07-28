const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin.controller');

router.post('/login', controller.login);
router.get('/community', controller.getCommunity);

module.exports = router;

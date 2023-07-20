const express = require('express');
const router = express.Router();
const controller = require('../controllers/airdrop.controller');

router.get('/', controller.airdrop);

module.exports = router;

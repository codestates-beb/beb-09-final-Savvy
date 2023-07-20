const express = require('express');
const router = express.Router();
const controller = require('../controllers/contract.controller');

router.get('/', controller.contract);

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers/dashboard.controller');

router.get('/:communityAddress', controller.dashboard);

module.exports = router;

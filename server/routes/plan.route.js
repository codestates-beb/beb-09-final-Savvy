const express = require('express');
const router = express.Router();
const controller = require('../controllers/plan.controller');

router.put('/', controller.updatePlan);

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers/manager.controller');

router.get('/', controller.getManager);
router.get('/:communityAddress', controller.getCommunity);
router.post('/community', controller.community);

module.exports = router;

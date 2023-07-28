const express = require('express');
const router = express.Router();
const controller = require('../controllers/manager.controller');

router.post('/community/create', controller.createCommunity);
router.put('/community/update', controller.updateCommunity);
router.get('/', controller.getManager);
router.get('/:communityAddress', controller.getCommunity);
router.delete('/:communityAddress', controller.deleteCommunity);

module.exports = router;

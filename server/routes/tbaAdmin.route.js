const express = require('express');
const router = express.Router();
const controller = require('../controllers/tbaAdmin.controller');

router.get('/:communityAddress', controller.getTbaByAddress);
router.get('/detail/:tbaId', controller.getTbaDetail);
router.post('/createGroup', controller.createGroup);
router.get('/group/:groupName', controller.getGroupTBA);

module.exports = router;

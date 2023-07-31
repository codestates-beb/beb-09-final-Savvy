const express = require('express');
const router = express.Router();
const controller = require('../controllers/tbaAdmin.controller');

router.get('/:communityAddress', controller.getTbaByAddress);
router.get('/detail/:tbaId', controller.getTbaDetail);
router.post('/createGroup', controller.createGroup);
router.put('/updateGroup', controller.updateGroup);
router.get('/group/allGroups/:communityAddress', controller.getAllGroups);
router.get('/group/:groupId', controller.getGroupTBA);
router.delete('/group/:groupId', controller.deleteGroup);

module.exports = router;

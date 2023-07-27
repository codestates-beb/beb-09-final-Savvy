const express = require('express');
const router = express.Router();
const controller = require('../controllers/contract.controller');

router.post('/create', controller.createContract);
router.get('/', controller.getContract);
router.get('/:contractAddress', controller.getContractByAddress);
router.put('/update', controller.updateContract);

module.exports = router;

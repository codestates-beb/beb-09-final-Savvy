const express = require('express');
const router = express.Router();
const controller = require('../controllers/contract.controller');

router.get('/', controller.getContract);
router.get('/:address', controller.getContractByAddress);
router.post('/create', controller.contract);

module.exports = router;

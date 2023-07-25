const express = require('express');
const router = express.Router();
const controller = require('../controllers/tbaAdmin.controller');

router.get('/:nftContract', controller.getTbaByAddress);
router.get('/:tba', controller.getTbaDetail);

module.exports = router;

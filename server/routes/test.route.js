const express = require('express');
const router = express.Router();

const { registTestData } = require('../controllers/test.controller');

router.post('/regist-data', registTestData);

module.exports = router;

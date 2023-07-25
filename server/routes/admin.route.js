const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin.controller');

//router.post('/login', controller.login);
router.post('/login', controller.signup);
router.post('/signup', controller.signup);

module.exports = router;

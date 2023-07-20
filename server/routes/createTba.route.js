const express = require('express');
const router = express.Router();
const controller = require('../controllers/createTba.controller');

router.get('/', controller.createTba);

module.exports = router;

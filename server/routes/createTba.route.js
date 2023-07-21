const express = require('express');
const router = express.Router();
const controller = require('../controllers/createTba.controller');

router.post('/', controller.createTba);

module.exports = router;

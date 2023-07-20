const express = require('express');
const router = express.Router();

const test = require('./test.route');

const user = require('./user.route');
const information = require('./information.route');
const createTba = require('./createTba.route');
const dashboard = require('./dashboard.route');
const tbaAdmin = require('./tbaAdmin.route');
const contract = require('./contract.route');
const airdrop = require('./airdrop.route');
const manager = require('./manager.route');

//console.log("indexFile.js");
//router.use("/test",test);

router.use('/user', user);
router.use('/information', information);
router.use('/createTba', createTba);
router.use('/dashboard', dashboard);
router.use('/tbaAdmin', tbaAdmin);
router.use('/contract', contract);
router.use('/airdrop', airdrop);
router.use('/manager', manager);

module.exports = router;

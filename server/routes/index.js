const express = require('express');
const router = express.Router();

const admin = require('./admin.route');
const createTba = require('./createTba.route');
const dashboard = require('./dashboard.route');
const tbaAdmin = require('./tbaAdmin.route');
const contract = require('./contract.route');
const manager = require('./manager.route');
const plan = require('./plan.route');
const ticket = require('./ticket.route');

//console.log("indexFile.js");
//router.use("/test",test);

router.use('/admin', admin);
router.use('/createTba', createTba);
router.use('/manager', manager);
router.use('/dashboard', dashboard);
router.use('/contract', contract);
router.use('/tbaAdmin', tbaAdmin);
router.use('/plan', plan);
router.use('/ticket', ticket);

module.exports = router;

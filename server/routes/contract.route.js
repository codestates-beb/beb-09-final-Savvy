const express = require('express');
const router = express.Router();
const controller = require('../controllers/contract.controller');

router.post('/create', controller.createContract, async (req, res) => {
  //	#swagger.description = 'create contract'
  //	#swagger.tags = ['Contract']
  /*  #swagger.parameters[''] = {
		
		} */
  /* #swagger.security = [{
				}] */
  /*  #swagger.responses[200] = {
							description: 'created new contract data',
							schema: {
									message: 'created new contract data'
							}
			} */
  /*  #swagger.responses[400] = {
							description: 'Contract already exists',
							schema: {
									error: 'Contract already exists'
							}
			} */
  /*  #swagger.responses[404] = {
							description: 'Community does not exist',
							schema: {
									error: 'Community does not exist'
							}
			} */
  /*  #swagger.responses[500] = {
							description: 'Internal Server Error',
							schema: {
									error: 'Internal Server Error'
							}
			} */
});

router.get('/', controller.getContract, async (req, res) => {
  //	#swagger.description = 'get contract'
  //	#swagger.tags = ['Contract']
  /*  #swagger.parameters[''] = {
			
		} */
  /* #swagger.security = [{
				}] */
  /*  #swagger.responses[200] = {
							description: 'get contract',
							schema: {
										message: 'get contract'
							}
			} */
  /*  #swagger.responses[500] = {	
								description: 'Internal Server Error',
								schema: {
										error: 'Internal Server Error'
								}
			} */
});

router.get('/:contractAddress', controller.getContractByAddress, async (req, res) => {
  //	#swagger.description = 'get contract by address'
  //	#swagger.tags = ['Contract']
  /*  #swagger.parameters[''] = {
		
		} */
  /* #swagger.security = [{
				}] */
  /*  #swagger.responses[200] = {
							description: 'get contract by address',
							schema: {
									message: 'get contract by address'
							}
			} */
  /*  #swagger.responses[404] = {
							description: 'No contracts found',
							schema: {
									error: 'No contracts foundt'
							}
			} */
  /*  #swagger.responses[500] = {
							description: 'Internal Server Error',
							schema: {
									error: 'Internal Server Error'
							}
			} */
});
router.put('/update', controller.updateContract, async (req, res) => {
  //	#swagger.description = 'update contract'
  //	#swagger.tags = ['Contract']
  /*  #swagger.parameters[''] = {
		
		} */
  /* #swagger.security = [{
				}] */
  /*  #swagger.responses[200] = {
							description: 'updated contract data',
							schema: {
									message: 'updated contract data'
							}
			} */
  /*  #swagger.responses[404] = {
							description: 'Contract does not exist',
							schema: {
									error: 'Contract does not exist'
							}
			} */
  /*  #swagger.responses[500] = {
							description: 'Internal Server Error',
							schema: {
									error: 'Internal Server Error'
							}
			} */
});

router.delete('/:contractAddress', controller.deleteContract, async (req, res) => {
  //	#swagger.description = 'delete contrac'
  //	#swagger.tags = ['Contract']
  /*  #swagger.parameters[''] = {
		
		} */
  /* #swagger.security = [{
				}] */
  /*  #swagger.responses[200] = {
							description: 'deleted contract',
							schema: {
									message: 'deleted contract'
							}
			} */
  /*  #swagger.responses[404] = {
							description: 'No contracts found',
							schema: {
									error: 'No contracts found'
							}
			} */
  /*  #swagger.responses[500] = {
							description: 'Internal Server Error',
							schema: {
									error: 'Internal Server Error'
							}
			} */
});

module.exports = router;

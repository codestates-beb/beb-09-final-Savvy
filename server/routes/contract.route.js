const express = require('express');
const router = express.Router();
const controller = require('../controllers/contract.controller');

router.post('/create', controller.createContract, async (req, res) => {
  //	#swagger.description = 'create contract'
  //	#swagger.tags = ['Contract']
  /* #swagger.requestBody = {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              communityAddress: {
                type: 'string',
                example: '0xADD22a3efa6f22dd60DF65CDfE096da0366eE002'
              },
              ercType: {
                type: 'string',
                example: 'ERC721'
              },
							contractAddress: {
                type: 'string',
                example: '0x79c59Cf4fd46669145D7DBaB35f4DDC18BED72C0'
              },
              contractName: {
                type: 'string',
                example: 'Event'
              }
            }
          }
        }
      }
    } */
  /*  #swagger.responses[200] = {
							description: 'created new contract data',
							schema: {
									message: 'created new contract data',
									ContractData: {
											id: "64d1a3d7a24845dcd8d2ad14",
											ercType: "ERC721",
											contractAddress: "0x79c59Cf4fd46669145D7DBaB35f4DDC18BED72C0",
											contractName: "Event",
											community_id: "64d1a067c37a2d8603bb4588"
                  }
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

router.put('/update', controller.updateContract, async (req, res) => {
  //	#swagger.description = 'update contract'
  //	#swagger.tags = ['Contract']
  /* #swagger.requestBody = {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: '64d1a44880b3bac1c539f9ef'
              },
              ercType: {
                type: 'string',
                example: 'ERC721'
              },
              contractName: {
                type: 'string',
                example: 'Event 2nd'
              }
            }
          }
        }
      }
    } */
  /*  #swagger.responses[200] = {
							description: 'updated contract data',
							schema: {
									message: 'updated contract data',
									ContractData: {
											id: "64d1a3d7a24845dcd8d2ad14",
											ercType: "ERC721",
											contractAddress: "0x79c59Cf4fd46669145D7DBaB35f4DDC18BED72C0",
											contractName: "Event 2nd",
                  }
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

router.get('/', controller.getContract, async (req, res) => {
  //	#swagger.description = 'get contract'
  //	#swagger.tags = ['Contract']
  /*  #swagger.security = [{
      "bearerAuth": []
  }] */
  /*  #swagger.responses[200] = {
							description: 'get contract',
							schema: {
										message: 'get contract',
										"ContractData": [
												{
													"_id": "64d1a44880b3bac1c539f9ef",
													"address": "0x79c59Cf4fd46669145D7DBaB35f4DDC18BED72C0",
													"type": "ERC721",
													"alias": "Event 2nd",
													"community_id": "64d1a067c37a2d8603bb4588",
													"_somethingElse": 0
												}
										]
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
  /* #swagger.parameters['contractAddress'] = {
      required: true,
      type: 'string',
			example: '0x79c59Cf4fd46669145D7DBaB35f4DDC18BED72C0'
    } */
  /*  #swagger.responses[200] = {
							description: 'get contract by address',
							schema: {
									message: 'get contract by address',
									ContractData: {
											_id: "64d1a44880b3bac1c539f9ef",
											address: "0x79c59Cf4fd46669145D7DBaB35f4DDC18BED72C0",
											type: "ERC721",
											alias: "Event 2nd",
											community_id: "64d1a067c37a2d8603bb4588",
											_somethingElse: 0
									}
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

router.delete('/:contractAddress', controller.deleteContract, async (req, res) => {
  //	#swagger.description = 'delete contract'
  //	#swagger.tags = ['Contract']
  /* #swagger.parameters['contractAddress'] = {
      required: true,
      type: 'string',
			example: '0x79c59Cf4fd46669145D7DBaB35f4DDC18BED72C0'
    } */
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

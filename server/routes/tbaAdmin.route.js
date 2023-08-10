const express = require('express');
const router = express.Router();
const controller = require('../controllers/tbaAdmin.controller');

router.post('/createGroup', controller.createGroup, async (req, res) => {
  //	#swagger.description = 'create group'
  //	#swagger.tags = ['TbaAdmin']
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
              groupName: {
                type: 'string',
                example: 'test1'
              },
              tbaIds: {
                type: 'array',
                example: [
										"64d1a06fc37a2d8603bb458a",
										"64d1a06fc37a2d8603bb458e",
										"64d1a06fc37a2d8603bb458c"
								]
              }
            }
          }
        }
      }
    } */
  /*  #swagger.responses[200] = {
						description: 'Successfully created TBA groups',
						schema: {
								message: 'Successfully created TBA groups',
								id: "64d1bfc191ccbfb961830a57",
								name: "test1",
								tbaIds: [
									"64d1a06fc37a2d8603bb458a",
									"64d1a06fc37a2d8603bb458e",
									"64d1a06fc37a2d8603bb458c"
								]
						}	
		} */
  /*  #swagger.responses[400] = {
						description: 'Group name already exists',
						schema: {
								error: 'Group name already exists'
						}
			} */
  /*  #swagger.responses[500] = {
						description: 'Internal Server Error',
						schema: {
								error: 'Internal Server Error'
						}
			} */
});

router.put('/updateGroup', controller.updateGroup, async (req, res) => {
  //	#swagger.description = 'update group'
  //	#swagger.tags = ['TbaAdmin']
  /* #swagger.requestBody = {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: '64d1c36f501a3e0190f8d4d1'
              },
              groupName: {
                type: 'string',
                example: 'test2'
              },
              tbaIds: {
                type: 'array',
                example: [
										"64d1a06fc37a2d8603bb458a",
										"64d1a06fc37a2d8603bb458e",
										"64d1a06fc37a2d8603bb458c"
								]
              }
            }
          }
        }
      }
    } */
  /*  #swagger.responses[200] = {							
						description: 'Successfully updated TBA groups',
						schema: {		
								message: 'Successfully updated TBA groups',
								id: "64d1c041490a29427d1d9732",
								name: "test2",
								tbaIds: [
									"64d1a06fc37a2d8603bb458a",
									"64d1a06fc37a2d8603bb458e",
									"64d1a06fc37a2d8603bb458c"
								]
						}
			} */
  /*  #swagger.responses[400] = {
						description: 'Group does not exist',
						schema: {
								error: 'Group does not exist'
						}
			} */
  /*  #swagger.responses[500] = {
						description: 'Internal Server Error',
						schema: {
								error: 'Internal Server Error'
						}
			} */
});

router.get(
  '/group/allGroups/:communityAddress',
  controller.getAllGroups,
  async (req, res) => {
    //	#swagger.description = 'get all groups by community address'
    //	#swagger.tags = ['TbaAdmin']
    /* #swagger.parameters['communityAddress'] = {
      required: true,
      type: 'string',
			example: '0xADD22a3efa6f22dd60DF65CDfE096da0366eE002'
    } */
    /*  #swagger.responses[200] = {
						description: 'Successfully fetched all groups',
						schema: {
								message: 'Successfully fetched all groups',
								"groups": [
										{
											"id": "64d1c36f501a3e0190f8d4d1",
											"name": "test2",
											"TBAs": [
												{
													"_id": "64d1a06fc37a2d8603bb458a",
													"address": "0xFA4BbB1dfBFf505443B3e620eb5B132C2130fc05",
													"owner": "0x79EF3DA763754387F06022Cf66c2668854B3389B",
													"level": "0",
													"ethBalance": "0.0",
													"tokenURI": "https://api.metacat.world/api/v1/get_bip_info/141",
													"community_id": "64d1a067c37a2d8603bb4588",
													"createdAt": "2023-08-08T01:54:55.635Z",
													"updatedAt": "2023-08-08T01:54:55.635Z",
													"__v": 0
												},
											]
										}
									]
								}
								} */
    /*  #swagger.responses[404] = {
						description: 'No groups found',
						schema: {
								error: 'No groups found'
						}
				} */
    /*  #swagger.responses[500] = {
						description: 'Internal Server Error',
						schema: {
								error: 'Internal Server Error'
						}
				} */
  }
);

router.get('/group/:groupId', controller.getGroupTBA, async (req, res) => {
  //	#swagger.description = 'get group tba'
  //	#swagger.tags = ['TbaAdmin']
  /* #swagger.parameters['groupId'] = {
      required: true,
      type: 'string',
			example: '64d1c36f501a3e0190f8d4d1'
    } */
  /*  #swagger.responses[200] = {
						description: 'Successfully fetched group tba',
						schema: {								
								message: 'Successfully fetched group tba',
								"groups": [
										{
											"id": "64d1c36f501a3e0190f8d4d1",
											"name": "test2",
											"TBAs": [
												{
													"_id": "64d1a06fc37a2d8603bb458a",
													"address": "0xFA4BbB1dfBFf505443B3e620eb5B132C2130fc05",
													"owner": "0x79EF3DA763754387F06022Cf66c2668854B3389B",
													"level": "0",
													"ethBalance": "0.0",
													"tokenURI": "https://api.metacat.world/api/v1/get_bip_info/141",
													"community_id": "64d1a067c37a2d8603bb4588",
													"createdAt": "2023-08-08T01:54:55.635Z",
													"updatedAt": "2023-08-08T01:54:55.635Z",
													"__v": 0
												},
											]
										}
									]
						}
			} */
  /*  #swagger.responses[400] = {
						description: 'No community found',
						schema: {
								error: 'No community found'
						}
			} */
  /*  #swagger.responses[404] = {
						description: 'No group tba found',
						schema: {
								error: 'No group tba found'
						}
			} */
  /*  #swagger.responses[500] = {
						description: 'Internal Server Error',
						schema: {								
								error: 'Internal Server Error'
						}
			} */
});

router.delete('/group/:groupId', controller.deleteGroup, async (req, res) => {
  //	#swagger.description = 'delete group'
  //	#swagger.tags = ['TbaAdmin']
  /* #swagger.parameters['groupId'] = {
      required: true,
      type: 'string',
			example: '64d1c36f501a3e0190f8d4d1'
    } */
  /*  #swagger.responses[200] = {
						
						description: 'Successfully deleted group',
						schema: {
								message: 'Successfully deleted group',
						}
			} */
  /*  #swagger.responses[404] = {
						description: 'No group found',
						schema: {
								error: 'No group found'
						}
			} */
  /*  #swagger.responses[500] = {
						description: 'Internal Server Error',
						schema: {		
								error: 'Internal Server Error'
						}
			} */
});

router.get('/:communityAddress', controller.getTbaByAddress, async (req, res) => {
  //	#swagger.description = 'get tba by address'
  //	#swagger.tags = ['TbaAdmin']
  /* #swagger.parameters['communityAddress'] = {
      required: true,
      type: 'string',
			example: '0xADD22a3efa6f22dd60DF65CDfE096da0366eE002'
    } */
  /*  #swagger.responses[200] = {
						description: 'Successfully TBAs of communityAddress',
						schema: {
								message: 'Successfully TBAs of communityAddress',
								"TBAs": [
										{
											"_id": "64d1a06fc37a2d8603bb458a",
											"address": "0xFA4BbB1dfBFf505443B3e620eb5B132C2130fc05",
											"owner": "0x79EF3DA763754387F06022Cf66c2668854B3389B",
											"level": "0",
											"ethBalance": "0.0",
											"tokenURI": "https://api.metacat.world/api/v1/get_bip_info/141",
											"community_id": "64d1a067c37a2d8603bb4588",
											"createdAt": "2023-08-08T01:54:55.635Z",
											"updatedAt": "2023-08-08T01:54:55.635Z",
											"__v": 0
										},
								]
						}
			} */
  /*  #swagger.responses[404] = {
						description: 'No TBAs found for this community',
						schema: {
								error: 'No TBAs found for this community'
						}		
			} */
  /*  #swagger.responses[500] = {
						description: 'Internal Server Error',
						schema: {													
								error: 'Internal Server Error'
						}
			} */
});

router.get('/detail/:tbaId', controller.getTbaDetail, async (req, res) => {
  //	#swagger.description = 'get tba detail'
  //	#swagger.tags = ['TbaAdmin']
  /* #swagger.parameters['tbaId'] = {
      required: true,
      type: 'string',
			example: '64d1a06fc37a2d8603bb458a'
    } */
  /*  #swagger.responses[200] = {
						
						description: 'Successfully fetched TBA detail',
						schema: {
								message: 'Successfully fetched TBA detail',
										"TBA": {
												"_id": "64d1a06fc37a2d8603bb458a",
												"address": "0xFA4BbB1dfBFf505443B3e620eb5B132C2130fc05",
												"owner": "0x79EF3DA763754387F06022Cf66c2668854B3389B",
												"level": "0",
												"ethBalance": "0.0",
												"tokenURI": "https://api.metacat.world/api/v1/get_bip_info/141",
												"community_id": "64d1a067c37a2d8603bb4588",
												"createdAt": "2023-08-08T01:54:55.635Z",
												"updatedAt": "2023-08-08T01:54:55.635Z",
												"__v": 0
											},
											"items": [
													{
															"_id": "64c1b8e37ce0f68e78a006ab",
															"type": "ERC721",
															"address": "0xADD22a3efa6f22dd60DF65CDfE096da0366eE002",
															"tokenId": "88",
															"tokenAmount": "",
															"Tba_id": "64c1b8e37ce0f68e78a0069e",
															"_somethingElse": 0
													}
											]
								}
	} */
  /*  #swagger.responses[404] = {
						description: 'No TBA',
						schema: {	
								error: 'No TBA'
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

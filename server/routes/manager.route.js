const express = require('express');
const router = express.Router();
const controller = require('../controllers/manager.controller');

router.post('/community/create', controller.createCommunity, async (req, res) => {
  //  #swagger.description = 'create community'
  //  #swagger.tags = ['Manager']
  /*  #swagger.security = [{
      "bearerAuth": []
  }] */
  /* #swagger.requestBody = {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              address: {
                type: 'string',
                example: '0xADD22a3efa6f22dd60DF65CDfE096da0366eE002'
              },
              type: {
                type: 'string',
                example: 'main'
              },
              communityName: {
                type: 'string',
                example: 'Savvy 2nd community'
              }
            }
          }
        }
      }
    } */
  /*  #swagger.responses[200] = {
					description: 'created new community data',
					schema: {
							message: 'created new community data',
							CommunityData: {
										id: '64d196dfd8e0c2201ff9faab',
										type: 'main',
										communityAddress: '0xADD22a3efa6f22dd60DF65CDfE096da0366eE002',
										communityName: 'Savvy 2nd community',
										createAt: '2023-08-03T07:47:18.056Z',
									}
					}
			} */
  /*  #swagger.responses[400] = {
					description: 'You can create only one community in basic plan',
					schema: {
							message: 'You can create only one community in basic plan'
					}
			} */
  /*  #swagger.responses[402] = {
					description: 'You can create only three communities in plus plan',
					schema: {
							message: 'You can create only three communities in plus plan'
					}
			} */
  /*  #swagger.responses[404] = {
					description: 'Community already exists',
					schema: {
							message: 'Community already exists'
					}
			} */
  /*  #swagger.responses[500] = {
					description: 'Internal Server Error',
					schema: {
							error: 'Internal Server Error'
					}
			} */
});

router.put('/community/update', controller.updateCommunity, async (req, res) => {
  //	#swagger.description = 'update community'
  //	#swagger.tags = ['Manager']
  /* #swagger.requestBody = {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: '64d196dfd8e0c2201ff9faab'
              },
              type: {
                type: 'string',
                example: 'sub'
              },
              communityName: {
                type: 'string',
                example: 'Savvy 2nd community'
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
									CommunityData: {
										id: '64d196dfd8e0c2201ff9faab',
										type: 'sub',
										communityAddress: '0xADD22a3efa6f22dd60DF65CDfE096da0366eE002',
										communityName: 'Savvy 2nd community',
										createAt: '2023-08-03T07:47:18.056Z',
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

router.get('/', controller.getManager, async (req, res) => {
  //	#swagger.description = 'get manager'
  //	#swagger.tags = ['Manager']
  /*  #swagger.security = [{
      "bearerAuth": []
  }] */
  /*  #swagger.responses[200] = {
							description: 'get manager data',
							schema: {
									message: 'get manager data',
									admin: {
											_id: "64cb5a7bd25c4e600dccea5c",
											address: "0xf05Fc7E8b21bE1133c0Ccae63eb6ebCdDF4e5F78",
											ethBalance: "0.491076968235128108",
											chainId: 11155111,
											email: "sjlee80@gmail.com",
											name: "이상준",
											profileImage: "https://lh3.googleusercontent.com/a/AAcHTteUzkPkbNWjxw4M6EzVs72GHuq7LWGFQyJL6iWT0gH5=s96-c",
											appPubKey: "03757c7b4796e8f42b02796607b5ee2ad23c6beb9a28e951777ac4349915b95aa2",
											plan: "plus",
											createdAt: "2023-08-03T07:42:51.127Z",
											_somethingElse: 0
									},
									communities: [
											{
												_id: "64cb5b86d25c4e600dccea92",
												address: "0x7c01Eaa85063Aa3a310E49D6b80aC02a1532d16F",
												type: "main",
												alias: "Savvy 2nd community",
												admin_id: "64cb5a7bd25c4e600dccea5c",
												createdAt: "2023-08-03T07:47:18.056Z",
												_somethingElse: 0
											}
									],
										items: {
											nfts: [
												{
													type: "ERC721",
													address: "0x082f1e6b323fdad28cdbbdd192c3cb3eac89d0b8",
													name: "Savvy NFT",
													symbol: "SFT",
													tokenId: "13",
													tokenURI: "'test'",
													contractAddress: "0x082f1e6b323fdad28cdbbdd192c3cb3eac89d0b8"
												}
											],
											tokens: [
												{
													type: "ERC20",
													address: "0x2f3db557bfb47b763a4f60814030df1438135ebe",
													tokenName: "Savvy",
													tokenSymbol: "SVY",
													tokenAmount: "10000.00000000000000998"
												}
											]
										}
							}
			} */
  /*  #swagger.responses[500] = {
							description: 'Internal Server Error',
							schema: {
									error: 'Internal Server Error'
							}
					} */
});

router.get('/:communityAddress', controller.getCommunity, async (req, res) => {
  //	#swagger.description = 'get community data'
  //	#swagger.tags = ['Manager']
  /* #swagger.parameters['communityAddress'] = {
      required: true,
      type: 'string',
			example: '0xADD22a3efa6f22dd60DF65CDfE096da0366eE002'
    } */
  /*  #swagger.responses[200] = {
							description: 'get community data',
							schema: {
									message: 'get community data',
									community: {
										_id: "64d19dce3525696bff82bb95",
										address: "0xADD22a3efa6f22dd60DF65CDfE096da0366eE002",
										type: "main",
										alias: "Savvy 2nd community",
										admin_id: "64cb5a7bd25c4e600dccea5c",
										createdAt: "2023-08-08T01:43:42.252Z",
										_somethingElse: 0
									},
									tba: [
										{
											_id: "64d19dd63525696bff82bb97",
											address: "0x0b864380E5e907f32a188760216f789f8a13562f",
											owner: "0x79EF3DA763754387F06022Cf66c2668854B3389B",
											level: "0",
											ethBalance: "0.0",
											tokenURI: "https://api.metacat.world/api/v1/get_bip_info/140",
											community_id: "64d19dce3525696bff82bb95",
											createdAt: "2023-08-08T01:43:50.782Z",
											updatedAt: "2023-08-08T01:43:50.782Z",
											__v: 0
										},
									],
							}
					} */
  /*  #swagger.responses[500] = {
							description: 'Internal Server Error',
							schema: {
									error: 'Internal Server Error'
							}
					} */
});

router.delete('/:communityAddress', controller.deleteCommunity, async (req, res) => {
  //	#swagger.description = 'delete community'
  //	#swagger.tags = ['Manager']
  /*  #swagger.security = [{
      "bearerAuth": []
  }] */
  /* #swagger.parameters['communityAddress'] = {
      required: true,
      type: 'string',
			example: '0xADD22a3efa6f22dd60DF65CDfE096da0366eE002'
    } */
  /*  #swagger.responses[200] = {
									description: 'Successfully deleted Community and tba, tba_group, and Items',
									schema: {
											message: 'Successfully deleted Community and tba, tba_group, and Items',
											}
											} */
  /*  #swagger.responses[404] = {
									description: 'Community not found',
									schema: {

											error: 'Community not found'
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

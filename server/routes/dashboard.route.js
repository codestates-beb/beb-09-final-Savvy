const express = require('express');
const router = express.Router();
const controller = require('../controllers/dashboard.controller');

router.get('/:communityAddress', controller.dashboard, async (req, res) => {
  //	#swagger.description = 'get dashboard'
  //	#swagger.tags = ['Dashboard']
  /* #swagger.parameters['communityAddress'] = {
      required: true,
      type: 'string',
			example: '0xADD22a3efa6f22dd60DF65CDfE096da0366eE002'
    } */
  /*  #swagger.responses[200] = {
						description: 'Successfully fetched TBAs',
						schema: {
								message: 'Successfully fetched TBAs',
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
									items: [
										{
												"_id": "64c1b1217d24bcbd7faa5390",
												"type": "ERC721",
												"address": "0xADD22a3efa6f22dd60DF65CDfE096da0366eE002",
												"tokenId": "56",
												"tokenAmount": "",
												"Tba_id": "64c1b1217d24bcbd7faa537a",
												"_somethingElse": 0
										},
									]
						}
				} */
  /*  #swagger.responses[400] = {
						description: 'No community found for this community',
						schema: {
								error: 'No community found for this community'
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

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin.controller');
const { schema } = require('../models/community.model');

router.post('/login', controller.login, async (req, res) => {
  //  #swagger.description = 'login'
  //  #swagger.tags = ['Admin']
  /* #swagger.security = [{
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
                example: '0xf05Fc7E8b21bE1133c0Ccae63eb6ebCdDF4e5F78'
              },
              balance: {
                type: 'string',
                example: '0x00'
              },
              chainId: {
                type: 'string',
                example: '11155111'
              },
							email: {
                type: 'string',
                example: 'sjlee80@gmail.com'
              },
							name: {
                type: 'string',
                example: '이상준'
              },
							profileImage: {
                type: 'string',
                example: 'https://lh3.googleusercontent.com/a/AAcHTteUzkPkbNWjxw4M6EzVs72GHuq7LWGFQyJL6iWT0gH5=s96-c'
              },
							appPubKey: {
                type: 'string',
                example: '03757c7b4796e8f42b02796607b5ee2ad23c6beb9a28e951777ac4349915b95aa2'
              },
            }
          }
        }
      }
    } */
  /*  #swagger.responses[200] = {
              description: 'Verification successful and user exists',
              schema: {
                  message: 'Verification successful. Welcome, new user!'
              }
  } */
  /*  #swagger.responses[201] = {
              description: 'Verification successful. Welcome, new user',
              schema: {
                  message: 'Verification successful. Welcome, new user!'
              }
  } */
  /*  #swagger.responses[400] = {
              description: 'Verification Failed',
              schema: {
                  error: 'Verification Failed'
              }
  } */
  /*  #swagger.responses[500] = {
              description: 'Internal Server Error',
              schema: {
                  error: 'Internal Server Error'
              }
  } */
});

router.get('/community', controller.getCommunity, async (req, res) => {
  //  #swagger.description = 'get community'
  //  #swagger.tags = ['Admin']
  /* #swagger.security = [{
              "bearerAuth": []
        }] */
  /*  #swagger.responses[200] = {
              description: 'get community data',
              schema: {
                  message: 'get community data',
                  community: {
        							type: 'object',
            					properties: {
                					_id: "64cb5b86d25c4e600dccea92",
                					address: "0x7c01Eaa85063Aa3a310E49D6b80aC02a1532d16F",
                					type: "main",
                					alias: "test 1",
                					admin_id: "64cb5a7bd25c4e600dccea5c",
                					createdAt: "2023-08-03T07:47:18.056Z",
                					_somethingElse: 0,
            					}
              		}
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

module.exports = router;

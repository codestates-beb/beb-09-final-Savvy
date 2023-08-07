const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin.controller');

router.post('/login', controller.login, async (req, res) => {
  //  #swagger.description = 'login'
  //  #swagger.tags = ['Admin']
  /*  #swagger.parameters[''] = {
                  in: 'body',
                  schema: {
											address: '0xf05Fc7E8b21bE1133c0Ccae63eb6ebCdDF4e5F78',
											balance:  { type: 'BigNumber', hex: '0x06eff3c47bdda1dc' },
											chainId: '11155111',
											email: 'sjlee80@gmail.com',
											name: '이상준',
											profileImage: 'https://lh3.googleusercontent.com/a/AAcHTteUzkPkbNWjxw4M6EzVs72GHuq7LWGFQyJL6iWT0gH5=s96-c',
											appPubKey: '03757c7b4796e8f42b02796607b5ee2ad23c6beb9a28e951777ac4349915b95aa2',
                  },
  } */
  /* #swagger.security = [{
              "bearerAuth": []
        }] */
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
  /*  #swagger.parameters[''] = {
			
		} */
  /* #swagger.security = [{
				
			}] */
  /*  #swagger.responses[200] = {
						description: 'get community data',
              schema: {
                  message: 'get community data'
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

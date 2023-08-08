const express = require('express');
const router = express.Router();
const controller = require('../controllers/createTba.controller');

router.post('/', controller.createTba, async (req, res) => {
  //  #swagger.description = 'create tba'
  //  #swagger.tags = ['CreateTba']
  /* #swagger.requestBody = {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              txHash: {
                type: 'string',
                example: '0x7a5885c2fa86646155f81d77300c02077a332f8ec59a86bbf9a55bb0e5a736c6'
              },
            }
          }
        }
      }
    } */
  /*  #swagger.responses[200] = {
					description: 'Successfully created TBA',
					schema: {
							message: 'Successfully created TBA'
					}
			} */
  /*  #swagger.responses[400] = {
					description: 'Failed to create TBA',
					schema: {
							error: 'Failed to create TBA'
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

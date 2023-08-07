const express = require('express');
const router = express.Router();
const controller = require('../controllers/createTba.controller');

router.post('/', controller.createTba, async (req, res) => {
  //  #swagger.description = 'create tba'
  //  #swagger.tags = ['CreateTba']
  /* #swagger.parameters['txHash'] = {
        in: 'body',
        required: true,
        description: 'Transaction hash',
        schema: {
            $ref: '#/definitions/TxHash'
        }
    } */
  /* #swagger.security = [{
       "bearerAuth": []
   }]
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

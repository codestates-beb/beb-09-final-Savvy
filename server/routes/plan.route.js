const express = require('express');
const router = express.Router();
const controller = require('../controllers/plan.controller');

router.put('/', controller.updatePlan, async (req, res) => {
  //	#swagger.description = 'update plan'
  //	#swagger.tags = ['Plan']
  /* #swagger.requestBody = {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              adminEmail: {
                type: 'string',
                example: 'sjlee80@gmail.com'
              },
              plan: {
                type: 'string',
                example: 'plus'
              },
            }
          }
        }
      }
    } */
  /*  #swagger.responses[200] = {
					description: 'Successfully updated plan',
					schema: {
							message: 'Successfully updated plan'
					}
			} */
  /*  #swagger.responses[400] = {
					description: 'No admin found',
					schema: {
							error: 'No admin found'
					}
			} */
  /*  #swagger.responses[402] = {
					description: 'Same plan',
					schema: {
							error: 'Same plan'
					}
			} */
  /*  #swagger.responses[500] = {
					description: 'Internal server error',
					schema: {
							error: 'Internal server error'
					}
			} */
});

module.exports = router;

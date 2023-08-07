const express = require('express');
const router = express.Router();
const controller = require('../controllers/plan.controller');

router.put('/', controller.updatePlan, async (req, res) => {
  //	#swagger.description = 'update plan'
  //	#swagger.tags = ['Plan']
  /*  #swagger.parameters[''] = {
		} */
  /* #swagger.security = [{
				}] */
  /*  #swagger.responses[200] = {
								
								description: 'Successfully updated plan',
								schema: {
										message: 'Successfully updated plan'
										});
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
			description: 'Internal Server Error',
			schema: {
					error: 'Internal Server Error'
			}
	} */
});

module.exports = router;

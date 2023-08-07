const express = require('express');
const router = express.Router();
const controller = require('../controllers/dashboard.controller');

router.get('/:communityAddress', controller.dashboard, async (req, res) => {
  //	#swagger.description = 'get dashboard'
  //	#swagger.tags = ['Dashboard']
  /*  #swagger.parameters[''] = {		
		} */
  /* #swagger.security = [{
			}] */
  /*  #swagger.responses[200] = {
						description: 'Successfully fetched TBAs',
						schema: {
								message: 'Successfully fetched TBAs',
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

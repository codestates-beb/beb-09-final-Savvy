const express = require('express');
const router = express.Router();
const controller = require('../controllers/manager.controller');

router.post('/community/create', controller.createCommunity, async (req, res) => {
  //	#swagger.description = 'create community'
  //	#swagger.tags = ['Manager']
  /*  #swagger.parameters[''] = {			
		} */
  /* #swagger.security = [{
			}] */
  /*  #swagger.responses[200] = {
						description: 'created new community data',
						schema: {
								message: 'created new community data'
								});
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
								error: 'Community already exists'
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
  /*  #swagger.parameters[''] = {
			} */
  /* #swagger.security = [{
					}] */
  /*  #swagger.responses[200] = {
									description: 'updated community data',
									schema: {
											message: 'updated community data'
											});
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

router.get('/', controller.getManager, async (req, res) => {
  //	#swagger.description = 'get manager'
  //	#swagger.tags = ['Manager']
  /*  #swagger.parameters[''] = {
			
		} */
  /* #swagger.security = [{
			}] */
  /*  #swagger.responses[200] = {
							description: 'get manager data',
							schema: {
									message: 'get manager data',
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
  //	#swagger.description = 'get community'
  //	#swagger.tags = ['Manager']
  /*  #swagger.parameters[''] = {
							
			} */
  /* #swagger.security = [{
					}] */
  /*  #swagger.responses[200] = {
							description: 'get community data',
							schema: {
									message: 'get community data',
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
  /*  #swagger.parameters[''] = {
					
		} */
  /* #swagger.security = [{
				}] */
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

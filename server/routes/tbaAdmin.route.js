const express = require('express');
const router = express.Router();
const controller = require('../controllers/tbaAdmin.controller');

router.get('/:communityAddress', controller.getTbaByAddress, async (req, res) => {
  //	#swagger.description = 'get tba by address'
  //	#swagger.tags = ['TbaAdmin']
  /*  #swagger.parameters[''] = {
			
		} */
  /* #swagger.security = [{
			}] */
  /*  #swagger.responses[200] = {
						description: 'Successfully TBAs of communityAddress',
						schema: {
								message: 'Successfully TBAs of communityAddress',
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
router.get('/detail/:tbaId', controller.getTbaDetail, async (req, res) => {
  //	#swagger.description = 'get tba detail'
  //	#swagger.tags = ['TbaAdmin']
  /*  #swagger.parameters[''] = {
			
		} */
  /* #swagger.security = [{
				}] */
  /*  #swagger.responses[200] = {
						
						description: 'Successfully fetched TBA detail',
						schema: {
								message: 'Successfully fetched TBA detail',
								}
								} */
  /*  #swagger.responses[404] = {
						description: 'No TBA',
						schema: {	
								error: 'No TBA'
						}
			} */
  /*  #swagger.responses[500] = {
						description: 'Internal Server Error',
						schema: {											
								error: 'Internal Server Error'
						}
			} */
});

router.post('/createGroup', controller.createGroup, async (req, res) => {
  //	#swagger.description = 'create group'
  //	#swagger.tags = ['TbaAdmin']
  /*  #swagger.parameters[''] = {
			
		} */
  /* #swagger.security = [{
				}] */
  /*  #swagger.responses[200] = {
						description: 'Successfully created TBA groups',
						schema: {
								message: 'Successfully created TBA groups',
								}	
								} */
  /*  #swagger.responses[400] = {
						description: 'Group name already exists',
						schema: {
								error: 'Group name already exists'
						}
			} */
  /*  #swagger.responses[500] = {
						description: 'Internal Server Error',
						schema: {
								error: 'Internal Server Error'
						}
			} */
});

router.put('/updateGroup', controller.updateGroup, async (req, res) => {
  //	#swagger.description = 'update group'
  //	#swagger.tags = ['TbaAdmin']
  /*  #swagger.parameters[''] = {
		
		} */
  /* #swagger.security = [{
				}] */
  /*  #swagger.responses[200] = {							
						description: 'Successfully updated TBA groups',
						schema: {		
								message: 'Successfully updated TBA groups',
						}
			} */
  /*  #swagger.responses[400] = {
						description: 'Group does not exist',
						schema: {
								error: 'Group does not exist'
						}
			} */
  /*  #swagger.responses[500] = {
						description: 'Internal Server Error',
						schema: {
								error: 'Internal Server Error'
						}
			} */
});

router.get(
  '/group/allGroups/:communityAddress',
  controller.getAllGroups,
  async (req, res) => {
    //	#swagger.description = 'get all groups'
    //	#swagger.tags = ['TbaAdmin']
    /*  #swagger.parameters[''] = {
		
		} */
    /* #swagger.security = [{
				
			}] */
    /*  #swagger.responses[200] = {
						description: 'Successfully fetched all groups',
						schema: {
								message: 'Successfully fetched all groups',
								}
								} */
    /*  #swagger.responses[404] = {
						description: 'No groups found',
						schema: {
								error: 'No groups found'
						}
				} */
    /*  #swagger.responses[500] = {
						description: 'Internal Server Error',
						schema: {
								error: 'Internal Server Error'
						}
				} */
  }
);

router.get('/group/:groupId', controller.getGroupTBA, async (req, res) => {
  //	#swagger.description = 'get group tba'
  //	#swagger.tags = ['TbaAdmin']
  /*  #swagger.parameters[''] = {
		
		} */
  /* #swagger.security = [{
				
			}] */
  /*  #swagger.responses[200] = {
						description: 'Successfully fetched group tba',
						schema: {								
								message: 'Successfully fetched group tba',
						}
			} */
  /*  #swagger.responses[400] = {
						description: 'No community found',
						schema: {
								error: 'No community found'
						}
			} */
  /*  #swagger.responses[404] = {
						description: 'No group tba found',
						schema: {
								error: 'No group tba found'
						}
			} */
  /*  #swagger.responses[500] = {
						description: 'Internal Server Error',
						schema: {								
								error: 'Internal Server Error'
						}
			} */
});

router.delete('/group/:groupId', controller.deleteGroup, async (req, res) => {
  //	#swagger.description = 'delete group'
  //	#swagger.tags = ['TbaAdmin']
  /*  #swagger.parameters[''] = {
			
		} */
  /* #swagger.security = [{
			
			}] */
  /*  #swagger.responses[200] = {
						
						description: 'Successfully deleted group',
						schema: {
								message: 'Successfully deleted group',
						}
			} */
  /*  #swagger.responses[404] = {
						description: 'No group found',
						schema: {
								error: 'No group found'
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

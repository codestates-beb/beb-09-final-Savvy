const express = require('express');
const router = express.Router();
const controller = require('../controllers/ticket.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post(
  '/create',
  //   upload.fields([
  //     { name: "file" },
  //     { name: "eventName" },
  //     { name: "date" },
  //     { name: "numberOfTickets" },
  //     { name: "location" },
  //     { name: "siteUrl" },
  //     { name: "QR" },
  //   ]),
  upload.single('file'),
  controller.createTicket,
  async (req, res) => {
    //	#swagger.description = 'create ticket'
    //	#swagger.tags = ['Ticket']
    /*  #swagger.parameters[''] = {

		} */
    /* #swagger.security = [{
				}] */
    /*  #swagger.responses[200] = {
						description: 'Upload to IPFS success',
						schema: {
								message: 'Upload to IPFS success'
						}
			} */
    /*  #swagger.responses[400] = {
						description: 'Failed to upload to IPFS',
						schema: {
								error: 'Failed to upload to IPFS'
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

module.exports = router;

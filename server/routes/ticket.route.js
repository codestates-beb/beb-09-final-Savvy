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
    /* #swagger.requestBody = {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              file: {
                type: 'string',
                format: 'binary'
              },
              eventName: {
                type: 'string',
                example: 'Savvy Event'
              },
              date: {
                type: 'string',
                example: '2023-08-12'
              },
              numberOfTickets: {
                type: 'string',
                example: '3'
              },
              location: {
                type: 'string',
                example: 'Seoul'
              },
              siteUrl: {
                type: 'string',
                example: 'https://sendbee.co.kr/event/detail/347'
              },
              QR: {
                type: 'string',
                example: 'null'
              }
            }
          }
        }
      }
    } */
    /*  #swagger.responses[200] = {
						description: 'Upload to IPFS success',
						schema: {
								message: 'Upload to IPFS success',
								"hash": "QmSUfYseq69BDffGN5H8WVFm981nj2xYw6VaWsgvdMmeur",
								"numberOfTickets": "3",
								"eventName": "Savvy Event"
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

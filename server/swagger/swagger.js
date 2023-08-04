// swagger/swagger.js

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Savvy API',
      version: '1.0.0',
      description: 'Savvy API with express',
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js', './model/*.js'],
};

const specs = swaggerJSDoc(options);

const outputFile = './swagger/swagger-output.json';
const endpointsFiles = ['./app.js'];
swaggerAutogen(outputFile, endpointsFiles, specs);

module.exports = { swaggerUi, specs };

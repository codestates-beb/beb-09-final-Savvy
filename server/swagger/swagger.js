// swagger/swagger.js

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
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

module.exports = { swaggerUi, specs };

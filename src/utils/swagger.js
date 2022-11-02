import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

import { PORT } from '@config';
import logger from './logger';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Social Welfare API',
      version: '1.0.0',
    },
    servers: [{ url: `http://localhost:${PORT}` }],
    components: {
      securitySchemes: {
        Bearer: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ Bearer: [] }],
  },
  apis: ['swagger.yaml'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = app => {
  // swagger page
  app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));
  // swagger json
  app.get('/api-docs.json', (_, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  logger.info(`Docs available at http://localhost:${PORT}/api-docs`);
};

export default swaggerDocs;

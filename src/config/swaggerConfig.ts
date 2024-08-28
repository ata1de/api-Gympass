import swaggerJSDoc from 'swagger-jsdoc';

// Definição do Swagger
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Gym pass API',
      version: '1.0.0',
      description: 'API para gerenciamento de check-ins em academias',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Servidor local',
      },
    ],
  };
  
const options = {
definition: swaggerDefinition,
apis: ['./src/routes.ts', './src/docs/*.ts'],
};

  // Gerar a especificação do Swagger usando swagger-jsdoc
export const swaggerSpec = swaggerJSDoc(options);


const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');



const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Footballers API',
            version: '1.0.0',
            description: 'API ตัวอย่างสำหรับ Footballers ',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
    },
    apis: ['./controllers/footballers.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerUi };
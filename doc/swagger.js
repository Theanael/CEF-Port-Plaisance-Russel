const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',

        info: {
            title: 'API Port de Plaisance Russel',
            version: '1.0.0'
        },    
        tags: [
            {
                name: 'Users',
                description: 'Gestion des utilisateurs'
            },
            {
                name: 'Catways',
                description: 'Gestion des catways'
            },
            {
                name: 'Reservations',
                description: 'Gestion des réservations'
            }
        ],

        servers: [
            {
                url: process.env.SITE_URL
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },

    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec; 
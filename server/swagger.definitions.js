
(() => {
  const adminAuthApi = require('./lib/modules/admin_auth/api_definitions');
  const contactUsApi = require('./lib/modules/contact-us/api_definitions');

  module.exports = {
    server: {
      openapi: '3.0.1',
      info: {
        title: 'NBIMF Portal',
        description: 'NBIMF project',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:4001/api/v1/admin',
        },
        {
          url: 'http://localhost:4001/api/v1/user',
        },
        {
          url: 'http://3.145.156.84/api/v1/user'
        },
        {
          url: 'http://3.145.156.84/api/v1/admin'
        }
      ],
      tags: [
        {
          name: 'Health Check',
          description: 'Api Health check.'
        },
        {
          name: 'Static files',
          description: 'Static files'
        },
        ...adminAuthApi.server.tags,
        ...contactUsApi.server.tags
      ],
      paths: {
        ...adminAuthApi.server.paths,
        ...contactUsApi.server.paths,
        '/health-check': {
          get: {
            tags: ['Health Check'],
            summary: 'health check api',
            description: 'Hit his api inorder to ensure api health.',
            operationId: 'healthCheck',
            responses: {
              default: {
                description: '',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/CommonResponse',
                    },
                  },
                },
              },
            }
          }
        }
      },
      components: {
        schemas: {
          CommonResponse: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              status: { type: 'number' }
            },
          },
          ...adminAuthApi.server.components.schemas,
          ...contactUsApi.server.components.schemas
        },
        securitySchemes: {
          api_key: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
          },
        },
      },
    },
  };
})();

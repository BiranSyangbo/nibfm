
(() => {
  const adminAuthApi = require('./lib/modules/admin_auth/api_definitions');

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
          url: 'http://127.0.0.1:4001/api/v1/admin',
        },
        {
          url: 'http://127.0.0.1:4001/api/v1/user',
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
      ],
      paths: {
        ...adminAuthApi.server.paths,
        '/static/{filename}': {
          get: {
            tags: ['Static files'],
            summary: 'Static files api',
            description: 'Hit his api inorder to ensure api health.',
            operationId: 'serveStaticFIle',
            parameters: [
              {
                in: 'path',
                name: 'filename',
                schema: {
                  type: 'string',
                  enum: ['Nepal_BIM_Forum_Application.pdf', 'Nepal_BIM_Forum_Corporate.pdf']
                },
                description: 'filename',
                required: true
              }
            ],
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
        },
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
          ...adminAuthApi.server.components.schemas
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

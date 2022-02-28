
(() => {
  const adminAuthApi = require('./lib/modules/admin_auth/api_definitions');
  const contactUsApi = require('./lib/modules/contact-us/api_definitions');
  const membershipFormApi = require('./lib/modules/membership-form/api_definitions');
  const blogsApi = require('./lib/modules/blogs/api_definitions');
  const aboutUsApi = require('./lib/modules/about-us/api_definitions');
  const fileManagemetApi = require('./lib/modules/file-management/api_definitions');
  const userAuthApi = require('./lib/modules/user-auth/api_definitions');
  const forgotPasswordApis = require('./lib/modules/forgot-password/api_definitions');






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
          url: 'http://http://18.116.19.66:4001/api/v1/user'
        },
        {
          url: 'http://http://18.116.19.66:4001/api/v1/admin'
        }
      ],
      tags: [
        {
          name: 'Health Check',
          description: 'Api Health check.'
        },
        ...adminAuthApi.server.tags,
        ...contactUsApi.server.tags,
        ...membershipFormApi.server.tags,
        ...blogsApi.server.tags,
        ...aboutUsApi.server.tags,
        ...fileManagemetApi.server.tags,
        ...userAuthApi.server.tags,
        ...forgotPasswordApis.server.tags





      ],
      paths: {
        ...adminAuthApi.server.paths,
        ...contactUsApi.server.paths,
        ...membershipFormApi.server.paths,
        ...blogsApi.server.paths,
        ...aboutUsApi.server.paths,
        ...fileManagemetApi.server.paths,
        ...userAuthApi.server.paths,
        ...forgotPasswordApis.server.paths,





        '/static/{filename}': {
          get: {
            tags: ['Static files'],
            summary: 'Static files api',
            description: 'User hits this to get membership forms.',
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
          ...adminAuthApi.server.components.schemas,
          ...contactUsApi.server.components.schemas,
          ...membershipFormApi.server.components.schemas,
          ...blogsApi.server.components.schemas,
          ...aboutUsApi.server.components.schemas,
          ...fileManagemetApi.server.components.schemas,
          ...userAuthApi.server.components.schemas,
          ...forgotPasswordApis.server.components.schemas,






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

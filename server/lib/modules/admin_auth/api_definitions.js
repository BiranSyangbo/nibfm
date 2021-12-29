
(() => {

  module.exports = {
    server: {
      tags: [
        {
          name: 'admin-auth',
          description: 'Api admin-auth.'
        }
      ],
      paths: {
        '/auth/login': {
          post: {
            tags: ['admin-auth'],
            summary: 'admin-auth login api',
            description: 'Admin hits this api to login into the system.',
            operationId: 'login',
            requestBody: {
              description: '',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/LoginRequest',
                  },
                },
              },
            },
            responses: {
              default: {
                description: '',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/LoginResponse',
                    },
                  },
                },
              },
            }
          }
        },
        '/auth/logout': {
          put: {
            tags: ['admin-auth'],
            summary: 'admin-auth logout api',
            description: 'Admin hits this api to logout into the system.',
            operationId: 'logout',
            security: [
              {
                api_key: []
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
            },

          }
        }
      },
      components: {
        schemas: {
          LoginRequest: {
            type: 'object',
            properties: {
              username: { type: 'string' },
              password: { type: 'string' }
            },
          },
          LoginResponse: {
            type: 'object',
            properties: {
              status: { type: 'number' },
              message: { type: 'string' },
              token: { type: 'string' }
            },
          }
        }
      },
    },
  };
})();

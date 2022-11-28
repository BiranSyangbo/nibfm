
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
            description: 'If you are an administrator and need to login to the system, simply hit the api.',
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
            description: "If you need to logout of the system, the admin can hit this api. This will ensure that you are no longer logged in and won't be able to access any sensitive information.",
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

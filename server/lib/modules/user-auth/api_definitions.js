
(() => {

  module.exports = {
    server: {
      tags: [
        {
          name: 'user-auth',
          description: 'Api user-auth.'
        }
      ],
      paths: {
        '/user-auth/login': {
          post: {
            tags: ['user-auth'],
            summary: 'user-auth login api',
            description: 'user hits this api to login into the system.',
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
        '/user-auth/logout': {
          put: {
            tags: ['user-auth'],
            summary: 'user-auth logout api',
            description: 'user hits this api to logout into the system.',
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

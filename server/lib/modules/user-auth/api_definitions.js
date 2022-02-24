
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
        },
        '/user-auth/my-profile': {
          get: {
            tags: ['user-auth'],
            summary: 'USER:- my-profile',
            description: 'USER:- my-profile',
            operationId: 'getMyProfile',
            parameters: [
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
            security: [
              {
                api_key: []
              }
            ]
          }
        },
        '/user-auth/change-password': {
          put: {
            tags: ['user-auth'],
            summary: 'change-password',
            description: 'user hits this api to change-password on the system.',
            operationId: 'changePassword',
            requestBody: {
              description: '',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/changePassRequest',
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
                      $ref: '#/components/schemas/CommonResponse',
                    },
                  },
                },
              },
            },
            security: [
              {
                api_key: []
              }
            ]
          }
        },
        
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
          changePassRequest: {
            type: 'object',
            properties: {
              oldPassword: { type: 'string' },
              newPassword: { type: 'string' },
              confirmPassword: { type: 'string' }

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


(() => {

  module.exports = {
    server: {
      tags: [
        {
          name: 'forgot password',
          description: 'forgot password.'
        }
      ],
      paths: {
        '/forgot-password': {
          post: {
            tags: ['forgot password'],
            summary: 'Using this api customer will request forgot password',
            description: 'Using this api customer will request forgot password',
            operationId: 'forgotPasswordRequest',
            requestBody: {
              description: 'Every fields are required',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/RequestForgotPassword',
                  },
                },
              },
              required: true,
            },
            responses: {
              default: {
                description: 'Customer login auth response',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/CommonResponse',
                    },
                  },
                },
              },
            }
          },
        },
        '/forgot-password/status': {
          get: {
            tags: ['forgot password'],
            summary: 'Using this api customer will check forgot password link status',
            description: 'Using this api customer will check forgot password link status',
            operationId: 'checkForgotPasswordLinkStatus',
            parameters: [
              {
                in: 'query',
                name: 'token',
                schema: {
                  type: 'string'
                },
                description: 'token is required to get link status'
              }
            ],
            responses: {
              default: {
                description: 'Response',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ForgotPasswordLinkStatusResponse',
                    },
                  },
                },
              },
            }
          }
        },
        '/forgot-password/reset': {
          put: {
            tags: ['forgot password'],
            summary: 'Using this api customer will reset password',
            description: 'Using this api customer will reset password',
            operationId: 'resetPassword',
            requestBody: {
              description: 'Every fields are required',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ResetPasswordRequest',
                  },
                },
              },
              required: true,
            },
            responses: {
              default: {
                description: 'Response',
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
          RequestForgotPassword: {
            type: 'object',
            properties: {
              username: { type: 'string' }
            }
          },
          ForgotPasswordLinkStatusResponse: {
            type: 'object',
            properties: {
              status: { type: 'number' },
              message: { type: 'string' },
              token: { type: 'string' }
            }
          },
          ResetPasswordRequest: {
            type: 'object',
            properties: {
              password: { type: 'string' },
              confirmPassword: { type: 'string' },
              token: { type: 'string' }
            }
          }
        }
      },
    },
  };
})();

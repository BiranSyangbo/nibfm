
(() => {

  module.exports = {
    server: {
      tags: [
        {
          name: 'membership-form',
          description: 'Api membership-form.'
        }
      ],
      paths: {
        '/membership-form/': {
          post: {
            tags: ['membership-form'],
            summary: 'USER :: membership-form post api',
            description: 'User hits this api to register contact request.',
            operationId: 'postContactUs',
            requestBody: {
              description: '',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CreateContactUsRequest',
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
            }
          },
          get: {
            tags: ['membership-form'],
            summary: 'ADMIN :: membership-form api',
            description: 'Admin hits this api to get client contact request list.',
            operationId: 'getContactUsList',
            parameters: [
              {
                in: 'query',
                name: 'page',
                schema: {
                  type: 'string'
                },
                description: 'current page',
                required: true
              },
              {
                in: 'query',
                name: 'perPage',
                schema: {
                  type: 'string'
                },
                description: 'total item per page',
                required: true
              },
              {
                in: 'query',
                name: 'filter[name]',
                schema: {
                  type: 'string'
                },
                description: 'filter by name'
              },
              {
                in: 'query',
                name: 'filter[email]',
                schema: {
                  type: 'string'
                },
                description: 'filter by email'
              }
            ],
            responses: {
              default: {
                description: '',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ContactUsListResponse',
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
        '/membership-form/{uuid}': {
          patch: {
            tags: ['membership-form'],
            summary: 'ADMIN :: membership-form logout api',
            description: 'Admin hits this api to logout into the system.',
            operationId: 'deleteContactUs',
            parameters: [
              {
                in: 'path',
                name: 'uuid',
                schema: {
                  type: 'string',
                },
                description: 'uuid',
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
            },
            security: [
              {
                api_key: []
              }
            ]
          },
          get: {
            tags: ['membership-form'],
            summary: 'ADMIN :: membership-form api',
            description: 'Admin hits this api to get client contact detail request.',
            operationId: 'getContactUsDetail',
            parameters: [
              {
                in: 'path',
                name: 'uuid',
                schema: {
                  type: 'string',
                },
                description: 'uuid',
                required: true
              }
            ],
            responses: {
              default: {
                description: '',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ContactUsDetailResponse',
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
        }
      },
      components: {
        schemas: {
          CreateContactUsRequest: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              email: { type: 'string' },
              message: { type: 'string' }
            },
          },
          ContactUsListResponse: {
            type: 'object',
            properties: {
              status: { type: 'number' },
              message: { type: 'string' },
              dataList: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    email: { type: 'string' }
                  }
                }
              }
            },
          },
          ContactUsDetailResponse: {
            type: 'object',
            properties: {
              status: { type: 'number' },
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  _id: { type: 'string' },
                  name: { type: 'string' },
                  email: { type: 'string' },
                  message: { type: 'string' }
                }
              }
            },
          }
        }
      },
    },
  };
})();

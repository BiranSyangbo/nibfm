
(() => {

  module.exports = {
    server: {
      tags: [
        {
          name: 'contact-us',
          description: 'Api contact-us.'
        }
      ],
      paths: {
        '/contact-us/': {
          post: {
            tags: ['contact-us'],
            summary: 'contact-us post api',
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
            tags: ['contact-us'],
            summary: 'contact-us api',
            description: 'Admin hits this api to get client contact request list.',
            operationId: 'getContactUsList',
            parameters: [
              {
                in: 'page',
                name: 'query',
                schema: {
                  type: 'string',
                },
                description: 'current page number',
                required: true
              },
              {
                in: 'perPage',
                name: 'query',
                schema: {
                  type: 'string',
                },
                description: 'perPage item',
                required: true
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
        '/contact-us/{uuid}': {
          patch: {
            tags: ['contact-us'],
            summary: 'contact-us logout api',
            description: 'Admin hits this api to logout into the system.',
            operationId: 'deleteContactUs',
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
            tags: ['contact-us'],
            summary: 'contact-us api',
            description: 'Admin hits this api to get client contact detail request.',
            operationId: 'getContactUsDetail',
            parameters: [
              {
                in: 'path',
                name: 'uuid',
                schema: {
                  type: 'string',
                },
                description: 'current page number',
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

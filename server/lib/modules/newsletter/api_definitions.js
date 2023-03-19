
(() => {

  module.exports = {
    server: {
      tags: [
        {
          name: 'newsletter',
          description: 'Api newsletter.'
        }
      ],
      paths: {
        '/newsletter': {
          post: {
            tags: ['newsletter'],
            summary: 'USER :: newsletter post api',
            description: 'User hits this api to register contact request.',
            operationId: 'postNewsletter',
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
            tags: ['newsletter'],
            summary: 'ADMIN :: newsletter api',
            description: 'Admin hits this api to get clients emails list.',
            operationId: 'getNewletterList',
            responses: {
              default: {
                description: '',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/NewsletterListResponse',
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
        '/newsletter/{emial}': {
          delete: {
            tags: ['newsletter'],
            summary: 'ADMIN :: remove from newsletter service',
            description: 'Admin hits this api to remove email from newsletter service.',
            operationId: 'deleteNewsletter',
            parameters: [
              {
                in: 'path',
                name: 'email',
                schema: {
                  type: 'string',
                },
                description: 'user subcription email address',
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
          delete: {
            tags: ['newsletter'],
            summary: 'USER :: remove from newsletter service',
            description: 'Admin hits this api to remove email from newsletter service.',
            operationId: 'deleteNewsletter',
            parameters: [
              {
                in: 'path',
                name: 'email',
                schema: {
                  type: 'string',
                },
                description: 'user subcription email address',
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

        }
      },
      components: {
        schemas: {
          CreateNewsletterRequest: {
            type: 'object',
            properties: {
              email: { type: 'string' },
            },
          },
          NewsletterListResponse: {
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
                    email: { type: 'string' }
                  }
                }
              }
            },
          },

        }
      },
    },
  };
})();

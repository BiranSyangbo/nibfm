
(() => {

  module.exports = {
    server: {
      tags: [
       
      ],
      paths: {
        '/about-us': {
          get: {
            tags: ['ADMIN:- about-us'],
            summary: 'ADMIN ::  about-us api',
            description: 'Admin hits this api to get client about-us request list.',
            operationId: 'getList',
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
          },
          put: {
            tags: ['ADMIN:- about-us'],
            summary: 'USER :: General about-us post api',
            description: 'User hits this api to submit general about-us form  request.',
            operationId: 'submitGeneralForm',
            requestBody: {
              description: '',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/updateAboutUs',
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
        },
        '/about-us/info': {
          get: {
            tags: ['CUSTOMER:- about-us'],
            summary: 'CUSTOMER ::  about-us api',
            description: 'CUSTOMER hits this api to get client about-us request list.',
            operationId: 'getaboutUs',
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
      },
   
      components: {
        schemas: {
          updateAboutUs: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              slug: { type: 'string' },
              description: { type: 'string' },
              image: { type: 'string' },
              isActive: { type: 'boolean' },
              metaTags: {
                type: 'object',
                properties: {
                  metaTitle: { type: 'string' },
                  metaKeyword: { type: 'string' },
                  metaDescription: { type: 'string' },
                  
                }
              },

            },
          },
        }
      },
    },
  };
})();

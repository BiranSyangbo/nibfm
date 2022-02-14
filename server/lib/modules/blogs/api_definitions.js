
(() => {

  module.exports = {
    server: {
      tags: [
        {
          name: 'blogs',
          description: 'Api blogs.'
        }
      ],
      paths: {
        '/blog': {
          post: {
            tags: ['blogs'],
            summary: 'ADMIN :: Create Blog post api',
            description: 'Admin hits this api to create blogs post request.',
            operationId: 'createBlogReq',
            requestBody: {
              description: '',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CreateBlog',
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
            tags: ['blogs'],
            summary: 'ADMIN :: blogs api',
            description: 'Admin hits this api to get blogs list.',
            operationId: 'getblogsList',
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
                name: 'filter[title]',
                schema: {
                  type: 'string'
                },
                description: 'filter by title'
              },
              {
                in: 'query',
                name: 'filter[author]',
                schema: {
                  type: 'string'
                },
                description: 'filter by author'
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
          }
        },
        '/blog/{uuid}': {
          put: {
            tags: ['blogs'],
            summary: 'ADMIN :: Update Blog post api',
            description: 'Admin hits this api to Update blogs post request.',
            operationId: 'UpdateBlogReq',
            requestBody: {
              description: '',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/updateBlog',
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
          }
        }
      },
   
      components: {
        schemas: {
          CreateBlog: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              author: { type: 'string' },
              content: { type: 'string' },
              publishedDate: { type: 'string' },
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
          updateBlog: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              author: { type: 'string' },
              content: { type: 'string' },
              publishedDate: { type: 'string' },
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

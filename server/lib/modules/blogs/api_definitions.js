
(() => {

  module.exports = {
    server: {
      tags: [
      ],
      paths: {
        '/blog': {
          post: {
            tags: ['ADMIN:- blogs'],
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
            tags: ['ADMIN:- blogs'],
            summary: 'ADMIN :: Get blogs list api',
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
        '/blog/list': {
          get: {
            tags: ['USER:- blogs'],
            summary: 'USER :: Get blogs list api',
            description: 'USER hits this api to get blogs list.',
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
        '/blog/{slug}': {
          get: {
            tags: ['USER:- blogs'],
            summary: 'USER :: Get blogs details api',
            description: 'USER hits this api to get blogs details.',
            operationId: 'getblogsdetails',
            parameters: [
              {
                in: 'path',
                name: 'slug',
                schema: {
                  type: 'string'
                },
                description: 'slug',
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
          }
        },
        '/blog/{uuid}': {
          put: {
            tags: ['ADMIN:- blogs'],
            summary: 'ADMIN :: Update Blog post api',
            description: 'Admin hits this api to Update blogs post request.',
            operationId: 'UpdateBlogReq',
            parameters: [
              {
                in: 'path',
                name: 'uuid',
                schema: {
                  type: 'string'
                },
                description: 'uuid',
                required: true
              }
            ],
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
          },
          patch: {
            tags: ['ADMIN:- blogs'],
            summary: 'ADMIN :: Delete Blog post api',
            description: 'Admin hits this api to Delete blogs post request.',
            operationId: 'DeleteBlogReq',
            parameters: [
              {
                in: 'path',
                name: 'uuid',
                schema: {
                  type: 'string'
                },
                description: 'uuid',
                required: true
              }
            ],
            requestBody: {
              description: ''
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
            tags: ['ADMIN:- blogs'],
            summary: 'ADMIN :: get blog details post api',
            description: 'Admin hits this api to get blog details request.',
            operationId: ' blogDetailsReq',
            parameters: [
              {
                in: 'path',
                name: 'uuid',
                schema: {
                  type: 'string'
                },
                description: 'uuid',
                required: true
              }
            ],
            requestBody: {
              description: ''
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
              slug: { type: 'string' },
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
              slug: { type: 'string' },
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


(() => {

  module.exports = {
    server: {
      tags: [
        {
          name: 'ADMIN:- Event Management',
          description: 'ADMIN Event Management.'
        },
        {
          name: 'USER:- Event Management',
          description: 'USER Event Management.'
        }
      ],
      paths: {
        '/event-management': {
          post: {
            tags: ['ADMIN:- Event Management'],
            summary: 'Create Event',
            description: 'Using this api Admin can create event',
            operationId: 'createEvent',
            requestBody: {
              description: 'Every fields are required',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CreateEvent',
                  },
                },
              },
              required: true,
            },
            responses: {
              default: {
                description: 'common response',
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
            tags: ['ADMIN:- Event Management'],
            summary: 'Get Event List',
            description: 'Using this api Admin gets event list',
            operationId: 'getEventList',
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
                description: 'filter by event title'
              }
            ],
            responses: {
              default: {
                description: 'donation list response',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/GetEventList',
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
        '/event-management/info/{uuid}': {
          put: {
            tags: ['ADMIN:- Event Management'],
            summary: 'Update Event',
            description: 'Using this api Admin can update event',
            operationId: 'updateEvent',
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
              description: 'Every fields are required',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CreateEvent',
                  },
                },
              },
              required: true,
            },
            responses: {
              default: {
                description: 'common response',
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
            tags: ['ADMIN:- Event Management'],
            summary: 'Get Event Detail',
            description: 'Using this api Admin gets event detail info',
            operationId: 'getEventDetailInfo',
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
            responses: {
              default: {
                description: 'event list response',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/GetEventDetailResponse',
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
          patch: {
            tags: ['ADMIN:- Event Management'],
            summary: 'Delete Event',
            description: 'Using this api Admin can delete event',
            operationId: 'deleteEvent',
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
            responses: {
              default: {
                description: 'common response',
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
        '/event-management/list': {
          get: {
            tags: ['USER:- Event Management'],
            summary: 'Get Event List',
            description: 'Using this api user can list event',
            operationId: 'getUserEventList',
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
                description: 'event list response',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/GetUserEventListResponse',
                    },
                  },
                },
              },
            }
          }
        },
      },
      components: {
        schemas: {
          CreateEvent: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              slug: { type: 'string' },
              author: { type: 'string' },
              description: { type: 'string' },
              date: { type: 'string' },
              image: { type: 'string' },
              status: { type: 'boolean' },
              meta: {
                type: 'object',
                properties: {
                  tag: { type: 'string' },
                  keyword: { type: 'string' },
                  description: { type: 'string' }
                }
              }
            }
          },
          GetEventList: {
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
                    title: { type: 'string' },
                    author: { type: 'string' },
                    date: { type: 'string' },
                    status: { type: 'boolean' },
                    createdAt: { type: 'string' }
                  }
                }
              },
              pagination: {
                type: 'object',
                properties: {
                  perPage: { type: 'number' },
                  totalItems: { type: 'number' },
                  currentPage: { type: 'number' },
                  totalPages: { type: 'number' }
                }
              }
            }
          },
          GetEventDetailResponse: {
            type: 'object',
            properties: {
              status: { type: 'number' },
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  slug: { type: 'string' },
                  author: { type: 'string' },
                  description: { type: 'string' },
                  date: { type: 'string' },
                  image: { type: 'string' },
                  status: { type: 'boolean' },
                  meta: {
                    type: 'object',
                    properties: {
                      tag: { type: 'string' },
                      keyword: { type: 'string' },
                      description: { type: 'string' }
                    }
                  },
                  status: { type: 'boolean' },
                  createdAt: { type: 'string' }
                }
              }
            }
          },
          GetUserEventListResponse: {
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
                    list: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          title: { type: 'string' },
                          slug: { type: 'string' },
                          author: { type: 'string' },
                          description: { type: 'string' },
                          date: { type: 'string' },
                          image: { type: 'string' },
                          status: { type: 'boolean' },
                          meta: {
                            type: 'object',
                            properties: {
                              tag: { type: 'string' },
                              keyword: { type: 'string' },
                              description: { type: 'string' }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
    },
  };
})();

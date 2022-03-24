
(() => {

  module.exports = {
    server: {
      tags: [
        {
          name: 'ADMIN:- Donation management',
          description: 'ADMIN Donation management.'
        },
        {
          name: 'USER:- Donation management',
          description: 'USER Donation management.'
        }
      ],
      paths: {
        '/donation-management': {
          post: {
            tags: ['ADMIN:- Donation management'],
            summary: 'Create Donation',
            description: 'Using this api Admin can create donation',
            operationId: 'createDonation',
            requestBody: {
              description: 'Every fields are required',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CreateDonationRequest',
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
            tags: ['ADMIN:- Donation management'],
            summary: 'Get Donation List',
            description: 'Using this api Admin gets donation list',
            operationId: 'getDonationList',
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
                name: 'filter[donerName]',
                schema: {
                  type: 'string'
                },
                description: 'filter by doner name'
              }
            ],
            responses: {
              default: {
                description: 'donation list response',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/GetDonationListResponse',
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
        '/donation-management/info/{uuid}': {
          put: {
            tags: ['ADMIN:- Donation management'],
            summary: 'Update Donation',
            description: 'Using this api Admin can update donation',
            operationId: 'updateDonation',
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
                    $ref: '#/components/schemas/CreateDonationRequest',
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
            tags: ['ADMIN:- Donation management'],
            summary: 'Get Donation Detail',
            description: 'Using this api Admin gets donation detail info',
            operationId: 'getDonationInfo',
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
                description: 'donation list response',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/GetDonationDetailResponse',
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
            tags: ['ADMIN:- Donation management'],
            summary: 'Delete Donation',
            description: 'Using this api Admin can delete donation',
            operationId: 'deleteDonation',
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
        '/donation-management/list': {
          get: {
            tags: ['USER:- Donation management'],
            summary: 'Get Donation List',
            description: 'Using this api user can list donation',
            operationId: 'getUserDonationList',
            responses: {
              default: {
                description: 'donation list response',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/GetUserDonationListResponse',
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
          CreateDonationRequest: {
            type: 'object',
            properties: {
              date: { type: 'string' },
              donerName: { type: 'string' },
              donerCountry: { type: 'string' },
              amount: { type: 'number' }
            }
          },
          GetDonationListResponse: {
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
                    date: { type: 'string' },
                    donerName: { type: 'string' },
                    donerCountry: { type: 'string' },
                    amount: { type: 'number' },
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
          GetDonationDetailResponse: {
            type: 'object',
            properties: {
              status: { type: 'number' },
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  date: { type: 'string' },
                  donerName: { type: 'string' },
                  donerCountry: { type: 'string' },
                  amount: { type: 'string' },
                  createdAt: { type: 'string' }
                }
              }
            }
          },
          GetUserDonationListResponse: {
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
                          date: { type: 'string' },
                          donerName: { type: 'string' },
                          donerCountry: { type: 'string' },
                          amount: { type: 'number' },
                          createdAt: { type: 'string' }
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

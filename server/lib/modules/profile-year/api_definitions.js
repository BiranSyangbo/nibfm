
(() => {

  module.exports = {
    server: {
      tags: [

      ],
      paths: {
        '/profile-year/modify': {
          put: {
            tags: ['ADMIN:- profile-year'],
            summary: 'ADMIN :: profile-year PUT api',
            description: 'Admin hits this api to modify profile year.\n\n`**NOTE: standard profileYear date format is (YYYY-MM-DD)**`',
            operationId: 'modifyProfileYear',
            requestBody: {
              description: '',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ModifyProfileYear',
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
        '/profile-year/get-info': {
          get: {
            tags: ['ADMIN:- profile-year'],
            summary: 'ADMIN :: profile-year api',
            description: 'Admin hits this api to get profile year information.',
            operationId: 'getProfileYearInfo',
            responses: {
              default: {
                description: '',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/GetProfileYearInfoResponse',
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
          ModifyProfileYear: {
            type: 'object',
            properties: {
              profileYear: { type: 'string' },
            },
          },
          GetProfileYearInfoResponse: {
            type: 'object',
            properties: {
              status: { type: 'number' },
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  profileYear: { type: 'string' }
                }
              }
            },
          }
        }
      },
    },
  };
})();

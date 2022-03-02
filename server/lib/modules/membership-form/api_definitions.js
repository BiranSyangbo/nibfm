
(() => {

  module.exports = {
    server: {
      tags: [

      ],
      paths: {
        '/membership-form/general': {
          post: {
            tags: ['USER:- membership-form'],
            summary: 'USER :: General membership-form post api',
            description: 'User hits this api to submit general membership form  request.\n\n`**NOTE: standard date format is (YYYY-MM-DD)**`\n\n`membershipType`::\n\n*`General`,\n\n*`Student`,\n\n*`Honorary`\n\n`==========================`\n\n`membershipPeriod`::\n\n*`Annual`,\n\n*`Lifetime`\n\n`========================`\n\n`gender`::\n\n*`Male`\n\n*`Female`\n\n*`Other`',
            operationId: 'submitGeneralForm',
            requestBody: {
              description: '',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CreateGeneralMembershipFormRequest',
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
            tags: ['ADMIN:- membership-form'],
            summary: 'ADMIN :: general membership-form api',
            description: 'Admin hits this api to get client general membership request list.',
            operationId: 'getList',
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
        '/membership-form/corporate': {
          post: {
            tags: ['USER:- membership-form'],
            summary: 'USER :: Corporate membership-form post api',
            description: 'User hits this api to submit corporate membership form  request.\n\n`**NOTE: standard date format is (YYYY-MM-DD)**`\n\n`enterpriseSizeType`::\n\n*`SmallScale`\n\n*`MediumScale`\n\n*`LargeScale`\n\n`==========================`\n\n`membershipPeriod`::\n\n*`Annual`,\n\n*`Lifetime`\n\n`========================`\n\n`organizationType`::\n\n*`architecturalEngineering`\n\n*`architecturalConstruction`\n\n*`interiorConstruction`\n\n*`interiorEngineering`\n\n*`societyConstruction`\n\n*`societyEngineering`',
            operationId: 'submitcorporateForm',
            requestBody: {
              description: '',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CreateCorporateMembershipFormRequest',
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
            tags: ['ADMIN:- membership-form'],
            summary: 'ADMIN :: corporate membership-form api',
            description: 'Admin hits this api to get client corporate membership request list.',
            operationId: 'getCorporateList',
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
        '/membership-form/update-status/{uuid}': {
          post: {
            tags: ['ADMIN:- membership-form'],
            summary: 'ADMIN :: Update is approved status for membership-form post api',
            description: 'Update is approved status [0: default, 1:approved , 2 : reject ]',
            operationId: 'UpdateIsApprovedForm',
            parameters: [
              {
                in: 'path',
                name: 'uuid',
                schema: {
                  type: 'string'
                },
                description: 'uuid',
                required: true
              },
              {
                in: 'query',
                name: 'formType',
                schema: {
                  type: 'string'
                },
                description: 'This api is for update isApproved status for both forms here is the formType: [1:- general,2:- corporate] ',
                required: true
              }
            ],
            requestBody: {
              description: '',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UpdateIsApprovedFormRequest',
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
        '/membership-form/general-form-info': {
          get: {
            tags: ['USER:- membership-form'],
            summary: 'USER:- general membership-form api',
            description: 'Admin hits this api to get general membership-form api',
            operationId: 'getGenInfo',
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
        },
        '/membership-form/general-form-info/{uuid}': {
          put: {
            tags: ['USER:- membership-form'],
            summary: 'USER :: General membership-form update api',
            description: 'User hits this api to update general membership form  request.\n\n`**NOTE: standard date format is (YYYY-MM-DD)**`\n\n`membershipType`::\n\n*`General`,\n\n*`Student`,\n\n*`Honorary`\n\n`==========================`\n\n`membershipPeriod`::\n\n*`Annual`,\n\n*`Lifetime`\n\n`========================`\n\n`gender`::\n\n*`Male`\n\n*`Female`\n\n*`Other`',
            operationId: 'updateGeneralForm',
            parameters: [
              {
                in: 'path',
                name: 'uuid',
                schema: {
                  type: 'string'
                },
                description: 'uuis',
                required: true
              }
            ],
            requestBody: {
              description: '',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CreateGeneralMembershipFormRequest',
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
          },
        },
        '/membership-form/corporate-form-info': {
          get: {
            tags: ['USER:- membership-form'],
            summary: 'USER:- corporate membership-form api',
            description: 'Admin hits this api to get corporate membership-form api',
            operationId: 'getCorporateFormDetail',
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
        '/membership-form/corporate-form-info/{uuid}': {
          put: {
            tags: ['USER:- membership-form'],
            summary: 'USER :: Corporate membership-form update api',
            description: 'User hits this api to update corporate membership form  request.\n\n`**NOTE: standard date format is (YYYY-MM-DD)**`\n\n`enterpriseSizeType`::\n\n*`SmallScale`\n\n*`MediumScale`\n\n*`LargeScale`\n\n`==========================`\n\n`membershipPeriod`::\n\n*`Annual`,\n\n*`Lifetime`\n\n`========================`\n\n`organizationType`::\n\n*`architecturalEngineering`\n\n*`architecturalConstruction`\n\n*`interiorConstruction`\n\n*`interiorEngineering`\n\n*`societyConstruction`\n\n*`societyEngineering`',
            operationId: 'updatecorporateForm',
            parameters: [
              {
                in: 'path',
                name: 'uuid',
                schema: {
                  type: 'string'
                },
                description: 'uuis',
                required: true
              }
            ],
            requestBody: {
              description: '',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CreateCorporateMembershipFormRequest',
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
          },
        },
      },

      components: {
        schemas: {
          CreateCorporateMembershipFormRequest: {
            type: 'object',
            properties: {
              profileImage: { type: 'string' },
              date: { type: 'string' },
              corporateMembershipNumber: { type: 'string' },
              enterpriseSizeType: { type: 'string' },
              membershipPeriod: { type: 'string' },
              organizationalInformation: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  chairpersonName: { type: 'string' },
                  organizationType: {type: 'string'},
                  date: { type: 'string' },
                  email: { type: 'string' },
                  bussinessContactNumber: { type: 'string' },
                  organizationPanNumber: { type: 'string' },
                  phoneNumber: { type: 'string' },
                  organizationHeadOfcAddress: {
                    type: 'object',
                    properties: {
                      country: { type: 'string' },
                      provinceNumber: { type: 'string' },
                      district: { type: 'string' },
                      tole: { type: 'string' },
                      wardNumber: { type: 'string' }
                    }
                  },
                  organizationDesccription: { type: 'string' },
                  note: { type: 'string' },


                }
              }

            },
          },
          CreateGeneralMembershipFormRequest: {
            type: 'object',
            properties: {
              profileImage: { type: 'string' },
              date: { type: 'string' },
              membershipNumber: { type: 'string' },
              membershipType: { type: 'string' },
              membershipPeriod: { type: 'string' },
              personalInformation: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  phoneNumber: { type: 'string' },
                  gender: { type: 'string' },
                  dateOfBirthBs: { type: 'string' },
                  dateOfBirthAd: { type: 'string' },
                  email: { type: 'string' },
                  nationality: { type: 'string' },
                  necLicenseNumber: { type: 'string' },
                  address: {
                    type: 'object',
                    properties: {
                      country: { type: 'string' },
                      provinceNumber: { type: 'string' },
                      district: { type: 'string' },
                      tole: { type: 'string' },
                      wardNumber: { type: 'string' }
                    }
                  },
                  academicInformation: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        academicQualifiaction: { type: 'string' },
                        institution: { type: 'string' },
                        graduatedYear: { type: 'string' }
                      }
                    }
                  },
                }

              },
              notes: { type: 'string' },
              singnature: { type: 'string' }

            },
          },
          UpdateIsApprovedFormRequest: {
            type: 'object',
            properties: {
              isApproved: { type: 'number' },
            },
          }
        }
      },
    },
  };
})();

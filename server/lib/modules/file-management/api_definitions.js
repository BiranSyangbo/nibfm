
(() => {

  module.exports = {
    server: {
      tags: [
       
      ],
      paths: {
        '/file-management': {
          post: {
            tags: ['file management'],
            summary: 'Upload single image.',
            description: 'upload single image of content-type multipart/form-data',
            operationId: 'uploadSingleImage',
            parameters: [
            ],
            requestBody: {
              content: {
                'multipart/form-data': {
                  schema: {
                    $ref: '#/components/schemas/UploadSingleFileRequest',
                  },
                },
              },
              required: true,
            },
            responses: {
              default: {
                description: 'Response',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/SingleImageUploadResponse',
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
          UploadSingleFileRequest: {
            type: 'object',
            properties: {
              file: {
                type: 'string',
                format: 'binary'
              }
            }
          },
          SingleImageUploadResponse: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              msg: { type: 'string' },
              error: { type: 'boolean' },
              imageUrl: { type: 'string' }
            }
          }
        }
      },
    },
  };
})();

/**
 * @author Binod Nagarkoti
 * @method deleteNewsletter
 */

'use strict';

const { getNewsletterDetail, deleteDocument } = require('../utils/db_query.helper')
const HTTPStatus = require('http-status');


module.exports = async (req, res, next) => {
  try {

    if (req.params.id) {

      const projection = {
        _id: 1
      }

      //@check document exists or not
      const data = await getNewsletterDetail(req, req.params.id, projection)
      if (data && Object.keys(data).length > 0) {

        //@delete document
        const deleteResponse = await deleteDocument(req, req.params.id);
        if (deleteResponse) {
          return res.status(HTTPStatus.OK).json({
            status: HTTPStatus.OK,
            message: "we have successfully removed your email from newsletter."
          })
        }

        return res.status(HTTPStatus.BAD_REQUEST).json({
          status: HTTPStatus.BAD_REQUEST,
          message: "We're sorry, but we were unable to remove email from newsletter."
        })

      }
    }

    return res.status(HTTPStatus.NOT_FOUND).json({
      status: HTTPStatus.NOT_FOUND,
      message: "We're sorry, but we were unable to find the data you were looking for."
    })
  } catch (error) {
    return next(error);
  }
}
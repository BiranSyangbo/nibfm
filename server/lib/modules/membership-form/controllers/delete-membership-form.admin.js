
'use strict';
const HTTPStatus = require('http-status');

const internalFun = {
  updateUserProfileYear: async (req, uuid) => {
    return new Promise(async (resolve, reject) => {
      try {
        const membershipFormCollectionName = req?.query?.formType === 'general' ? "general_membership_forms" : "corporate_membership_forms";
        const updateMembershipformProfileYearResponse = await req.db.collection(membershipFormCollectionName).updateOne(
          {
            _id: uuid
          },
          {
            $set: {
              deleted: true
            }
          }
        )
        if (updateMembershipformProfileYearResponse) {
          const updateUserProfileYearResponse = await req.db.collection(process.env.USERS_COLLECTION).updateOne(
            {
              uuid: uuid
            },
            {
              $set: {
                deleted: true
              }
            })
          if (updateUserProfileYearResponse) return resolve(true)
        }
        return resolve(false);
      } catch (error) {
        return reject(error);
      }
    })
  },
  getUserInfo: async (req, uuid) => {
    try {
      return req.db.collection(process.env.USERS_COLLECTION).findOne(
        {
          uuid: uuid,
          deleted: false
        },
        {
          projection: { _id: 1 }
        }
      )
    } catch (error) {
      throw error;
    }
  },
  getMembershipFormInfo: async (req, uuid, projection) => {
    try {
      const membershipFormCollectionName = req?.query?.formType === 'general' ? "general_membership_forms" : "corporate_membership_forms";
      return req.db.collection(membershipFormCollectionName).findOne(
        {
          _id: uuid,
          deleted: false
        },
        {
          projection: projection
        }
      )
    } catch (error) {
      throw error;
    }
  }
};

module.exports = async (req, res, next) => {
  try {
    if (req.params.uuid) {
      const [membershipFormInfo, userInfo] = await Promise.all([
        internalFun.getMembershipFormInfo(req, req.params.uuid, {
          uuid: 1,
        }),
        internalFun.getUserInfo(req, req.params.uuid)
      ]);
      if (membershipFormInfo && Object.keys(membershipFormInfo).length > 0 && userInfo && Object.keys(userInfo).length > 0) {


        const deleteResponse = await internalFun.updateUserProfileYear(req, req.params.uuid);
        if (deleteResponse) {
          return res.status(HTTPStatus.OK).json({
            status: HTTPStatus.OK,
            message: "Membership form deleted.",
          });
        } else {
          return res.status(HTTPStatus.BAD_REQUEST).json({
            status: HTTPStatus.BAD_REQUEST,
            message: "Membership form delete failed.",
          });
        }
      }
    }

    return res.status(HTTPStatus.NOT_FOUND).json({
      status: HTTPStatus.NOT_FOUND,
      message: 'Data not found.',
    });
  } catch (error) {
    return next(error);
  }
};

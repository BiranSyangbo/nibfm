
'use strict';
const HTTPStatus = require('http-status');

const internalFun = {
  deleteMembershipForm: async (req, uuid) => {
    try {
      const membershipFormCollectionName = req?.query?.formType === 'general' ? "general_membership_forms" : "corporate_membership_forms";
      return req.db.collection(membershipFormCollectionName).updateOne(
        {
          _id: uuid
        },
        {
          $set: {
            deleted: true
          }
        }
      )

    } catch (error) {
      throw error;
    }
  },
  deleteUser: async (req, uuid) => {
    try {
      return req.db.collection(process.env.USERS_COLLECTION).updateOne(
        {
          uuid: uuid
        },
        {
          $set: {
            deleted: true
          }
        })
    } catch (error) {
      throw error;
    }
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
        internalFun.getMembershipFormInfo(
          req,
          req.params.uuid,
          {
            uuid: 1,
          }),
        internalFun.getUserInfo(req, req.params.uuid)
      ]);

      if (membershipFormInfo && Object.keys(membershipFormInfo).length > 0) {
        const deleteMembershipFormResponse = await internalFun.deleteMembershipForm(req, req.params.uuid);
        if (deleteMembershipFormResponse) {
          if (userInfo && Object.keys(userInfo).length > 0) {
            const deleteUserResponse = await internalFun.deleteUser(req, req.params.uuid);
            if (deleteUserResponse) {
              return res.status(HTTPStatus.OK).json({
                status: HTTPStatus.OK,
                message: "Membership form deleted.",
              });
            }
          }

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

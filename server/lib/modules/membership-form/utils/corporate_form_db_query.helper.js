const moduleConfig = require('../config');
const collectionName = moduleConfig.corporateFormCollectionName

const uuid = require('uuid');

const insert = (req, insertObj) => {
  try {

    const organizationHeadOfcaddress = {
      country: insertObj?.organizationalInformation?.organizationHeadOfcaddress?.country,
      provinceNumber: insertObj?.organizationalInformation?.organizationHeadOfcaddress?.provinceNumber,
      district: insertObj?.organizationalInformation?.organizationHeadOfcaddress?.district,
      tole: insertObj?.organizationalInformation?.organizationHeadOfcaddress?.tole,
      wardNumber: insertObj?.organizationalInformation?.organizationHeadOfcaddress?.wardNumber
    }

    const organizationalInformation = {
      name: insertObj?.organizationalInformation?.name,
      chairpersonName: insertObj?.organizationalInformation?.chairpersonName,
      establishedDate: new Date(insertObj?.organizationalInformation?.date).toISOString().slice(0, 10),
      email: insertObj?.organizationalInformation?.email,
      bussinessContactNumber: insertObj?.organizationalInformation?.bussinessContactNumber,
      organizationPanNumber: insertObj?.organizationalInformation?.organizationPanNumber,
      phoneNumber: insertObj?.organizationalInformation?.phoneNumber,
      organizationDesccription: insertObj?.organizationalInformation?.organizationDesccription,
      note: insertObj?.organizationalInformation?.note,
      organizatioType: insertObj?.organizationalInformation?.organizationType,
      organizatioHeadOfcaddress: organizationHeadOfcaddress,
      companyRegistration: insertObj?.organizationalInformation?.company_registration

    }

    const insertObject = {
      _id: uuid.v4(),
      corporateMembershipNumber: insertObj?.corporateMembershipNumber,
      date: new Date(insertObj?.date),
      enterpriseSize: insertObj?.enterpriseSize,
      profileImage: insertObj?.profileImage,
      enterpriseSizeType: insertObj?.enterpriseSizeType,
      membershipPeriod: insertObj?.membershipPeriod,
      organizationalInformation,
      isApproved: 0,
      status: 'Pending',
      deleted: false,
      createdAt: new Date()

    }
    return req.db.collection(collectionName).insertOne(insertObject);
  } catch (error) {
    throw error;
  }
}
const corporateFormUpdateStatus = (req, tableId, profileYearObj, memberId) => {
  try {
    return req.db.collection(collectionName).updateOne({
      _id: tableId
    },
      {
        $set: {
          isApproved: req.body.isApproved,
          status: req.body.isApproved === 1 ? 'Approved' : 'Rejected',
          profileYear: profileYearObj?.profileYear ? new Date(profileYearObj?.profileYear) : null,
          memberId: memberId || null
        }
      })
  } catch (error) {
    throw error;
  }
}
const update = (req, insertObj, tableId) => {
  try {

    const organizationHeadOfcaddress = {
      country: insertObj?.organizationalInformation?.organizationHeadOfcaddress?.country,
      provinceNumber: insertObj?.organizationalInformation?.organizationHeadOfcaddress?.provinceNumber,
      district: insertObj?.organizationalInformation?.organizationHeadOfcaddress?.district,
      tole: insertObj?.organizationalInformation?.organizationHeadOfcaddress?.tole,
      wardNumber: insertObj?.organizationalInformation?.organizationHeadOfcaddress?.wardNumber
    }

    const organizationalInformation = {
      name: insertObj?.organizationalInformation?.name,
      chairpersonName: insertObj?.organizationalInformation?.chairpersonName,
      establishedDate: new Date(insertObj?.organizationalInformation?.date),
      email: insertObj?.organizationalInformation?.email.trim().toLowerCase(),
      bussinessContactNumber: insertObj?.organizationalInformation?.bussinessContactNumber,
      organizationPanNumber: insertObj?.organizationalInformation?.organizationPanNumber,
      phoneNumber: insertObj?.organizationalInformation?.phoneNumber,
      organizationDesccription: insertObj?.organizationalInformation?.organizationDesccription,
      note: insertObj?.organizationalInformation?.note,
      organizatioType: insertObj?.organizationalInformation?.organizationType,
      organizatioHeadOfcaddress: organizationHeadOfcaddress,
      companyRegistration: insertObj?.organizationalInformation?.company_registration
    }


    return req.db.collection(collectionName).updateOne({
      _id: tableId
    },
      {
        $set: {
          corporateMembershipNumber: insertObj?.corporateMembershipNumber,
          // date: insertObj?.date,
          enterpriseSize: insertObj?.enterpriseSize,
          profileImage: insertObj?.profileImage,
          enterpriseSizeType: insertObj?.enterpriseSizeType,
          membershipPeriod: insertObj?.membershipPeriod,
          organizationalInformation,
          modifiedDate: new Date().toISOString().slice(0, 10)
        }
      })
  } catch (error) {
    throw error;
  }
}

const deleteDocument = (req, tableId) => {
  try {
    return req.db.collection(collectionName).updateOne({
      _id: tableId
    },
      {
        $set: {
          deleted: true
        }
      })
  } catch (error) {
    throw error;
  }
}
const getList = (req, queryOpts, pagerOpts) => {
  try {
    return req.db.collection(collectionName).find(queryOpts)
      .project({
        uuid: 1,
        date: 1,
        corporateMembershipNumber: 1,
        enterpriseSizeType: 1,
        profileImage: 1,
        membershipPeriod: 1,
        organizationalInformation: 1,
        isApproved: 1,
        profileYear: 1,
        memberId: 1,
        createdAt: 1

      })
      .skip(pagerOpts.offset)
      .limit(pagerOpts.perPage)
      .sort({ createdAt: -1 })
      .toArray();
  } catch (error) {
    throw error;
  }
}

const countTotalItems = (req, queryOpts) => {
  try {
    return req.db.collection(collectionName).count(queryOpts);
  } catch (error) {
    throw error;
  }
}


const getCorporateFormDetail = (req, uuid, projection) => {
  try {
    return req.db.collection(collectionName).findOne(
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

module.exports = {
  insert,
  deleteDocument,
  corporateFormUpdateStatus,
  getList,
  getCorporateFormDetail,
  countTotalItems,
  update
}
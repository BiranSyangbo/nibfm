const moduleConfig = require('../config');
const collectionName = moduleConfig.corporateFormCollectionName

const uuid = require('uuid');

const insert = (req, insertObj) => {
  try {
    const enterpriseSizeType = {
      smallScale : insertObj?.enterpriseSizeType?.smallScale || false,
      mediumScale : insertObj?.enterpriseSizeType?.mediumScale || false,
      largeScale : insertObj?.enterpriseSizeType?.largeScale || false,

    }

    const membershipPeriod = {
      annual : insertObj?.membershipPeriod?.annual || false,
      lifetime : insertObj?.membershipPeriod?.lifetime || false,
    }

    const organizatioType = {
      architecturalEngineering : insertObj?.organizationalInformation?.organizatioType?.architecturalEngineering || false,
      architecturalConstruction : insertObj?.organizationalInformation?.organizatioType?.architecturalConstruction || false,
      interiorConstruction : insertObj?.organizationalInformation?.organizatioType?.interiorConstruction || false,
      interiorEngineering : insertObj?.organizationalInformation?.organizatioType?.interiorEngineering || false,
      societyConstruction : insertObj?.organizationalInformation?.organizatioType?.societyConstruction || false,
      societyEngineering : insertObj?.organizationalInformation?.organizatioType?.societyEngineering || false
    }

    const organizationHeadOfcaddress = {
      country : insertObj?.organizationalInformation?.organizationHeadOfcaddress?.country,
      provinceNumber : insertObj?.organizationalInformation?.organizationHeadOfcaddress?.provinceNumber,
      district : insertObj?.organizationalInformation?.organizationHeadOfcaddress?.district,
      tole : insertObj?.organizationalInformation?.organizationHeadOfcaddress?.tole,
      wardNumber : insertObj?.organizationalInformation?.organizationHeadOfcaddress?.wardNumber
    }

    const organizationalInformation = {
      organizationName: insertObj?.organizationalInformation?.organizationName,
      chairpersonName: insertObj?.organizationalInformation?.chairpersonName,
      date: new Date(insertObj?.organizationalInformation?.date),
      email: insertObj?.organizationalInformation?.email,
      bussinessContactNumber: insertObj?.organizationalInformation?.bussinessContactNumber,
      organizationPanNumber: insertObj?.organizationalInformation?.organizationPanNumber,
      phoneNumber: insertObj?.organizationalInformation?.phoneNumber,
      organizationDesccription: insertObj?.organizationalInformation?.organizationDesccription,
      note: insertObj?.organizationalInformation?.note,
      organizatioType : organizatioType,
      organizatioHeadOfcaddress : organizationHeadOfcaddress
    }

    const insertObject = {
      uuid: uuid.v4(),
      corporateMembershipNumber: insertObj?.corporateMembershipNumber,
      date: new Date(insertObj?.date),
      enterpriseSize: insertObj?.enterpriseSize,
      profileImage : insertObj?.profileImage,
      enterpriseSizeType : enterpriseSizeType,
      membershipPeriod : membershipPeriod,
      organizationalInformation : organizationalInformation,
      isApproved : false,
      deleted: false,
      createdAt: new Date()
    }
    return req.db.collection(collectionName).insertOne(insertObject);
  } catch (error) {
    throw error;
  }
}
const corporateFormUpdateStatus = (req, tableId) => {
  try {
    return req.db.collection(collectionName).updateOne({
      uuid: tableId
    },
      {
        $set: {
          isApproved: true
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
      .project({ uuid: 1, 
                date: 1, 
                corporateMembershipNumber: 1 ,
                enterpriseSizeType: 1 ,
                profileImage: 1 ,
                membershipPeriod: 1 ,
                organizationalInformation: 1 ,
                isApproved: 1 ,
                createdAt : 1

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
        uuid: uuid,
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
  countTotalItems
}
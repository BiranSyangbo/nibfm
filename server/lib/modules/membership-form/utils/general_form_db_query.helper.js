const moduleConfig = require('../config');
const collectionName = moduleConfig.generalFormCollectionName;
const adbs = require("ad-bs-converter");


const uuid = require('uuid');

const insert = (req, insertObj) => {
  try {
    const membershipPeriod = {
      annual : insertObj?.membershipPeriod?.annual || false,
      lifetime : insertObj?.membershipPeriod?.lifetime || false,
    }

    const membershipType = {
      general : insertObj?.membershipType?.general || false,
      student : insertObj?.membershipType?.student || false,
      honorary : insertObj?.membershipType?.honorary || false,
    }
  
    const address = {
      country :  insertObj?.personalInformation?.address?.country,
      district :  insertObj?.personalInformation?.address?.district,
      provinceNumber :  insertObj?.personalInformation?.address?.provinceNumber,
      tole :  insertObj?.personalInformation?.address?.tole,
      wardNumber :  insertObj?.personalInformation?.address?.wardNumber

    }

    const gender = {
      female: insertObj?.personalInformation?.gender?.female || false,
      male: insertObj?.personalInformation?.gender?.male || false,
      other: insertObj?.personalInformation?.gender?.other || false,
    }

    const personalInformation = {
      name : insertObj?.personalInformation?.name,
      phoneNumber : insertObj?.personalInformation?.phoneNumber,
      dateOfBirthBs : insertObj?.personalInformation?.dateOfBirthBs,
      dateOfBirthAd : insertObj?.personalInformation?.dateOfBirthAd,
      email : insertObj?.personalInformation?.email,
      nationality : insertObj?.personalInformation?.nationality,
      necLicenseNumber : insertObj?.personalInformation?.necLicenseNumber,
      address : address,
      gender : gender,
      academicInformation : insertObj?.personalInformation?.academicInformation
    }

    const insertObject = {
      uuid: uuid.v4(),
      date : insertObj.date,
      membershipNumber: insertObj.membershipNumber,
      profileImage : insertObj.profileImage,
      membershipPeriod: membershipPeriod,
      membershipType : membershipType,
      notes : insertObj.notes,
      singnature : insertObj.singnature,
      personalInformation : personalInformation,
      isApproved : false,
      deleted: false,
      createdAt: new Date().toISOString().slice(0, 10)
    }
    return req.db.collection(collectionName).insertOne(insertObject);
  } catch (error) {
    throw error;
  }
}
const generalFormUpdateStatus = (req, tableId) => {
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
                membershipNumber: 1,
                profileImage: 1,
                membershipPeriod: 1,
                membershipType: 1,
                notes: 1,
                singnature: 1,
                personalInformation: 1,
                isApproved : 1,
                createdAt: 1,
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


const getGeneralFormDetail = (req, uuid, projection) => {
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
  generalFormUpdateStatus,
  getList,
  getGeneralFormDetail,
  countTotalItems
}
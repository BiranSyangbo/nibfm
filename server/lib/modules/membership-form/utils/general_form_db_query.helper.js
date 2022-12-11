const moduleConfig = require('../config');
const collectionName = moduleConfig.generalFormCollectionName;
const adbs = require("ad-bs-converter");


const uuid = require('uuid');

const insert = (req, insertObj) => {
  try {

    const address = {
      country: insertObj?.personalInformation?.address?.country,
      district: insertObj?.personalInformation?.address?.district,
      provinceNumber: insertObj?.personalInformation?.address?.provinceNumber,
      tole: insertObj?.personalInformation?.address?.tole,
      wardNumber: insertObj?.personalInformation?.address?.wardNumber
    }

    const personalInformation = {
      name: insertObj?.personalInformation?.name,
      phoneNumber: insertObj?.personalInformation?.phoneNumber,
      dateOfBirthBs: new Date(insertObj?.personalInformation?.dateOfBirthBs).toISOString().slice(0, 10),
      dateOfBirthAd: new Date(insertObj?.personalInformation?.dateOfBirthAd).toISOString().slice(0, 10),
      email: insertObj?.personalInformation?.email,
      nationality: insertObj?.personalInformation?.nationality,
      necLicenseNumber: insertObj?.personalInformation?.necLicenseNumber,
      address: address,
      citizenshipFront: insertObj.citizenship_front,
      citizenshipBack: insertObj.citizen_back,
      academicCertificate: insertObj.academic_certificate,
      gender: insertObj?.personalInformation?.gender,
      academicInformation: insertObj?.personalInformation?.academicInformation
    }

    const insertObject = {
      _id: uuid.v4(),
      date: insertObj.date,
      membershipNumber: insertObj.membershipNumber,
      profileImage: insertObj.profileImage,
      membershipPeriod: insertObj?.membershipPeriod,
      membershipType: insertObj?.membershipType,
      notes: insertObj.notes,
      singnature: insertObj.singnature,
      personalInformation: personalInformation,
      isApproved: 0,
      deleted: false,
      status: 'Pending',
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
      _id: tableId
    },
      {
        $set: {
          isApproved: req.body.isApproved,
          status: req.body.isApproved === 1 ? 'Approved' : 'Rejected'
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

const update = (req, insertObj, tableId) => {
  try {

    const address = {
      country: insertObj?.personalInformation?.address?.country,
      district: insertObj?.personalInformation?.address?.district,
      provinceNumber: insertObj?.personalInformation?.address?.provinceNumber,
      tole: insertObj?.personalInformation?.address?.tole,
      wardNumber: insertObj?.personalInformation?.address?.wardNumber
    }

    const personalInformation = {
      name: insertObj?.personalInformation?.name,
      phoneNumber: insertObj?.personalInformation?.phoneNumber,
      dateOfBirthBs: new Date(insertObj?.personalInformation?.dateOfBirthBs),
      dateOfBirthAd: new Date(insertObj?.personalInformation?.dateOfBirthAd),
      email: insertObj?.personalInformation?.email,
      nationality: insertObj?.personalInformation?.nationality,
      necLicenseNumber: insertObj?.personalInformation?.necLicenseNumber,
      address: address,
      citizenshipFront: insertObj.citizenship_front,
      citizenshipBack: insertObj.citizen_back,
      academicCertificate: insertObj.academic_certificate,
      gender: insertObj?.personalInformation,
      academicInformation: insertObj?.personalInformation?.academicInformation
    }

    return req.db.collection(collectionName).updateOne({
      _id: tableId
    },
      {
        $set: {
          membershipNumber: insertObj.membershipNumber,
          profileImage: insertObj.profileImage,
          membershipPeriod: insertObj?.membershipPeriod,
          membershipType: insertObj?.membershipType,
          notes: insertObj.notes,
          singnature: insertObj.singnature,
          personalInformation: personalInformation,
          modifiedDate: new Date().toISOString().slice(0, 10)
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
        membershipNumber: 1,
        profileImage: 1,
        membershipPeriod: 1,
        membershipType: 1,
        notes: 1,
        singnature: 1,
        personalInformation: 1,
        isApproved: 1,
        createdAt: 1,
        status: 1
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
  generalFormUpdateStatus,
  getList,
  getGeneralFormDetail,
  countTotalItems,
  update
}
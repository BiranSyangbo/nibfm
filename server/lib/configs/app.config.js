module.exports = {
  officeInfo: {
    collectionName: "office_information",
    insertObj: {
      _id: '99b6ca24-7acb-11ec-8fc6-abfedf1fd748',
      name: process.env.OFFICE_NAME,
      email: process.env.OFFICE_EMAIL,
      phone: process.env.OFFICE_PHONE,
      location: process.env.OFFICE_LOCATION,
      logo: process.env.OFFICE_LOGO,
      short_description: process.env.SHORT_DESCRIPTION,
      long_description: process.env.LONG_DESCRIPTION,
      deleted: false,
      createdAt: new Date()
    }
  }
}
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
  },
  aboutUsInfo: {
    collectionName: "about-us",
    insertObj: {
      _id: '6d0409f6-8e80-11ec-8af2-db06f7fb15ac',
      title: 'About Us',
      slug: 'about-us',
      description: 'This is the description ',
      image: '',
      isActive: 1,
      metaTags: {
        metaTitle : 'about-us',
        metaKeyword : 'about-us',
        metaDescription : 'about-us'
      },
      deleted: false,
      createdAt: new Date()
    }
  }
}
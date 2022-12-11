const collectionName = 'EventManagement'
const uuid = require('uuid');

const insert = (req, insertObj) => {
  try {
    const insertObject = {
      _id: uuid.v4(),
      title: insertObj.title,
      slug: insertObj.slug,
      author: insertObj.author,
      description: insertObj.description,
      date: new Date(insertObj.date),
      image: insertObj.image,
      meta: {
        tag: insertObj.meta.tag,
        keyword: insertObj.meta.keyword,
        description: insertObj.meta.description
      },
      status: insertObj.status,
      deleted: false,
      createdAt: new Date(),
      createdBy: req.decoded.userId

    }
    return req.db.collection(collectionName).insertOne(insertObject);
  } catch (error) {
    throw error;
  }
}

const update = (req, insertObj, tableId) => {
  try {
    return req.db.collection(collectionName).updateOne({
      _id: tableId
    },
      {
        $set: {
          title: insertObj.title,
          slug: insertObj.slug,
          author: insertObj.author,
          description: insertObj.description,
          date: new Date(insertObj.date),
          image: insertObj.image,
          meta: {
            tag: insertObj.meta.tag,
            keyword: insertObj.meta.keyword,
            description: insertObj.meta.description
          },
          status: insertObj.status,
          updatedAt: new Date(),
          updatedBy: req.decoded.userId
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
          deleted: true,
          deletedAt: new Date(),
          deletedBy: req.decoded.userId
        }
      })
  } catch (error) {
    throw error;
  }
}

const getList = (req, queryOpts, pagerOpts, projectionField) => {
  try {
    return req.db.collection(collectionName).find(queryOpts)
      .project(projectionField)
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


const checkDonationExists = (req, uuid, projection) => {
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
const getDetails = (req, slug, projection) => {
  try {
    return req.db.collection(collectionName).findOne(
      {
        slug: slug,
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
const checkDuplicateSlug = (req, slug) => {
  try {
    return req.db.collection(collectionName).findOne(
      {
        slug: slug,
        deleted: false
      },
      {
        projection: {
          _id: 1
        }
      }
    )
  } catch (error) {
    throw error;
  }
}
module.exports = {
  insert,
  deleteDocument,
  getList,
  checkDonationExists,
  countTotalItems,
  update,
  checkDuplicateSlug,
  getDetails
}
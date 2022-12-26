const moduleConfig = require('../config');
const collectionName = moduleConfig.collectionName;
const uuid = require('uuid');

const insert = (req, insertObj) => {
  try {
    const insertObject = {
      uuid: uuid.v4(),
      title: insertObj.title,
      slug: insertObj.slug,
      author: insertObj.author,
      content: insertObj.content,
      publishedDate: new Date(insertObj.publishedDate) || new Date(),
      images: insertObj.image,
      isActive: insertObj.isActive,
      metaTags: insertObj.metaTags,
      deleted: false,
      createdAt: new Date()
    }
    return req.db.collection(collectionName).insertOne(insertObject);
  } catch (error) {
    throw error;
  }
}

const deleteBlog = (req, tableId) => {
  try {
    return req.db.collection(collectionName).updateOne({
      uuid: tableId
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
const updateBlog = (req, data, tableId) => {
  try {
    return req.db.collection(collectionName).updateOne({
      uuid: tableId
    },
      {
        $set: {
          title: data.title,
          slug: data.slug,
          author: data.author,
          content: data.content,
          publishedDate: new Date(data.publishedDate),
          images: data.image,
          isActive: data.isActive,
          metaTags: data.metaTags
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
        title: 1,
        slug: 1,
        author: 1,
        content: 1,
        publishedDate: 1,
        images: 1,
        isActive: 1,
        metaTags: 1
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

const checkBlogInfo = (req, uuid, projection) => {
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

module.exports = {
  insert,
  deleteBlog,
  getList,
  getDetails,
  countTotalItems,
  updateBlog,
  checkBlogInfo
}
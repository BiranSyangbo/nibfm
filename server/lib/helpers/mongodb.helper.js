const { MongoClient } = require('mongodb')

module.exports = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const client = new MongoClient(process.env.MONGODB_URL);
      await client.connect();
      console.log('Connected successfully to server');
      const db = client.db(process.env.MONGODB_NAME);

      return resolve(db)

    } catch (error) {
      return reject(error)
    }
  })
}
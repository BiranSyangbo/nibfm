
const uploadFile = require('./controllers/upload_file');
const authMiddleware = require('../../middleware/token_auth.middleware');

const express = require('express'),
    router = express.Router(),
    aws = require('aws-sdk'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION_S3_BUCKET
});

const app = express(),
    s3 = new aws.S3();


const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            console.log(file);
            cb(null, Date.now()+'_'+file.originalname);
        }
    })
});

router.route('/')
  .post(
    upload.single('file'), (req, res, next) => {
      uploadFile(req.file,res,next);
  });


module.exports = router;
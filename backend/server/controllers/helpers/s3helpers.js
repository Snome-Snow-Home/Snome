const config = require('../../../config.js');
const aws = require('aws-sdk');
const fs = require('fs');
const crypto = require('crypto')
const { promisify } = require('util')

// credit: https://iamsohail.medium.com/how-to-upload-multiple-files-parallelly-to-amazon-s3-3b9ac3630806

module.exports = {
    uploadToS3: uploadToS3,
    generateFileKey: generateFileKey
}

const AWS_REGION = config.aws.region
const AWS_ACCESS_KEY_ID = config.aws.accessKeyId
const AWS_SECRET_ACCESS_KEY = config.aws.secretAccessKey
const AWS_BUCKET_NAME = config.aws.bucketName

const s3 = new aws.S3({
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
})

async function uploadToS3(fileName, fileKey) {

    // this function should accept a file object and ranomly generated fileKey...
    // RETURN a promise to upload file to s3 bucket (specified by params) and return url on resolve


    return new Promise(async function(resolve, reject){
        const params = ({
            Bucket: AWS_BUCKET_NAME,
            Key: fileKey,
            ACL: 'public-read',
            Body: fs.createReadStream(fileName.path),
            ContentType: fileName.type
          })

          // send request to s3 api
          await s3.upload(params, function(s3Err, data) {
              if (s3Err) reject(s3Err);
              console.log(data.Location); // TEST
              resolve(data.Location);
          })
    })
}



function generateFileKey() {

    // function for generating random filename
    // should accept parameters for valid naming requirements?
    // should return random string to be used as a fileKey for object in s3 bucket
    
    const randomBytes = promisify(crypto.randomBytes)
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')

    return imageName;
}








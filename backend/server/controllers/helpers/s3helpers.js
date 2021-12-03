const config = require('../../../config.js');
const aws = require('aws-sdk');
const fs = require('fs');
const crypto = require('crypto')
const { promisify } = require('util')

// credit: https://iamsohail.medium.com/how-to-upload-multiple-files-parallelly-to-amazon-s3-3b9ac3630806

const region = config.s3.region
const accessKeyId = config.s3.accessKeyId
const secretAccessKey  = config.s3.secretAccessKey
const bucketName = config.s3.bucketName

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey
})

async function uploadToS3(file) {

    // this function should accept a file object and ranomly generated fileKey...
    // RETURN a promise to upload file to s3 bucket (specified by params) and return url on resolve


    return new Promise(async function(resolve, reject){
        const params = ({
            Bucket: bucketName,
            Key: file.filename,
            Body: fs.createReadStream(file.path),
        });

        // send request to s3 api
        await s3.upload(params, function(err, data) {
        if (err) {
            console.log("Error", err);
            reject(err);
        } if (data) {
            console.log("Upload Success", data.Location);
            resolve(data.Location);
        }
        })
    })
}

module.exports = {
    uploadToS3: uploadToS3
};
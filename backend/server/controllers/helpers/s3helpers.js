const config = require('../../../config.js');
const aws = require('aws-sdk');
const fs = require('fs-extra');
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

    // this function should accept a file object and ranomly generated filename...
    // RETURN a promise of S3 URL


    return new Promise(async function(resolve, reject){
        const params = ({
            Bucket: bucketName,
            Key: file.filename,
            Body: fs.createReadStream(file.path)
        });

        // send request to S3 API
        await s3.upload(params, function(err, data) {
        if (err) {
            console.log("Error", err);
            reject(err);
        } if (data) {
            console.log("Upload Success", data.Location);
            fs.remove(file.destination + file.filename, err => {
                if (err) return console.error(err)
                console.log('The file was successfully removed!')
              })
            resolve(data.Location);
        }
        })
    })
}

module.exports = {
    uploadToS3: uploadToS3
}; 
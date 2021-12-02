const multer = require('multer');

// create middleware for uploading snome photos to s3
// set key prefix for uploads into s3 bucket
const uploadSnomePhotos = multer({ dest: "snome-photos/" });

module.exports = {
    uploadSnomePhotos: uploadSnomePhotos,
}
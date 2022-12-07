const AWS = require('aws-sdk');
const fs = require('fs')

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
});

destroy = async (key) => {
    s3.deleteObject({ Bucket: process.env.AWS_BUCKET, Key: key }, (err, data) => {
        if(err == null){
            return true;
        }
    });
}

module.exports = {
    destroy
}
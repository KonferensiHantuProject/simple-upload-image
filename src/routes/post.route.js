// Contoh Routing
const express = require('express');
const validation = require('../middlewares/validator')
const router = express.Router();
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION
});

// Controller
const postController = require('../controllers/api/post.controller');

// Multer
const multer = require('multer');

// Storage for uploaded File
const storage = multerS3({
   s3: s3,
   acl: 'public-read',
   bucket: process.env.AWS_BUCKET,
   key: function (req, file, cb) {
       cb(null, file.originalname); //use Date.now() for unique file keys
   }
})

// Used Middleware
let upload = multer({ storage: storage })

// Index
router.get('/', postController.index);

// Post
router.post('/', upload.single('gambar'), validation.postCreateValidationRules(), validation.validate, postController.store);

// Update
router.put('/:_id', upload.single('gambar'), validation.postUpdateValidationRules(), validation.validate, postController.update);

// Delete
router.delete('/:_id', postController.destroy);

module.exports = router;
// Contoh Routing
const express = require('express');
const validation = require('../middlewares/validator')
const router = express.Router();
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

// S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION
});

// Controller
const postManualController = require('../controllers/api/post_manual.controller');

// Multer
const multer = require('multer');

// Storage for uploaded File
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
       cb(null, Date.now() + '-' + file.originalname);
    }
 });
 
// Used Middleware
const upload = multer({ storage: storage });

// Index
router.get('/', postManualController.index);

// Post
router.post('/', upload.single('gambar'), validation.postManualCreateValidationRules(), validation.validate, postManualController.store);

// Update
router.put('/:_id', upload.single('gambar'), validation.postManualUpdateValidationRules(), validation.validate, postManualController.update);

// Delete
router.delete('/:_id', postManualController.destroy);

module.exports = router;
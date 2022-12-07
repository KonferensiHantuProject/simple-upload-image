// Model
const PostPicture = require('../../models/post.model');

// Helper
const ResponseBulider = require('../../helpers/responseBuilder.helper');
const aws = require('../../helpers/s3.helper');

// Validation
const { validationResult } = require('express-validator');

// All Data
index = async (req, res) => {
    try {

        // Getting All Post with pagination
        const post = await PostPicture.find();

        return ResponseBulider.success(res, post);
    } catch (error) {
        // If Error
        return ResponseBulider.errors(res, 500, error.message);
    }
}

// Store Data
store = async (req, res) => {
    try {

        // Konstanta errors
        const errors = validationResult(req);

        // Kalau error
        if(!errors.isEmpty())
        {
            // Errors
            errors.errors.forEach(error => {
                // Status
                res.status(422);

                // Throw error
                throw new Error(error.msg);
            });

        }else{

            // Adding Image Url
            req.body.image_url = req.file.location;

            // Adding Image Path
            req.body.image_path = req.file.key;

            // Register
            PostPicture.create(req.body, (error, result) => {
    
                // Return 
                return ResponseBulider.success(res, result);
            });   
        }    
    } catch (error) {
        // If Error
        return ResponseBulider.errors(res, 500, error.message);
    }
}

// Update User
update = async (req, res) => {
    try {
        // Konstanta errors
        const errors = validationResult(req);

        // Kalau error
        if(!errors.isEmpty())
        {
            // Errors
            errors.errors.forEach(error => {
                // Status
                res.status(422);

                // Throw error
                throw new Error(error.msg);
            });

        }else{
            
            // Finding post
            const post = await PostPicture.findOne({  _id: req.params._id });

            // Check Image
            if(req.file){

                // Adding Image Url
                req.body.image_url = req.file.location;
    
                // Adding Image Path
                req.body.image_path = req.file.key;

                // Delete old image
                aws.destroy(post.image_path);
            }
            
            if(post == null) {
                // Status
                res.status(404);

                // Throw error
                throw new Error('User Not Found');
            }

            // Update User
            await post.updateOne(req.body).then( (result) =>{
                return ResponseBulider.success(res, result);
            });
        }

    } catch (error) {
        // If Error
        return ResponseBulider.errors(res, res.statusCode, error.message);
    }
}

// Delete Data
destroy = async (req, res) => {
    try {

        // Getting All Post with pagination
        const post = await PostPicture.findOne({ _id: req.params._id });

        // Delete Image
        aws.destroy(post.image_path);

        // Delete Process
        PostPicture.deleteOne({ _id: post._id }).then((result) => {
            
            // Redirect 
            return ResponseBulider.success(res, result);
        });     

    } catch (error) {
        // If Error
        return ResponseBulider.errors(res, 500, error.message);
    }
}

module.exports = {
    index,
    store,
    update,
    destroy
}
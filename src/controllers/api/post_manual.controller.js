// Model
const PostManual = require('../../models/post_manual.model');

// Helper
const ResponseBulider = require('../../helpers/responseBuilder.helper');
const imageHelper = require('../../helpers/image.helper');

// Validation
const { validationResult } = require('express-validator');

// All Data
index = async (req, res) => {
    try {

        // Getting All Post with pagination
        const post = await PostManual.find();

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

            // Preparing Image
            let image_data = imageHelper.buffer(req.file.filename);

            // Preparing Fields
            req.body.image = image_data.image;
            req.body.image_name = image_data.name;

            // Store
            PostManual.create(req.body, (error, result) => {
    
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
            const post = await PostManual.findOne({  _id: req.params._id });

            // Check Image
            if(req.file){

                // Preparing Image
                let image_data = imageHelper.buffer(req.file.filename);

                // Preparing Fields
                req.body.image = image_data.image;
                req.body.image_name = image_data.name;

                // Delete old image
                imageHelper.destroy(post.image_name);
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
        const post = await PostManual.findOne({ _id: req.params._id });

        // Delete Image
        imageHelper.destroy(post.image_name);

        // Delete Process
        PostManual.deleteOne({ _id: post._id }).then((result) => {
            
            // Redirect 
            return ResponseBulider.success(res, 'Post Deleted');
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
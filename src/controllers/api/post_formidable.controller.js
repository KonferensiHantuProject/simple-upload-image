const formidable = require('formidable');
const fs = require('fs');
const path = require('path')

// Model
const PostFormidable = require('../../models/post_formidable.model');

// Helper
const ResponseBulider = require('../../helpers/responseBuilder.helper');


// All Data
index = async (req, res) => {
    try {

        // Getting All Post with pagination
        const posts = await PostFormidable.find();

        // Adding Picture URL
        posts.forEach((post) => {
            post.image = 'http://localhost:3000/' + post.image;
        });

        return ResponseBulider.success(res, posts);
    } catch (error) {
        // If Error
        return ResponseBulider.errors(res, 500, error.message);
    }
}

// Store Data
store = async (req, res) => {
    try {

        // Form
        const form = new formidable.IncomingForm();

        // Parsing Form
        form.parse(req, function(err, fields, files){
            
            let oldPath = files.gambar.filepath;
            let newPath = path.join('./', '/uploads_formidable')+ '/' +files.gambar.originalFilename
            let rawData = fs.readFileSync(oldPath)

            // Add Picture
            fs.writeFile(newPath, rawData, function(err){
                if(err) console.log(err);
            })

            // Prepare Body
            req.body.image = newPath;
            req.body.title = fields.title;
            req.body.body = fields.body;

            // Store
            PostFormidable.create(req.body, (error, result) => {
    
                // Return 
                return ResponseBulider.success(res, result);
            }); 
        });

    } catch (error) {
        // If Error
        return ResponseBulider.errors(res, 500, error.message);
    }
}

// Update User
update = (req, res) => {
    try {

        // Form
        const form = new formidable.IncomingForm();

        // Parsing Form
        form.parse(req, async(err, fields, files) => {

            // Finding post
            const post = await PostFormidable.findOne({  _id: req.params._id });

            if(post == null) {
                // Status
                res.status(404);

                // Throw error
                throw new Error('User Not Found');
            }

            // Check File
            if(files.gambar.filepath)
            {
                // Delete Old Picture
                fs.unlink(post.image, (err) => {
                    if(err) console.log(err);
                });

                let oldPath = files.gambar.filepath;
                let newPath = path.join('./', '/uploads_formidable')+ '/' + files.gambar.originalFilename
                let rawData = fs.readFileSync(oldPath)
    
                // Add Picture
                fs.writeFile(newPath, rawData, (err) => {
                    if(err) console.log(err);
                })

                // Add Image
                req.body.image = newPath;
            }

            // Prepare Body
            req.body.title = fields.title;
            req.body.body = fields.body;

            // Update User
            await post.updateOne(req.body).then(() =>{
                return ResponseBulider.success(res, 'Post Updated');
            });
            
        });

    } catch (error) {
        // If Error
        return ResponseBulider.errors(res, res.statusCode, error.message);
    }
}

// Delete Data
destroy = async (req, res) => {
    try {

        // Getting All Post with pagination
        const post = await PostFormidable.findOne({ _id: req.params._id });

        // Delete Image
        fs.unlink(post.image, (err) => {
            if(err) console.log(err);
        });

        // Delete Process
        PostFormidable.deleteOne({ _id: post._id }).then((result) => {
            
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
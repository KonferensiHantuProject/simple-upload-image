const mongoose = require('mongoose');

// Skema Post
const postPictureSchema = new mongoose.Schema({ 
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    image_path: {
        type: String,
        required: true,
    },
    published: {
        type: Boolean
    }
    },    
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const PostPicture = mongoose.model('Post_With_Picture', postPictureSchema);

module.exports = PostPicture
const mongoose = require('mongoose');

// Skema Post
const postManualSchema = new mongoose.Schema({ 
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    image: {
        data: Buffer,
        contenType: String,
    },
    image_name: {
        type: String,
        required: true,
    },
    },    
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const PostPicture = mongoose.model('Post_Manual', postManualSchema);

module.exports = PostPicture
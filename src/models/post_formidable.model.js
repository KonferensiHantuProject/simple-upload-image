const mongoose = require('mongoose');

// Skema Post
const postFormidableSchema = new mongoose.Schema({ 
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    },    
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const PostPictureFormidable = mongoose.model('Post_Formidable', postFormidableSchema);

module.exports = PostPictureFormidable
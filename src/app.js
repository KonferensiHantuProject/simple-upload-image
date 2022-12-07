const express = require('express');
const methodOverride = require('method-override')
const  fs = require('fs');

// Upload Folder
const dir = './uploads';

// Checking Uploads Folder
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// Env
require('dotenv').config();

// Connection
require('./config/db');

const app = express();

// Set up method override
app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Seperate Route
const post_manual = require('./routes/post_manual.route');
const post_route = require('./routes/post.route');
app.use('/post', post_route);
app.use('/post_manual', post_manual);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Jalan di http://localhost:${PORT}`)
})
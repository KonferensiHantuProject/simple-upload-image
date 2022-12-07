const fs = require('fs');
const path = require('path');

// Returning Buffer
buffer = (filename) => {

    let dir = path.join(process.cwd() + '/uploads/' + filename);

    let data = {
        image: {
            data: fs.readFileSync(dir),
            contenType: 'image/png'
        },
        name: filename
    }

    return data
}

// Destroy Image
destroy = (filename) => {

    // Removing File
    fs.unlinkSync(process.cwd() + '/uploads/' + filename);

    return true
}

module.exports = {
 buffer,
 destroy
};
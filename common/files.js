const formidable = require('formidable');
const fs = require('fs').promises;

function getFiles(req) {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
                return;
            }

            resolve({ fields, files });
        });
    });
}

function saveFile(file, path) {
    return fs.rename(file.path, path);
}

function getExtensionName(filename) {
    return filename.split('.').pop();;
}

module.exports = {
    getFiles,
    saveFile,
    getExtensionName
}
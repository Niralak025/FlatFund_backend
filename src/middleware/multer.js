const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../src/uploads')
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        // console.log("ext-=--=", ext);

        const fileName = Date.now() + '-' + file.originalname;
        cb(null, fileName)
    }
})

const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 } // Increase file size limit to 50MB for file uploads
})

module.exports = { upload }
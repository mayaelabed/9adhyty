const multer = require("multer");

// Configure multer for file upload the logic goes here for the file upload
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "_" + uniqueSuffix + "_" + file.originalname);
    }
});
  
const upload = multer({ storage }).single("file");

module.exports = {
    upload
};
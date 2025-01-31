const multer = require("multer");
const path = require("path")

//Multer config for handling file uploads
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    //generate uinque file name
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|mp4|mov|avi|pdf|doc|docx|xlsx/; // Add more file types as needed
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("File type not supported!"));
  },
});

module.exports = upload;

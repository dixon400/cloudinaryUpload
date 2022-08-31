'use strict';

const multer = require('multer');

const storage = ()=>({
  destination: function(req, file, callback) {
    callback(null, 'uploads/');
  },
  filename: function (req, file, callback) {
    const ext = file.mimetype.split("/")[1];
    callback(null, `${file.originalname}`);
  }
});

const imageFilter = (req, file, cb) => {
    const ext = ['jpeg', 'jpg','png'];
    const filetype = file.mimetype.split("/")[1];
    if (ext.includes(filetype)) {
      cb(null, true);
    } else {
      cb("Please upload only an image.", false);
    }
  };


const uploadFile = multer({ storage: multer.diskStorage(storage()), fileFilter: (imageFilter), limits: { fileSize: 8000000 } });

module.exports = uploadFile;
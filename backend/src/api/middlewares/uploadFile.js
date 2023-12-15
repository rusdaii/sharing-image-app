const multer = require('multer');

const InvariantError = require('../../exeptions/InvariantError');

/**
 * @description File size image = 5mb
 */
const FILE_SIZE_IMAGE = 5 * 1024 * 1024;

const fileFilter = (acceptedFormat) => (req, file, callback) => {
  if (acceptedFormat.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new InvariantError('File format not accepted'));
  }
};

const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: FILE_SIZE_IMAGE,
  },
  fileFilter: fileFilter(['image/png', 'image/jpg', 'image/jpeg']),
});

const upload = (req, res, next) => {
  uploadImage.single('image')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          next(new InvariantError('File you upload exceeds the maximum limit'));
        }
      }

      next(err);
    }

    next();
  });
};

module.exports = {
  upload,
};

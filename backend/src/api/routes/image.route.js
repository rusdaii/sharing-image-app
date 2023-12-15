const ImageController = require('../controllers/image.controller');
const { upload } = require('../middlewares/uploadFile');
const authentication = require('../middlewares/authentication');

const router = require('express').Router();

router.get('/', authentication, ImageController.getImages);
router.post('/upload', upload, authentication, ImageController.uploadImage);
router.delete('/:id', authentication, ImageController.deleteImage);

module.exports = router;

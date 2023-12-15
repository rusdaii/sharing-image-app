const { upload } = require('../middlewares/uploadFile');
const AuthController = require('../controllers/auth.controller');

const router = require('express').Router();

router.post('/register', upload, AuthController.registerUser);
router.post('/login', AuthController.loginUser);

module.exports = router;

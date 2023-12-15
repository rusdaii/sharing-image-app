const router = require('express').Router();

const authRoute = require('./api/routes/auth.route');
const uploadROute = require('./api/routes/image.route');

router.use('/api/auth', authRoute);
router.use('/api/images', uploadROute);

module.exports = router;

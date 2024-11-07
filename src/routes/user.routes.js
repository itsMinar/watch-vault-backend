const registerUser = require('../controllers/user/registerUser.controller');
const loginUser = require('../controllers/user/loginUser.controller');
const logoutUser = require('../controllers/user/logoutUser.controller');
const { verifyJWT } = require('../middlewares/auth.middleware');

const router = require('express').Router();

// Public routes
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

// make rest of the request protected
router.use(verifyJWT);

// Private routes
router.route('/logout').post(logoutUser);

module.exports = router;

const addMovie = require('../controllers/movie/addMovie.controller');
const removeMovie = require('../controllers/movie/removeMovie.controller');
const { verifyJWT } = require('../middlewares/auth.middleware');
const { validateMongoId } = require('../middlewares/validate.middleware');

const router = require('express').Router();

// Public routes

// make rest of the request protected
router.use(verifyJWT);

// Private routes
router.route('/').post(addMovie);
router.route('/:movieId').delete(validateMongoId('movieId'), removeMovie);

module.exports = router;

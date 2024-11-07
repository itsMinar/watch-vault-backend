const { Movie } = require('../../models/movie.model');
const { ApiResponse } = require('../../utils/ApiResponse');
const { asyncHandler } = require('../../utils/asyncHandler');
const CustomError = require('../../utils/Error');

const removeMovie = asyncHandler(async (req, res, next) => {
  const { movieId } = req.params;

  // find the movie and delete it
  const deletedMovie = await Movie.findByIdAndDelete(movieId);

  if (!deletedMovie) {
    const error = CustomError.notFound({
      message: 'Movie not found!',
      errors: ['No movie found with the provided id'],
      hints: 'Please check id and try again',
    });

    return next(error);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, 'Movie Deleted Successfully.'));
});

module.exports = removeMovie;

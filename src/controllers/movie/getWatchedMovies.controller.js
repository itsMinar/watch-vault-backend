const { Movie } = require('../../models/movie.model');
const { ApiResponse } = require('../../utils/ApiResponse');
const { asyncHandler } = require('../../utils/asyncHandler');

const getWatchedMovies = asyncHandler(async (req, res) => {
  const { search, releaseYear, language, page = 1, limit = 20 } = req.query;

  // Convert page and limit to integers
  const validatedPage = Number.isInteger(+page) && +page > 0 ? +page : 1;
  const validatedLimit = Number.isInteger(+limit) && +limit > 0 ? +limit : 20;

  const filter = {
    author: req.user._id,
    isWatched: true,
  };

  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }
  if (releaseYear) {
    filter.releaseYear = releaseYear;
  }
  if (language) {
    filter.language = language.toUpperCase();
  }

  // Calculate the skip value for pagination
  const skip = (validatedPage - 1) * validatedLimit;

  // Find movies with pagination and sorting
  const movies = await Movie.find(filter)
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(validatedLimit);

  // Count the total number of movies for pagination metadata
  const totalMovies = await Movie.countDocuments(filter);

  // Create pagination metadata
  const pagination = {
    currentPage: validatedPage,
    totalPages: Math.ceil(totalMovies / validatedLimit),
    totalMovies,
    limit: validatedLimit,
  };

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { movies, pagination },
        'Watched Movie List Fetched Successfully.'
      )
    );
});

module.exports = getWatchedMovies;

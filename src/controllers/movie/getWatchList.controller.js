const { Movie } = require('../../models/movie.model');
const { ApiResponse } = require('../../utils/ApiResponse');
const { asyncHandler } = require('../../utils/asyncHandler');

const getWatchList = asyncHandler(async (req, res, next) => {
  const movies = await Movie.find({
    $and: [{ author: req.user._id, isWatched: false }],
  }).sort({ updatedAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, movies, 'Watch List Fetched Successfully.'));
});

module.exports = getWatchList;

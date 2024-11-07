const { Movie } = require('../../models/movie.model');
const { addMovieSchema } = require('../../schemas/movie.schemas');
const { ApiResponse } = require('../../utils/ApiResponse');
const { asyncHandler } = require('../../utils/asyncHandler');
const CustomError = require('../../utils/Error');

const addMovie = asyncHandler(async (req, res, next) => {
  // validate the request
  const parsedBody = addMovieSchema.safeParse(req.body);

  if (!parsedBody.success) {
    const error = CustomError.badRequest({
      message: 'Validation Error',
      errors: parsedBody.error.errors.map((err) => err.message),
      hints: 'Please provide all the required fields',
    });

    return next(error);
  }

  // Check if a movie already exists
  const existingMovie = await Movie.findOne({
    $and: [
      {
        title: { $regex: new RegExp(`^${parsedBody.data.title}$`, 'i') },
        releaseYear: parsedBody.data.releaseYear,
        country: { $regex: new RegExp(`^${parsedBody.data.country}$`, 'i') },
      },
    ],
  });

  if (existingMovie) {
    const error = CustomError.badRequest({
      message: 'Resource Conflict',
      errors: ['Movie already exists'],
      hints:
        'Ensure the resource you are trying to create does not already exist',
    });
    return next(error);
  }

  const movie = await Movie.create({
    ...parsedBody.data,
    author: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, movie, 'Movie Added Successfully.'));
});

module.exports = addMovie;

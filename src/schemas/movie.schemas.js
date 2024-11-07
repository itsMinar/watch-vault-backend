const { z } = require('zod');

const addMovieSchema = z.object({
  title: z
    .string({ message: 'title is required' })
    .min(1, { message: 'Title must be at least 1 character' }),
  releaseYear: z
    .number({ message: 'releaseYear is required' })
    .int({ message: 'releaseYear must be a valid Integer number' }),
  language: z
    .string({ message: 'language is required' })
    .min(1, { message: 'Language must be at least 1 character' }),
  poster: z
    .string({ message: 'poster is required' })
    .url({ message: 'poster must be a valid url' })
    .optional(),
  country: z
    .string({ message: 'country is required' })
    .min(1, { message: 'Country must be at least 1 character' }),
  isWatched: z
    .boolean({ message: 'isWatched must be a Boolean value' })
    .default(true),
});

module.exports = { addMovieSchema };

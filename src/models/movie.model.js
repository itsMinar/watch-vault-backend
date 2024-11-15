const { Schema, model } = require('mongoose');

// create Movie schema
const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
      uppercase: true,
    },
    poster: {
      type: String,
      required: true,
      default: 'https://placehold.co/200x300',
    },
    isWatched: {
      type: Boolean,
      required: true,
      default: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// create Movie model
const Movie = model('Movie', movieSchema);

module.exports = { Movie };

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    imdbId: String,
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
  })
 

module.exports = mongoose.model('Movie', movieSchema);
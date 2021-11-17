const mongoose = require('mongoose');

const addedSchema = mongoose.Schema({

  username: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const movieSchema = new mongoose.Schema({
    imdbId: String,
    users: [addedSchema]
  })
 

module.exports = mongoose.model('Post', movieSchema);
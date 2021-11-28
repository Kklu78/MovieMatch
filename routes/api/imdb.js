const express = require('express');
const router = express.Router();
const imdbCtrl = require('../../controllers/imdb');

/*---------- Public Routes ----------*/
router.get('/:key/search', imdbCtrl.APISearch);
router.get('/:id/movie', imdbCtrl.MovieSearch);
router.get('/:id/cast', imdbCtrl.CastSearch);
router.get('/:id/poster', imdbCtrl.getPoster);



/*---------- Protected Routes ----------*/




module.exports = router;
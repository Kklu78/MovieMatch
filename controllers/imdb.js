const REACT_APP_IMDB_KEY = process.env.REACT_APP_IMDB_KEY
const fetch = require("node-fetch");

module.exports = {
    APISearch,
    MovieSearch,
    CastSearch,
    getPoster

};


const searchList = [
    { key: 'mostPopular', name: 'Most Popular', url: `https://imdb-api.com/en/API/MostPopularMovies/${REACT_APP_IMDB_KEY}` },
    { key: 'nowPlaying', name: 'Now Playing', url: `https://imdb-api.com/en/API/InTheaters/${REACT_APP_IMDB_KEY}` },
    { key: 'top250', name: 'Top 250', url: `https://imdb-api.com/en/API/Top250Movies/${REACT_APP_IMDB_KEY}` },
    { key: 'comingSoon', name: 'Coming Soon', url: `https://imdb-api.com/en/API/ComingSoon/${REACT_APP_IMDB_KEY}` },

]

//Movie API Functions
function APISearch(req, res) {
    return (
        fetch(searchList.filter(x => x.key === req.params.key)[0].url)
        .then(response => response.json())
        .then(data => res.json({ data: data }))
    )

}

function MovieSearch(req, res) {
    const url = `https://imdb-api.com/en/API/Title/${REACT_APP_IMDB_KEY}/${req.params.id}`
    return (
        fetch(url)
        .then(response => response.json())
        .then(data => res.json({ data: data }))
    )

}

function CastSearch(req, res) {
    const url = `https://imdb-api.com/en/API/FullCast/${REACT_APP_IMDB_KEY}/${req.params.id}`
    return (
        fetch(url)
            .then(response => response.json())
            .then(data => res.json({ data: data }))
            )

}

function getPoster(req, res) {
    const url = `https://imdb-api.com/en/API/Posters/${REACT_APP_IMDB_KEY}/${req.params.id}`
    return (
        fetch(url)
            .then(response => response.json())
            .then(data => res.json({ data: data }))
            )

}
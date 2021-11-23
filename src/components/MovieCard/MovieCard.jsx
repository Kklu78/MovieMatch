import React, { useEffect, useState } from "react";
import { Card, Icon, Image} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import * as movieApi from '../../utils/movieApi'
import { moviePosters } from '../../context/Data'

const REACT_APP_IMDB_KEY = process.env.REACT_APP_IMDB_KEY


function MovieCard({ movieId, movie, movieDB }) {
    const { user, removeMovie, addMovie, } = React.useContext(AppContext)
    const [ImgData, setImgData] = useState(null);
    const [APImovie, setAPIMovie] = useState(movie);

    function MovieSearch(id) {
        console.log('MovieSearch')
        const url = `https://imdb-api.com/en/API/Title/${REACT_APP_IMDB_KEY}/${id}`
        return (
            fetch(url)
                .then(response => response.json())
                .then(data => setAPIMovie(data))
        )
    }

    function getPoster(movieId) {
        const url = `https://imdb-api.com/en/API/Posters/${REACT_APP_IMDB_KEY}/${movieId}`

        return (
            fetch(url)
                .then(response => response.json())
                .then(data => !!data.posters[0]?.link ? setImgData(data.posters[0]?.link) : setImgData(movie?.image))
        )
    }

    useEffect(() => {
        movie ? setAPIMovie(movie) : MovieSearch(movieId)
        moviePosters[movie?.id] ? setImgData(moviePosters[movie.id]) : getPoster(movie.id)// setImgData(movie?.image) Replace with this to reduce API calls
    }, [movieDB]);

    const inList = movieDB?.length && user ? movieDB[0].users.includes(user._id) : false
    const liked = inList ? 'red' : 'grey'
    const clickHandler =
        inList
            ? () => removeMovie(APImovie.id)
            : () => addMovie(APImovie.id)

    const Rated = movie?.imDbRating ? <Card.Description className={"ui center aligned"}><Icon name={'star'} color='yellow'></Icon>IMDB Rating: {movie.imDbRating}</Card.Description> : <Card.Description className={"ui center aligned"}><Icon name={'star'} color='yellow'></Icon>No Rating Available</Card.Description>


    return (
        <Card style={{ 'border': '.5px solid', 'boxShadow': '1px 1px 2px #888888' }}>            
            <Card.Content>
                <Card.Header className={"ui center aligned"}>
                    {APImovie?.title}
                </Card.Header>
                {Rated}
            </Card.Content>
            <Image as={Link} to={`/${APImovie?.id}`} src={`${ImgData ? ImgData : APImovie?.image}`} wrapped ui={false} />
            <Card.Content>
                {APImovie?.stars}
                <Card.Description>{APImovie?.plot}</Card.Description>
            </Card.Content>
            <Card.Content extra textAlign={"center"}>
                <Icon name={"heart"} size="large" color={liked} onClick={clickHandler} />
                Add To Favorites
            </Card.Content>
        </Card>
    );
}

export default MovieCard;

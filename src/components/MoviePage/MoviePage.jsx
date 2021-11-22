import React, { useState, useEffect } from "react";
import { Item, Icon, Card, Header } from "semantic-ui-react";
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom'
import ActorCard from '../ActorCard/ActorCard'
import MovieCard from '../MovieCard/MovieCard'
const REACT_APP_IMDB_KEY = process.env.REACT_APP_IMDB_KEY

export default function MoviePage() {
    const { movie } = useParams();
    const { user, MovieSearch, movieData, CastSearch, castData, addMovie, removeMovie, moviesList, getMovies } = React.useContext(AppContext)
    const [ImgData, setImgData] = useState(null);




    function getPoster(movieId) {
        const url = `https://imdb-api.com/en/API/Posters/${REACT_APP_IMDB_KEY}/${movieId}`

        return (
            fetch(url)
                .then(response => response.json())
                .then(data => setImgData(data.posters[0]?.link))
        )
    }

    const movieDB = moviesList.movie?.filter(m => m.imdbId === movieData.id)

    useEffect(() => {
        MovieSearch(movie)
        CastSearch(movie)
        getPoster(movie)
        getMovies()
    }, [movie])


    const Cast = castData.actors?.slice(0, 8).map((actor, i) => {
        return <ActorCard key={i} actor={actor} />
    })


    const inList = movieDB?.length && user ? movieDB[0].users.includes(user._id) : false

    const liked = inList ? 'red' : 'grey'



    const clickHandler =
        inList
            ? () => removeMovie(movie)
            : () => addMovie(movie)


    const Movies = movieData.similars?.slice(0, 6).map((movie, i) => {
        const movieDB = moviesList.movie?.filter(m => m.imdbId === movie.id)
        return (
            <MovieCard key={i} movieId={movie.id} movie={movie} movieDB={movieDB} />
        )
    })
    return (
        <Item.Group style={{ 'paddingLeft': 50, 'paddingRight': 50 }}>
            <Item>
                <Item.Image style={{ 'border': '1px solid', 'boxShadow': '3px 5px 4px #888888' }} size='large' src={`${ImgData}`} />

                <Item.Content>
                    <Item.Header style={{ 'fontSize': 40, 'paddingTop': 15 }}>{movieData.fullTitle}</Item.Header>
                    <Item.Meta style={{ 'fontSize': 20, 'color':'dark gray' }}>{movieData.genres}</Item.Meta>
                    <Item.Meta style={{ 'fontSize': 15, 'color': 'black' }}> <Icon name={"heart"} size="large" color={liked} onClick={clickHandler} />Add To Favorites
                    <Icon style={{ 'fontSize': 20, 'paddingLeft': 2}} name={'star'} color='yellow'></Icon>IMDB Rating: {movieData.imDbRating}
                    </Item.Meta>
                    <Item.Meta style={{ 'fontSize': 15 }}>Produced by {movieData.companies}</Item.Meta>
                    <Item.Meta style={{ 'fontSize': 15 }}>Directed by {movieData.directors}</Item.Meta>

                    <Item.Description style={{ 'fontSize': 20 }}>
                        {movieData.plot}
                    </Item.Description>
                    <Item.Header style={{ 'fontSize': 30, 'paddingTop': 30, 'paddingBottom': 20 }}>Cast</Item.Header>
                    <Card.Group>
                        {Cast}
                    </Card.Group>
                </Item.Content>
            </Item>
            <Item style={{ 'paddingTop': 20 }}>
                <Item.Content>
                <Header style={{'fontSize': 40, 'paddingTop': 15, 'paddingLeft':15 }}>You May Also Like</Header>
                    <Card.Group style={{ 'paddingTop': 20 }} className={'CardGroup'} itemsPerRow={6} stackable>
                        {Movies}
                    </Card.Group>
                </Item.Content>
            </Item>
        </Item.Group>
    )
}
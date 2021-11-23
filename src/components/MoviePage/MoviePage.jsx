import React, { useState, useEffect } from "react";
import { Item, Icon, Card, Header, Loader, Dimmer } from "semantic-ui-react";
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom'
import ActorCard from '../ActorCard/ActorCard'
import MovieCard from '../MovieCard/MovieCard'
import { moviePosters, allMoviesSearch } from '../../context/Data'
import "./MoviePage.css";
const REACT_APP_IMDB_KEY = process.env.REACT_APP_IMDB_KEY

export default function MoviePage() {
    const { movie } = useParams();
    const { user, CastSearch, castData, addMovie, removeMovie, moviesList, getMovies, allMovies, setTitle } = React.useContext(AppContext)
    const [ImgData, setImgData] = useState(null);
    const [MoviePageData, setMoviePageData] = useState(allMoviesSearch[movie]);
    const [loading, setLoading] = useState(true)



    function getPoster(movieId) {
        const url = `https://imdb-api.com/en/API/Posters/${REACT_APP_IMDB_KEY}/${movieId}`

        return (
            fetch(url)
                .then(response => response.json())
                .then(data => setImgData(data.posters[0]?.link))
        )
    }

    function MovieSearch(id) {
        const url = `https://imdb-api.com/en/API/Title/${REACT_APP_IMDB_KEY}/${id}`
        return (
            fetch(url)
                .then(response => response.json())
                .then(data => !!data.id ? setMoviePageData(data) : setMoviePageData(allMoviesSearch[movie]))
        )
    }

    const movieDB = moviesList.movie?.filter(m => m.imdbId === movie)

    useEffect(() => {
        setLoading(true)
        MovieSearch(movie)
        moviePosters[movie] ? setImgData(moviePosters[movie]) : getPoster(movie)
        CastSearch(movie)
        getMovies()
        setTitle('Movie Details')
        setTimeout(() => setLoading(false), Math.floor(Math.random() * 500)+ 250)
    }, [movie])


    const Cast = allMoviesSearch[movie]?.actorList?.slice(0, 8).map((actor, i) => {
        return <ActorCard key={i} actor={actor} />
    })


    const inList = movieDB?.length && user ? movieDB[0].users.includes(user._id) : false

    const liked = inList ? 'red' : 'grey'



    const clickHandler =
        inList
            ? () => removeMovie(movie)
            : () => addMovie(movie)


    const Movies = !!MoviePageData?.similars ? MoviePageData.similars?.slice(0, 6).map((movie, i) => {
        const movieDB = moviesList.movie?.filter(m => m.imdbId === movie.id)
        return (
            <MovieCard key={i} movieId={movie.id} movie={movie} movieDB={movieDB} />
        )
    }) : null

    
    return (<>
    {loading ? (
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
      ) : 
    
        
        <Item.Group style={{ 'paddingLeft': 50, 'paddingRight': 50 }}>
            <Item>
                <Item.Image className={'poster'} size='large' src={`${ImgData}`} />

                <Item.Content>
                    <Item.Header style={{ 'fontSize': 40, 'paddingTop': 15 }}>{MoviePageData?.fullTitle ? MoviePageData?.fullTitle : MoviePageData?.title}</Item.Header>
                    <Item.Meta style={{ 'fontSize': 20, 'color': 'dark gray' }}>{MoviePageData?.genres}</Item.Meta>
                    <Item.Meta style={{ 'fontSize': 15, 'color': 'black' }}> <Icon name={"heart"} size="large" color={liked} onClick={clickHandler} />Add To Favorites
                        <Icon style={{ 'fontSize': 20, 'paddingLeft': 2 }} name={'star'} color='yellow'></Icon>IMDB Rating: {MoviePageData?.imDbRating}
                    </Item.Meta>
                    <Item.Meta style={{ 'fontSize': 15 }}>Produced by {MoviePageData?.companies}</Item.Meta>
                    <Item.Meta style={{ 'fontSize': 15 }}>Directed by {MoviePageData?.directors}</Item.Meta>

                    <Item.Description style={{ 'fontSize': 20 }}>
                        {MoviePageData?.plot}
                    </Item.Description>
                    <Item.Header style={{ 'fontSize': 30, 'paddingTop': 30, 'paddingBottom': 20 }}>Cast</Item.Header>
                    <Card.Group>
                        {Cast}
                    </Card.Group>
                </Item.Content>
            </Item>
            <Item style={{ 'paddingTop': 20 }}>
                <Item.Content>
                    <Header style={{ 'fontSize': 40, 'paddingTop': 15, 'paddingLeft': 15 }}>You May Also Like</Header>
                    <Card.Group style={{ 'paddingTop': 20 }} className={'CardGroup'} itemsPerRow={6} stackable>
                        {Movies}
                    </Card.Group>
                </Item.Content>
            </Item>
        </Item.Group>
}
        </>
    )
}
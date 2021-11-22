import React, { useEffect } from "react";
import { Card } from "semantic-ui-react";
import MovieCard from "../MovieCard/MovieCard";
import { AppContext } from '../../context/AppContext'


export default function MovieFeed() {
    const { AppData, user, APISearch, APIUrl, getMovies, moviesList } = React.useContext(AppContext)


    useEffect(() => {
        APISearch(APIUrl)
        getMovies()
    }, [])


    const Movies = AppData.items?.map((movie, i) => {
        const movieDB = moviesList.movie?.filter(m => m.imdbId === movie.id)
        return (
            <MovieCard key={i} movieId={movie.id} movie={movie} movieDB={movieDB} />
        )
    })

    return (<>
        <Card.Group className={'CardGroup'} itemsPerRow={5} stackable>
            {Movies}
        </Card.Group>
    </>

    );
}

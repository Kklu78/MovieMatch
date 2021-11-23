import React, { useEffect, useState } from "react";
import { Card, Loader, Dimmer, Segment, Image } from "semantic-ui-react";
import MovieCard from "../MovieCard/MovieCard";
import { AppContext } from '../../context/AppContext'
import { menuDict } from '../../context/Data'


export default function MovieFeed() {
    const { AppData, user, APISearch, APIUrl, getMovies, moviesList, Title } = React.useContext(AppContext)
    const [loading, setLoading] = useState(true)
    const MoviesData = Boolean(AppData.items?.length) ? AppData : menuDict[Title]

    const Movies = MoviesData?.items?.map((movie, i) => {
        const movieDB = moviesList.movie?.filter(m => m.imdbId === movie.id)
        return (
            <MovieCard key={i} movieId={movie.id} movie={movie} movieDB={movieDB} />
        )
    })

    useEffect(() => {
        setLoading(true)
        APISearch(APIUrl)
        getMovies()
        setTimeout(() => setLoading(false), Math.floor(Math.random() * 500)+ 500)

    }, [Title])

    return (<>
            {loading ? (
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
      ) : 
      <Card.Group className={'CardGroup'} itemsPerRow={5} stackable>
      {Movies}
      </Card.Group>
}
            
    </>

    );
}

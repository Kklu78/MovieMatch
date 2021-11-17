import React, {useEffect} from "react";
import { Card, Image } from "semantic-ui-react";
import MovieCard from "../MovieCard/MovieCard";
import { AppContext } from '../../context/AppContext'

export default function MovieFeed() {
    const {AppData, user, APISearch, searchList} = React.useContext(AppContext)

    useEffect(() => {
      APISearch(searchList.filter(search => {return search.key === 'mostPopular'})[0].url);
    }, []);

    const Movies = AppData.items?.map((movie, i) => {
        return (
            <MovieCard key={i}  movie={movie} />
        )
    })

  return (<>
  <h1 align='center'>{}</h1>
      <Card.Group itemsPerRow={5} stackable>
        {Movies}
    </Card.Group>
  </>

  );
}

import React, {useEffect, useState} from "react";
import { Card, Icon, Image, Transition} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
import * as movieApi from '../../utils/movieApi'
const REACT_APP_IMDB_KEY=process.env.REACT_APP_IMDB_KEY


function ProfileCard({ movieId, movieDB }) {

    const { user, removeMovie, addMovie } = React.useContext(AppContext)
    const [movie, setMovie] = useState(null);
    const [ImgData, setImgData] = useState(null);

    function MovieSearch(id) {
		const url = `https://imdb-api.com/en/API/Title/${REACT_APP_IMDB_KEY}/${id}`
		return (
			fetch(url)
				.then(response => response.json())
				.then(data => setMovie(data))
		)
	}

    // UNBLOCK FOR HIGH RES IMAGES

    // function getPoster(movieId) {
	// 	const url = `https://imdb-api.com/en/API/Posters/${REACT_APP_IMDB_KEY}/${movieId}`
		
	// 	return (
	// 		fetch(url)
	// 		.then(response => response.json())
	// 		.then(data => setImgData(data.posters[0]?.link))			
	// 	)
	// }

    useEffect(() => {
        // getPoster(movie.id)
        MovieSearch(movieId)

    }, [movieDB]);
    const inList = movieDB?.length && user ? movieDB[0].users.includes(user._id) : false

    const liked = inList ? 'red' : 'grey'

    const clickHandler =
    inList
      ? () => removeMovie(movieId)
      : () => addMovie(movieId)

    const Rated = movie?.imDbRating ? <Card.Description className={"ui center aligned"}><Icon name={'star'} color='yellow'></Icon>IMDB Rating: {movie.imDbRating}</Card.Description> : null


    return (
            <Card>
            <Card.Content>
                <Card.Header className={"ui center aligned"}>
                    {movie?.title}
                </Card.Header>
                {Rated}
            </Card.Content>
            <Image as='a' href={`/${movie?.id}`} src={`${ImgData ? ImgData : movie?.image}`} wrapped ui={false} />
            <Card.Content>
               {movie?.stars}
                <Card.Description>{movie?.plot}</Card.Description>
            </Card.Content>
            <Card.Content extra textAlign={"center"}>
                <Icon name={"heart"} size="large" color={liked} onClick={clickHandler} />
                Add To Favorites
            </Card.Content>
            </Card>
    );
}

export default ProfileCard;

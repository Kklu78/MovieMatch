import React, {useEffect, useState} from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AppContext } from '../../context/AppContext'
const REACT_APP_IMDB_KEY=process.env.REACT_APP_IMDB_KEY


function PostCard({ movie }) {

    const { user } = React.useContext(AppContext)
    const [ImgData, setImgData] = useState(null);

    // UNBLOCK FOR HIGH RES IMAGES

    // function getPoster(movieId) {
	// 	const url = `https://imdb-api.com/en/API/Posters/${REACT_APP_IMDB_KEY}/${movieId}`
		
	// 	return (
	// 		fetch(url)
	// 		.then(response => response.json())
	// 		.then(data => setImgData(data.posters[0]?.link))			
	// 	)
	// }

    // useEffect(() => {
    //     getPoster(movie.id)
    // }, []);


    return (
        <Card raised>
            <Card.Content textAlign="left">
                <Card.Header className={"ui center aligned header"}>
                    {movie.title}
                </Card.Header>
            </Card.Content>
            <Image as='a' href={`/${movie.id}`} src={`${ImgData ? ImgData : movie.image}`} wrapped ui={false} />
            <Card.Content>
               {movie.stars}
            </Card.Content>
            <Card.Content>
                <Card.Description>{movie.plot}</Card.Description>
            </Card.Content>
            <Card.Content extra textAlign={"right"}>
                <Icon name={"heart"} size="large" />
                { } Likes
            </Card.Content>
        </Card>
    );
}

export default PostCard;

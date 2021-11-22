import React, { useEffect } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import MovieCard from "../MovieCard/MovieCard";
import { AppContext } from '../../context/AppContext'
import { useParams } from "react-router-dom";



export default function Profile() {
    const { user, moviesList, getMovies, allMovies, setTitle, allUsers, getAllUsers
            , getFriends, friendStatus, friendRequest, acceptRequest, rejectRequest } = React.useContext(AppContext)
    const { userId } = useParams();




    const Movies = moviesList.movie?.map((movie, i) => {

        return (userId === user._id
            ? <MovieCard key={i} movieId={movie.imdbId} movie={allMovies[movie.imdbId]} movieDB={[movie]} />
            : movie.users.includes(userId) && movie.users.includes(user._id)
                ? <MovieCard key={i} movieId={movie.imdbId} movie={allMovies[movie.imdbId]} movieDB={[movie]} />
                : null)
    })

    const Header = userId === user._id 
    ? <Grid.Row><h2>Your Favorites</h2></Grid.Row> 
    : <Grid.Row><h2>Favorite Movies You Share With {allUsers.filter(user => user._id === userId)[0]?.username}</h2></Grid.Row>
    
    
    
    const FriendStatusDict = {
        0:<Grid.Row><Button color={'blue'} href={`/profile/${userId}`} onClick={() => friendRequest(userId)}content='Add Friend' /></Grid.Row>,
        1:<Grid.Row><Button color={'grey'} content='Friend Requested' disabled /></Grid.Row>,
        2:<Grid.Row><Button color={'blue'} href={`/profile/${userId}`} onClick={() => acceptRequest(userId)}content='Accept Friend Request' /></Grid.Row>,
        3:<Grid.Row><Button color={'vk'} content='You Are Friends' /></Grid.Row>
    }

    const friendStatusKey = userId === user._id ? null : friendStatus.friends?.length ? friendStatus.friends[0].status : 0
    

    useEffect(() => {
        getMovies()
        getAllUsers()
        getFriends(userId)
        setTitle(`${allUsers?.filter(user => user._id === userId)[0]?.username}`)
    }, [userId])



    return (<>
        <Grid centered>
            {Header}
            {FriendStatusDict[friendStatusKey]}
            
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 1500 }}>
                    <Card.Group className={'CardGroup'} itemsPerRow={5} stackable>
                        {Movies}
                    </Card.Group>
                </Grid.Column>
            </Grid.Row>
        </Grid>

    </>

    );
}

import React, { useEffect, useState } from "react";
import { Card, Grid, Button, Loader, Dimmer } from "semantic-ui-react";
import MovieCard from "../MovieCard/MovieCard";
import { AppContext } from '../../context/AppContext'
import { useParams } from "react-router-dom";



export default function Profile() {
    const { user, moviesList, getMovies, allMovies, setTitle, allUsers, getAllUsers
        , getFriends, friendStatus, friendRequest, acceptRequest, rejectRequest } = React.useContext(AppContext)
    const { userId } = useParams();
    const [loading, setLoading] = useState(true)

    const Movies = moviesList.movie?.map((movie, i) => {

        return (userId === user._id
            ? <MovieCard key={i} movieId={movie.imdbId} movie={allMovies[movie.imdbId]} movieDB={[movie]} />
            : movie.users.includes(userId) && movie.users.includes(user._id)
                ? <MovieCard key={i} movieId={movie.imdbId} movie={allMovies[movie.imdbId]} movieDB={[movie]} />
                : null)
    })

    const Header = userId === user._id
        ? <Grid.Row><h1>Your Favorites</h1></Grid.Row>
        : <Grid.Row><h1>Favorite Movies You Share With {allUsers.filter(user => user._id === userId)[0]?.username}</h1></Grid.Row>



    const FriendStatusDict = {
        0: <Grid.Row><Button color={'blue'} href={`/profile/${userId}`} onClick={() => friendRequest(userId)} content='Add Friend' /></Grid.Row>,
        1: <Grid.Row><Button color={'grey'} content='Friend Requested' disabled /></Grid.Row>,
        2: <Grid.Row><Button color={'blue'} href={`/profile/${userId}`} onClick={() => acceptRequest(userId)} content='Accept Friend Request' /></Grid.Row>,
        3: <Grid.Row><Button color={'vk'} content='You Are Friends' /></Grid.Row>
    }

    const friendStatusKey = userId === user._id ? null : friendStatus.friends?.length ? friendStatus.friends[0].status : 0


    useEffect(() => {
        setLoading(true)
        getMovies()
        getAllUsers()
        getFriends(userId)
        setTitle(`${allUsers?.filter(user => user._id === userId)[0]?.username}`)
        setTimeout(() => setLoading(false), Math.floor(Math.random() * 500)+ 250)

    }, [userId])



    return (<>

        {loading ? (
            <Dimmer active inverted>
                <Loader size="large">Loading</Loader>
            </Dimmer>
        ) :
            <Grid centered>
                {Header}
                {FriendStatusDict[friendStatusKey]}
                {friendStatusKey === 3 || userId === user._id ?
                    (<Grid.Row>
                        <Grid.Column style={{ maxWidth: 1500 }}>
                            <Card.Group className={'CardGroup'} itemsPerRow={5} stackable>
                                {Movies}
                            </Card.Group>
                        </Grid.Column>
                    </Grid.Row>)
                    : <h2>You Must Be Friends With This Person To See Shared Movies</h2>}
            </Grid>
        }
    </>

    );
}

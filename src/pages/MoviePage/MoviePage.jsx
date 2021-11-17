import React, { useState, useEffect, useContext } from "react";
import { Item, Image } from "semantic-ui-react";
import { AppContext } from '../../context/AppContext';
import { useParams} from 'react-router-dom'
import ActorCard from '../../components/ActorCard/ActorCard'


export default function MoviePage() {
    const { movie } = useParams();
    const {MovieSearch, movieData, CastSearch, castData} = React.useContext(AppContext)
    console.log(castData)

    useEffect(()=> {
        MovieSearch(movie)
        CastSearch(movie)
    }, [])

    const Cast = castData.actors.map((actor) => {
        return <ActorCard actor={actor}  />
    })




    return (
        <Item.Group>
    <Item>
      <Item.Image size='large' src={`${movieData.image}`} />

      <Item.Content>
        <Item.Header as='a'>{movieData.title}</Item.Header>
        <Item.Meta>{movieData.companies}</Item.Meta>
        <Item.Meta>Directed by {movieData.directors}</Item.Meta>

        <Item.Description>
            {movieData.plot}
        </Item.Description>
        <Item.Description>
            {Cast}
        </Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item>
        </Item.Group>
    )
}
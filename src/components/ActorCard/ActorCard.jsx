import React, {useEffect, useState} from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AppContext } from '../../context/AppContext'

export default function ActorCard({ actor }) {

    const { user } = React.useContext(AppContext)
    

    return (
        <Card raised>
      <Card.Content>


        <Image
          floated='right'       
          size='massive'
          src={`${actor.image}`}          
          className='photo'
          style={{'width':125, 'height':125, 'objectFit':'cover', 'objectPosition':'30% 10%', 'boxShadow': '2px 4px 4px #888888'}}
          circular
        />
      <Card.Header><strong>{actor.name}</strong></Card.Header>
      <Card.Meta> as {actor.asCharacter}</Card.Meta>
      </Card.Content>
      
    </Card>
    );
}



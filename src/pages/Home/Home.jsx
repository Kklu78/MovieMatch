import React, { useState, useEffect, useContext } from "react";
import { Grid } from "semantic-ui-react";
import { AppContext } from '../../context/AppContext';
import MovieFeed from '../../components/MovieFeed/MovieFeed'


export default function Home() {


    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 1500 }}>
                    
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 1500 }}>
                    <MovieFeed />
                  </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

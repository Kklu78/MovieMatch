import React from 'react';
import { Navigate } from 'react-router';

export default function Protected(props){
    if(!props.user){
        return <Navigate to = '/login' replace/>

    }
    return <>{props.children}</>
}
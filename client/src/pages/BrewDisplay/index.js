import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import API from '../../utils/api';

import "./styles.css"

export default function BrewDisplay() {

    let [brew, setBrew] = useState({});

    let { brewId } = useParams();

    useEffect(() => {
        API.getSpecificBrew(brewId)
            .then((data) => {
                console.log(data.data);
                setBrew(data.data);
            })
    }, []);

    return (<div>
        <h2>{brew.name}</h2>
        <p>Created by <a href={`/user/${brew.UserId}`}>{brew.author}</a></p>
        <p>{brew.description}</p>
    </div>);
}
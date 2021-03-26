import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import API from '../../utils/api';
import "./styles.css"

export default function UserDisplay() {

    let [userData, setUserData] = useState({});

    let { userId } = useParams();

    useEffect(() => {
        API.getUserProfile(userId)
            .then((data) => {
                console.log(data.data[0]);
                setUserData(data.data[0]);
            })
    }, []);

    return (<div id="userDisplay">
        <h2>{userData.username} <span id="score"> Score: {userData.contributionScore}</span></h2>
        <p>{userData.bio || "No Bio"}</p>
    </div>);

}
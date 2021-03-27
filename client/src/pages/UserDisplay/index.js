import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import API from '../../utils/api';
import "./styles.css"

export default function UserDisplay() {

    let [userData, setUserData] = useState({});
    let [brews, setBrews] = useState([]);

    let { userId } = useParams([]);

    useEffect(() => {
        API.getUserProfile(userId)
            .then((data) => {
                console.log(data.data[0]);
                setUserData(data.data[0]);
            })

        API.getUserBrews(userId)
            .then(data => {
                setBrews(data.data)
            })
    }, []);

    let brewsJSX = brews.map(brew => <RecipeCard name={brew.name}
        description={brew.description}
        author={brew.author}
        id={brew.id}
        UserId={brew.UserId} />);

    return (<div id="userDisplay">
        <h2 class="title">{userData.username} <span id="score"> Score: {userData.contributionScore}</span></h2>
        <p>{userData.bio || "No Bio"}</p>

        <h3>Brews</h3>
        <div id="brew-list">
            {brewsJSX}
        </div>
    </div>);

}
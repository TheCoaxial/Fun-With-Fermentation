import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import API from '../../utils/api';
import "./styles.css"
import ls from 'local-storage'

export default function UserDisplay() {

    let [userData, setUserData] = useState({});
    let [brews, setBrews] = useState([]);
    let { userId } = useParams([]);

    let ids = JSON.parse(ls.get('visited')) || [];
    


    useEffect(() => {
        API.getUserProfile(userId)
            .then((data) => {
                //console.log(data.data[0]);
                setUserData(data.data[0]);
            })

        ids.push(userId);
       
        ls.set('visited', JSON.stringify(ids))
        console.log("ids?",ids);


        API.getUserBrews(userId)
            .then(data => {
                setBrews(data.data)
            })
    }, []);

    let brewsJSX = brews.map(brew => <RecipeCard
        key={brew.id}
        name={brew.name}
        description={brew.description}
        author={brew.author}
        id={brew.id}
        UserId={brew.UserId} />);

    return (<div id="userDisplay">
        <h2 className="title">{userData.username} <span id="score"> Score: {userData.contributionScore}</span></h2>
        <p>{userData.bio || "No Bio"}</p>

        <h3>Brews</h3>
        <div id="brew-list">
            {brewsJSX}
        </div>
    </div>);

}
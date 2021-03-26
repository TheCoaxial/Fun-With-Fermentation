import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import UserCard from "../../components/UserCard/UserCard"
import API from "../../utils/api";
import "./Feed.css";
import "../../App.css";
import axios from 'axios';

export default function Feed() {

    const [brews, setBrews] = useState([]);

    const [topUsers, setTopUsers] = useState([]);
    let topUsersJSX;

    let feedBrewsJSX;


    useEffect(() => {
        API.getBrews()
            .then(data => {
                console.log(data.data);
                setBrews(data.data);
            })
            .catch(err => {
                console.err(err);
            });

        API.getTopUsers()
            .then(data => {
                setTopUsers(data.data)
            })
            .catch(err => {
                console.err(err);
            });
    }, []);

   let sortedUsers = topUsers.sort((a, b) => {
        return b.contributionScore - a.contributionScore;
    });

    feedBrewsJSX = brews.map(brew => <RecipeCard name={brew.name}
        description={brew.description}
        author={brew.author} />);

    topUsersJSX = sortedUsers.map(user => <UserCard
        username={user.username}
        bio={user.bio}
        score={user.contributionScore} />);


    return (
        <div id="Feed">

            <div className="feedWrap">
                <div className="mainFeed">
                    {feedBrewsJSX}
                </div>

                <div className="sidebarWrap">
                    <div className="popularRecipesFeed">
                        <div className="sidebarHeader"><h2>Active Brews</h2></div>
                        {feedBrewsJSX}
                        <div className="sidebarFooter"></div>
                    </div>

                    <div className="popularUsersFeed">

                        <div className="sidebarHeader"><h2>Active Users</h2></div>
                        {topUsersJSX}
                        <div className="sidebarFooter"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
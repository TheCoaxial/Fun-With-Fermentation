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

    useEffect(() => {
        getBrews();
        API.getTopUsers()
            .then(data => {
                setTopUsers(data.data)
            })
            .catch(err => {
                console.err(err);
            });
    }, []);

    const getBrews = async () => {
        const gottenBrews = await axios.get("/api/brew/all");
        setBrews(gottenBrews);
    };

    const brewMap = () => {
        if (brews.length) {
            return brews.map(brew => {
                return (
                    <RecipeCard
                        name={brew.name}
                        description={brew.description}
                        author={brew.author}
                        ingredients={brew.ingredients}
                    />
                );
            });
        }
    };

    topUsersJSX = topUsers.map(user => <UserCard username={user.username}
        bio={user.bio} />);


    return (
        <div id="Feed">
            <Header />

            <div className="feedWrap">
                <div className="mainFeed">
                    {brewMap()}
                    <RecipeCard />
                </div>

                <div className="sidebarWrap">
                    <div className="popularRecipesFeed">
                        <div className="sidebarHeader"></div>
                        <RecipeCard />
                        <div className="sidebarFooter"></div>
                    </div>

                    <div className="popularUsersFeed">
                        <div className="sidebarHeader"></div>
                        {topUsersJSX}
                        <div className="sidebarFooter"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
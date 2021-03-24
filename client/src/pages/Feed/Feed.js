import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import UserCard from "../../components/UserCard/UserCard"
import API from "../../utils/api";
import "./Feed.css";
import "../../App.css";

export default function Feed() {

    const [topUsers, setTopUsers] = useState([]);
    let topUsersJSX;

    useEffect(() => {
        API.getTopUsers()
            .then(data => {
                setTopUsers(data.data)
            })
            .catch(err => {
                console.err(err);
            });
    }, []);

    topUsersJSX = topUsers.map(user => <UserCard username={user.username}
        bio={user.bio} />);


    return (
        <div id="Feed">
            <Header />

            <div className="feedWrap">
                <div className="mainFeed">
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
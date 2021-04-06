import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import ls from 'local-storage';
import { Grid, Typography } from "@material-ui/core";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import UserCard from "../../components/UserCard/UserCard"
import API from "../../utils/api";
import "./Feed.css";
import "../../App.css";

export default function Feed() {

    // const [currentUser, authCurrentUser] = useState([[currentUser = JSON.parse(localStorage.getItem('user'))]]);
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
                console.log(err);
            });

        API.getTopUsers()
            .then(data => {
                console.log(data.data);
                setTopUsers(data.data)
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    let sortedUsers = topUsers.sort((a, b) => {
        return b.contributionScore - a.contributionScore;
    });

    feedBrewsJSX = brews.map(brew => <RecipeCard
        key={brew.id}
        name={brew.name}
        description={brew.description}
        author={brew.author}
        id={brew.id}
        UserId={brew.UserId} />);
    feedBrewsJSX.splice(10);

    topUsersJSX = sortedUsers.map(user => <UserCard
        key={user.id}
        username={user.username}
        bio={user.bio}
        score={user.contributionScore}
        id={user.id} />);
    topUsersJSX.splice(5);

    if(ls.get("user")){
    return (
        <div id="Feed">
            <Grid container spacing={3}>
                <Grid item md={4} xs={12} className="sidebarWrap">
                    <div className="innerSidebarWrap">
                        <Typography gutterBottom variant="h5" component="h1">
                            Top Users
                        </Typography>
                        {topUsersJSX}
                    </div>
                </Grid>
                <Grid item md={8} xs={12}>
                    <Typography gutterBottom variant="h5" component="h1">
                        Top Brews
                    </Typography>
                    {feedBrewsJSX}
                </Grid>
            </Grid>
        </div>
    )
    } else{ return <Redirect to="/" /> }
}
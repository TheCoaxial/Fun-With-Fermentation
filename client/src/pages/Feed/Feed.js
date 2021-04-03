import React, { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import UserCard from "../../components/UserCard/UserCard"
import API from "../../utils/api";
import "./Feed.css";
import "../../App.css";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import SearchBar from "../../components/SearchBar";

export default function Feed() {

    const [brews, setBrews] = useState([]);
    // const [currentUser, authCurrentUser] = useState([[currentUser = JSON.parse(localStorage.getItem('user'))]]);

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


    return (

        <div id="Feed">

            <Grid container spacing={3}>
                <Grid item xs={4} className="sidebarWrap">
                    <div className="innerSidebarWrap">
                        <Typography gutterBottom variant="h5" component="h1">
                            Top Users
                        </Typography>
                        {topUsersJSX}
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <Typography gutterBottom variant="h5" component="h1">
                        Top Recipes
                        </Typography>
                    {feedBrewsJSX}
                </Grid>


            </Grid>

            <SearchBar />
        </div>
    )
    // } else {
    //    <div>
    //        <h1>No Token, No entry</h1>
    //    </div>
    // }
}
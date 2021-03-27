import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import UserCard from "../../components/UserCard/UserCard"
import API from "../../utils/api";
import "./Feed.css";
import "../../App.css";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

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
        UserId={brew.UserId}/>);

    topUsersJSX = sortedUsers.map(user => <UserCard
        key={user.id}
        username={user.username}
        bio={user.bio}
        score={user.contributionScore}
        id={user.id} />);


    return (
        // <div id="Feed">

        //     <div className="feedWrap">
        //         <div className="mainFeed">
        //             {feedBrewsJSX}
        //         </div>

        //         <div className="sidebarWrap">
        //             <div className="popularRecipesFeed">
        //                 <div className="sidebarHeader"><h2>Active Brews</h2></div>
        //                 {feedBrewsJSX}
        //                 <div className="sidebarFooter"></div>
        //             </div>

        //             <div className="popularUsersFeed">

        //                 <div className="sidebarHeader"><h2>Active Users</h2></div>
        //                 {topUsersJSX}
        //                 <div className="sidebarFooter"></div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div id="Feed">

            <Grid container spacing={3}>
                <Grid item xs={4} className="sidebarWrap">
                    <Typography gutterBottom variant="h5" component="h2">
                        Top Users
                    </Typography>
                    {topUsersJSX}
                </Grid>
                <Grid item xs={8}>
                    {feedBrewsJSX}
                </Grid>


            </Grid>
            

        </div>
    )
    // } else {
    //    <div>
    //        <h1>No Token, No entry</h1>
    //    </div>
    // }
}
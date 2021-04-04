import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import API from '../../utils/api';
import "./styles.css"
import ls from 'local-storage'
import FollowButton from "../../components/FollowButton";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function UserDisplay() {

    let [userData, setUserData] = useState({});
    let [brews, setBrews] = useState([]);
    let { userId } = useParams([]);
    
    useEffect(() => {
        API.getUserProfile(userId)
            .then((data) => {
                //console.log(data.data[0]);
                setUserData(data.data[0]);
            })

        let ids = JSON.parse(ls.get('visited')) || [];
        ids.push(userId);
       
        ls.set('visited', JSON.stringify(ids))
        console.log("ids?",ids);


        API.getUserBrews(userId)
            .then(data => {
                setBrews(data.data)
            })
    }, [userId]);

    let brewsJSX = brews.map(brew => <RecipeCard
        key={brew.id}
        name={brew.name}
        description={brew.description}
        author={brew.author}
        id={brew.id}
        UserId={brew.UserId} />);

    if(ls.get('user')){
    return (
    <div id="userDisplay">
        <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
                <div id="positionAbsoluteWrap">
                    <FollowButton
                        followID={userId}
                    />
                    <div id="score">
                        <Typography variant="body2" className="title" id="score">
                            Score: {userData.contributionScore}
                        </Typography>
                    </div>
                </div>

                <div id="userHeader">

                    <Typography variant="h5" className="title">
                        {userData.username}
                    </Typography>

                    <Typography variant="body1" className="title">
                        {userData.bio || "No Bio"}
                    </Typography>

                </div>

                

                
                <div id="brew-list">
                    <Typography variant="h6" className="title">
                        Brews
                    </Typography>
                    {brewsJSX}
                </div>
            </Grid>
        </Grid>
    </div>);
    }else{return <Redirect to="/" />}
}
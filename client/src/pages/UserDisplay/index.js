import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import ls from 'local-storage'
import { Grid, Typography } from "@material-ui/core";
import API from '../../utils/api';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import FollowButton from "../../components/FollowButton";
import "./styles.css"

export default function UserDisplay() {

    let [userData, setUserData] = useState({});
    let [brews, setBrews] = useState([]);
    let { userId } = useParams([]);
    
    useEffect(() => {
        API
            .getUserProfile(userId)
            .then((data) => setUserData(data.data[0]));

        let ids = JSON.parse(ls.get('visited')) || [];
        ids.push(userId);
        ls.set('visited', JSON.stringify(ids))

        API
            .getUserBrews(userId)
            .then(data => setBrews(data.data));
    }, [userId]);

    let brewsJSX = brews.map(brew => <RecipeCard
        key={brew.id}
        difficulty={brew.difficulty}
        name={brew.name}
        description={brew.description}
        author={brew.author}
        id={brew.id}
        UserId={brew.UserId} />);

    let createdAtValue;
    if (userData.createdAt !== undefined) {
        createdAtValue = userData.createdAt.split("T")[0];
    }

    if (ls.get('user')) {
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
                                <Typography component="p">
                                    <span className="br bioSubheadTitle">
                                        Joined {createdAtValue}
                                    </span>
                                </Typography>
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
            </div>
        );
    } else { 
        return <Redirect to="/" />
    }
}
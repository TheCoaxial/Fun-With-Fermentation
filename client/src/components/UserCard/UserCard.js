import React from "react";
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography, Avatar } from "@material-ui/core";
import FollowButton from "../../components/FollowButton";
import "../../App.css";
import './UserCard.css'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    }
});

export default function UserCard({ id, username, bio, newBrew, score }) {
    let history = useHistory();

    const classes = useStyles();

    return (
        <div className="userCardWrap">
            <Card className={`userCard ${classes.root}`}>
                <CardMedia
                    className={classes.media}
                    image="./sample-avatar.jpg"
                    title="User Avatar"
                />
                <CardContent>

                    <div className="flexWrap-horizontal">
                        <Avatar alt="Remy Sharp" src="./sample-avatar.jpg" />
                        <div className="text-verticalAlign">
                            <Link onClick={() => history.push(`/user/${id}`)}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {username}
                                </Typography>
                            </Link>
                            <Typography gutterBottom component="p" className="bio">
                                {bio}
                            </Typography>
                        </div>
                    </div>

                    <div className="followScoreWrapper">

                        <Typography variant="body2" color="textSecondary" component="p" className="score">
                            Score: {score}
                        </Typography>

                        <FollowButton
                            followID={id}
                        />

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

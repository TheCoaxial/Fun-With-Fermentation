import React from "react";
import "../../App.css";
import './UserCard.css'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography, Avatar } from "@material-ui/core";
import { Link } from 'react-router-dom';
import FollowButton from "../../components/FollowButton";
import { useHistory } from 'react-router-dom';

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
        <div>
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

                    <Typography variant="body2" color="textSecondary" component="p">
                        Score: {score}
                    </Typography>

                    <FollowButton
                        followID={id}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

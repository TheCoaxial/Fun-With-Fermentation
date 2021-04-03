import React from "react";
import "../../App.css";
import './UserCard.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import FollowButton from "../../components/FollowButton";

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    }
  });

export default function UserCard({ id ,username, bio, newBrew, score }) {

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
                                <Link to={`/user/${id}`}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {username}
                                    </Typography>
                                </Link>
                                    <Typography gutterBottom  component="p" className="bio">
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

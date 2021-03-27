import React from "react";
import "../../App.css";
import './UserCard.css'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

export default function UserCard({ id ,username, bio, newBrew, score }) {

    const classes = useStyles();



    return (
        // <div>
        //     <div className="userCard">
        //         <div className="userFlex">
        //             <img src="./sample-avatar.png" alt="sample avatar" className="avatar" />
        //             <h3 className="title">
        //                 <a href={`/user/${id}`}>{username}</a>  <span id="score">Score: {score}</span>
        //             </h3>

        //         </div>

        //         <div className="bio">
        //             {bio || <p>NO BIO</p>}
        //         </div>

        //     </div>
        // </div>

        <div>
            <Link to={`/user/${id}`}>
                <Card className={`userCard ${classes.root}`}>
                        <CardMedia
                            className={classes.media}
                            image="./brewImage.jpg"
                            title="User Avatar"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {username}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Score: {score}
                            </Typography>
                        </CardContent>
                </Card>
            </Link>
        </div>

    )
}

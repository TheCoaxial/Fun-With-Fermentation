import React from 'react';
import { useHistory } from "react-router-dom";
import './styles.css';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Link } from '@material-ui/core';
/* import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button'; */
import { Delete } from "@material-ui/icons";
import LikeButton from "../../components/CommentLikeButton";
import AuthService from "../../services/auth.service";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function Comment({ handleCommentDelete, commentId, author, body, createdAt, UserId }) {
    let history = useHistory();
    const classes = useStyles();
    /*     const preventDefault = (event) => event.preventDefault(); */

    const user = AuthService.getCurrentUser();

    const renderDeleteButton = () => {
        if (user.id === UserId) {
            return (
                <button>
                    <Delete onClick={() => handleCommentDelete(commentId)} />
                </button>
            )
        }
    }

    let userLink = <Typography variant="subtitle2" className="userLink"><Link onClick={() => { history.push(`/user/${UserId}`) }} >{author}</Link></Typography>;

    return (
        <Card className={`comment ${classes.root}`}>
            <CardContent>
                {userLink}

                <div className="commentButtonWrapper">
                    <LikeButton
                        commentID={commentId}
                    />
                    <div className="deleteCommentWrapper">
                        {/* {renderEditButton()} */}
                        {renderDeleteButton()}
                    </div>
                </div>

                {/* <Typography className={classes.pos} color="textSecondary">
                    {createdAt}
                </Typography> */}
                
                <Typography variant="body1" component="p" className="commentBody">
                    {body}
                </Typography>
            </CardContent>
        </Card>
    );
}
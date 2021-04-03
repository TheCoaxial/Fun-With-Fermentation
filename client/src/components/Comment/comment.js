import React from 'react';
import './styles.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Edit, Delete } from "@material-ui/icons";
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
  

export default function Comment({ handleCommentDelete, renderCommentForm, commentId, author, body, createdAt, UserId}) {

    const classes = useStyles();
/*     const preventDefault = (event) => event.preventDefault(); */

    const user = AuthService.getCurrentUser();

    const renderEditButton = () => {
        if (user.id === UserId) {
            return(
                <button>
                    <Edit onClick={() => renderCommentForm(commentId)} />
                </button>
            )
        }
    }

    const renderDeleteButton = () => {
        if (user.id === UserId) {
            return(
                <button>
                    <Delete onClick={() => handleCommentDelete(commentId)} />
                </button>
            )
        }
    }

    return (
        <Card className={`comment ${classes.root}`}>
            <CardContent>
                <Link href={`/user/${UserId}`}>
                        {author} 
                </Link>

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
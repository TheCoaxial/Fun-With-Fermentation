import React from 'react';
import './styles.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

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
  

export default function Comment({ author, body, createdAt ,UserId}) {

    const classes = useStyles();
    const preventDefault = (event) => event.preventDefault();

    return (
        <Card className={`comment ${classes.root}`}>
      <CardContent>
        <Link href={`/user/${UserId}`} onClick={preventDefault}>
            <Typography variant="body2" component="p" className="commentAuthor">
                {author} 
            </Typography>
        </Link>
        {/* <Typography className={classes.pos} color="textSecondary">
            {createdAt}
        </Typography> */}
        <Typography variant="body1" component="p" className="commentBody">
            {body}
        </Typography>
      </CardContent>
    </Card>);


}
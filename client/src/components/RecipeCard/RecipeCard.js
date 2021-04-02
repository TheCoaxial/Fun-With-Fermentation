import React, { useState } from "react";
import "./RecipeCard";
import "./style.css";
import "../../App.css";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteButton from "../../components/FavoriteButton";

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

export default function RecipeCard({ id, UserId, name, description, author }) {

    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    let brewLink = <a href={`/brews/${id}`}>{name}</a>;

    let userLink = <span className="userLink"><a href={`/user/${UserId}`}>{author}</a></span>;

    return (
        <div className="recipeCard">
            <Card className={`${classes.root}`}>
            <CardHeader
            title={brewLink}
            subheader={userLink}
            />
            <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                {description}
            </Typography>
            </CardContent>
            <CardActions disableSpacing>
            <FavoriteButton
                brewID={id}
            />
            </CardActions>
            </Card>
        </div>
    );
};
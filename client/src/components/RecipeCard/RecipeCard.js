import React from "react";
import "./RecipeCard";
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
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    let brewLink = <a href={`/brews/${id}`}>{name}</a>;

    let userLink = <span>Created by <a href={`/user/${UserId}`}>{author}</a></span>;
      

    // const ingredientMap = () => {
    //     if (ingredients.length) {
    //         return ingredients.map(ingredient => {
    //             return(
    //                 <li>
    //                     { ingredient }
    //                 </li>
    //             )
    //         });
    //     } else {
    //         return(
    //             <p>"No Ingredients Found"</p>
    //         );
    //     }
    // };

    return (
        <div>
            <Card className={`recipeCard ${classes.root}`}>
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
            <IconButton aria-label="add to favorites">
                <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
                <ShareIcon />
            </IconButton>
            <IconButton
                className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography paragraph>Instructions</Typography>
                <Typography paragraph>
                    Show recipe ingredients and instructions here if warranted.
                </Typography>
            </CardContent>
            </Collapse>
            </Card>
        </div>
    );
};
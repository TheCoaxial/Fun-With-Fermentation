import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
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

import { Link } from '@material-ui/core';
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
  let history = useHistory();

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let brewLink = <Link onClick={() => { history.push(`/brews/${id}`) }}>
    <Typography>{name}</Typography>
  </Link>;

  let userLink = <span className="userLink"><Link onClick={() => { history.push(`/user/${UserId}`) }} >
    <Typography>{author}</Typography>
  </Link></span>;

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
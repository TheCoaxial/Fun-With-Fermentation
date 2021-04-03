import React, { useState, useEffect } from "react";
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
import API from "../../utils/api";
import AuthService from "../../services/auth.service";

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

/*     const [favorite, setFavorite] = useState(0);
    const [favCount, setFavCount] = useState(0);
    const [brewAuthor, setBrewAuthor] = useState({});
    const user = AuthService.getCurrentUser();

    useEffect(() => {
        API
            .getSpecificBrew(id)
            .then(data => setBrewAuthor({ id: data.data.User.id, bio: data.data.User.bio, contributionScore: data.data.User.contributionScore }));
        API
            .getFavoritedBy(id)
            .then(data => setFavCount(data.data.length));
        API
            .getSpecificFavorite(user.id, id)
            .then(data => setFavorite(data.data.length));
    }, [id, user.id]); */

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    let brewLink = <a href={`/brews/${id}`}>{name}</a>;

    let userLink = <span className="userLink"><a href={`/user/${UserId}`}>{author}</a></span>;

/*     const addFav = (brewID) => {
        API.saveNewFavorite(brewID, user.id);
        setFavorite(1);
        let countHolder = favCount;
        countHolder += 1;
        setFavCount(countHolder);

        let scoreHolder = brewAuthor.contributionScore;
        scoreHolder += 5;
        setBrewAuthor({ id: brewAuthor.id, bio: brewAuthor.bio, contributionScore: scoreHolder });
        API.updateUser(brewAuthor.id, brewAuthor.bio, scoreHolder);
    };

    const delFav = (brewID) => {
        API.deleteFavorite(brewID, user.id);
        setFavorite(0);
        let countHolder = favCount;
        countHolder -= 1;
        setFavCount(countHolder);

        let scoreHolder = brewAuthor.contributionScore;
        scoreHolder -= 5;
        setBrewAuthor({ id: brewAuthor.id, bio: brewAuthor.bio, contributionScore: scoreHolder });
        API.updateUser(brewAuthor.id, brewAuthor.bio, scoreHolder);
    }; */

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
/*                 favorite={favorite}
                favCount={favCount}
                addFav={addFav}
                delFav={delFav} */
                brewID={id}
            />
            </CardActions>
            </Card>
        </div>
    );
};
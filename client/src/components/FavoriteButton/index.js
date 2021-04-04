import { React, useEffect, useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import { Star, StarOutline } from "@material-ui/icons";
import AuthService from "../../services/auth.service";
import API from "../../utils/api";
import "./style.css";

const FavButton = ({ brewID }) => {

    const [favorite, setFavorite] = useState(0);
    const [favCount, setFavCount] = useState(0);
    const [brewAuthor, setBrewAuthor] = useState({});
    const user = AuthService.getCurrentUser();

    useEffect(() => {
        API
            .getSpecificBrew(brewID)
            .then(data => setBrewAuthor({ id: data.data.User.id, bio: data.data.User.bio, contributionScore: data.data.User.contributionScore }));
        API
            .getFavoritedBy(brewID)
            .then(data => setFavCount(data.data.length));
        API
            .getSpecificFavorite(user.id, brewID)
            .then(data => setFavorite(data.data.length));
    }, [brewID, user.id]);

    const addFav = () => {
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

    const delFav = () => {
        API.deleteFavorite(brewID, user.id);
        setFavorite(0);
        let countHolder = favCount;
        countHolder -= 1;
        setFavCount(countHolder);

        let scoreHolder = brewAuthor.contributionScore;
        scoreHolder -= 5;
        setBrewAuthor({ id: brewAuthor.id, bio: brewAuthor.bio, contributionScore: scoreHolder });
        API.updateUser(brewAuthor.id, brewAuthor.bio, scoreHolder);
    };

    const renderFavCount = count => {
        return(
            <div>{ count }</div>
        );
    };

    const renderFavButton = isFav => {
        return(
          <div>
              { renderFavCount(favCount) }
              { isFav ? (
                  <IconButton aria-label="remove from favorites" onClick={delFav}>
                      <Star />
                  </IconButton>
              ) : (
                  <IconButton aria-label="add to favorites" onClick={addFav}>
                      <StarOutline />
                  </IconButton>
              )}
          </div>
        );
    };

    return(
        <div id="favoriteButtonWrapper">
            {renderFavButton(favorite)}
        </div>
    );
};

export default FavButton;
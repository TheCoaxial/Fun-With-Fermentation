import { React, useEffect, useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import AuthService from "../../services/auth.service";
import API from "../../utils/api";

const FavButton = ({ brewID }) => {

    const [favorite, setFavorite] = useState(0);
    const [favCount, setFavCount] = useState(0);
    const user = AuthService.getCurrentUser();

    useEffect(() => {
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
    };

    const delFav = () => {
        API.deleteFavorite(brewID, user.id);
        setFavorite(0);
        let countHolder = favCount;
        countHolder -= 1;
        setFavCount(countHolder);
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
                      <Favorite />
                  </IconButton>
              ) : (
                  <IconButton aria-label="add to favorites" onClick={addFav}>
                      <FavoriteBorder />
                  </IconButton>
              )}
          </div>
        );
    };

    return(
        <div>
            {renderFavButton(favorite)}
        </div>
    );
};

export default FavButton;
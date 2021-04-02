import { React, useEffect, useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import AuthService from "../../services/auth.service";
import API from "../../utils/api";

const FavButton = ({ brewID }) => {

    const [favorite, setFavorite] = useState(0);

    const user = AuthService.getCurrentUser();

    useEffect(() => {
        API
            .getSpecificFavorite(user.id, brewID)
            .then(data => setFavorite(data.data.length));
    }, []);

    const addFav = () => {
        API.saveNewFavorite(brewID, user.id);
        setFavorite(1);
    };

    const delFav = () => {
        API.deleteFavorite(brewID, user.id);
        setFavorite(0);
    };

    const renderFavButton = (isFav) => {
        return(
          <div>
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
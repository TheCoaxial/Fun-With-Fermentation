import { React, useEffect } from "react";
import { Favorite, FavoriteBorder } from "@material-ui/icons";

const FavButton = (props) => {

    let isFav;

    const getFavorite = () => {
        fetch(`/api/favorite/${props.brewId}/${props.userId}`)
        .then(data => {
            if (data) {
                isFav = true;
            } else {
                isFav = false;
            }
        })
        .catch(err => {
            if (err) {
                console.error(err);
            }
        })
    };
    
    useEffect(() => {
        getFavorite();
    }, []);

    if (isFav) {
        return <Favorite />;
    }
    return <FavoriteBorder />;
};

export default FavButton;
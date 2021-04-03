import { React, useEffect, useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import AuthService from "../../services/auth.service";
import API from "../../utils/api";

const LikeButton = ({ commentID }) => {

    const [like, setlike] = useState(0);
    const [likeCount, setlikeCount] = useState(0);
    const user = AuthService.getCurrentUser();

    useEffect(() => {
        API
            .getLikedBy(commentID)
            .then(data => {
                console.log("likeData", data);
                setlikeCount(data.data.length)
            });
        API
            .getSpecificCommentLike(user.id, commentID)
            .then(data => {
                console.log("specificLike", data);
                setlike(data.data.length)
            });
    }, [commentID, user.id]);

    const addLike = () => {
        API.newCommentLike(commentID, user.id);
        setlike(1);
        let countHolder = likeCount;
        countHolder += 1;
        setlikeCount(countHolder);
    };

    const delLike = () => {
        API.deleteCommentLike(commentID, user.id);
        setlike(0);
        let countHolder = likeCount;
        countHolder -= 1;
        setlikeCount(countHolder);
    };

    const renderlikeCount = count => {
        return(
            <div className="likesVerticalAlign">{ count }</div>
        );
    };

    const renderLikeButton = isFav => {
        return(
          <div>
              { renderlikeCount(likeCount) }
              { isFav ? (
                  <IconButton aria-label="remove from likes" onClick={delLike}>
                      <Favorite />
                  </IconButton>
              ) : (
                  <IconButton aria-label="add to likes" onClick={addLike}>
                      <FavoriteBorder />
                  </IconButton>
              )}
          </div>
        );
    };

    return(
        <div className="commentLikeWrapper">
            {renderLikeButton(like)}
        </div>
    );
};

export default LikeButton;
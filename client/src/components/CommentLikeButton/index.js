import { React, useEffect, useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import AuthService from "../../services/auth.service";
import API from "../../utils/api";

const LikeButton = ({ commentID }) => {

    const [like, setlike] = useState(0);
    const [likeCount, setlikeCount] = useState(0);
    const [commentAuthor, setCommentAuthor] = useState({});
    const user = AuthService.getCurrentUser();

    useEffect(() => {
        let commentAuthor = 0;
        API
            .getCommentInfo(commentID)
            .then(data => commentAuthor = data.data[0].UserId)
            .then(() => {
                API
                    .getUserProfile(commentAuthor)
                    .then(data => setCommentAuthor({ id: data.data[0].id, bio: data.data[0].bio, contributionScore: data.data[0].contributionScore }));
            });
        API
            .getLikedBy(commentID)
            .then(data => setlikeCount(data.data.length));
        API
            .getSpecificCommentLike(user.id, commentID)
            .then(data => setlike(data.data.length));
    }, [commentID, user.id]);

    const addLike = () => {
        API.newCommentLike(commentID, user.id);
        setlike(1);

        let countHolder = likeCount;
        countHolder += 1;
        setlikeCount(countHolder);
        
        let scoreHolder = commentAuthor.contributionScore;
        scoreHolder += 1;
/*         if (countHolder = 10 ) {
            scoreHolder += 2;
        } else if (countHolder = 20) {
            scoreHolder += 3;
        } else if (countHolder = 50) {
            scoreHolder += 5;
        } else {
            scoreHolder += 1;
        } */
        
        setCommentAuthor({ id: commentAuthor.id, bio: commentAuthor.bio, contributionScore: scoreHolder });
        API.updateUser(commentAuthor.id, commentAuthor.bio, scoreHolder);
    };

    const delLike = () => {
        API.deleteCommentLike(commentID, user.id);
        setlike(0);

        let countHolder = likeCount;
        countHolder -= 1;
        setlikeCount(countHolder);
        
        let scoreHolder = commentAuthor.contributionScore;
        scoreHolder -= 1;
/*         if (countHolder = 9) {
            scoreHolder -= 2;
        } else if (countHolder = 19) {
            scoreHolder -= 3;
        } else if (countHolder = 49) {
            scoreHolder -= 5;
        } else {
            scoreHolder -= 1;
        } */
        
        setCommentAuthor({ id: commentAuthor.id, bio: commentAuthor.bio, contributionScore: scoreHolder })
        API.updateUser(commentAuthor.id, commentAuthor.bio, scoreHolder);
    };

    const renderlikeCount = count => {
        return(
            <div>{ count }</div>
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
        <div>
            {renderLikeButton(like)}
        </div>
    );
};

export default LikeButton;
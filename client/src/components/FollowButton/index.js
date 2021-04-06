import { React, useEffect, useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import { Person, PersonOutline, Add, Remove } from "@material-ui/icons";
import AuthService from "../../services/auth.service";
import API from "../../utils/api";
import "./style.css";

const FollowButton = ({ followID }) => {

    const [follow, setFollow] = useState(0);
    const [followCount, setFollowCount] = useState(0);
    const [followedUser, setFollowedUser] = useState({});
    const user = AuthService.getCurrentUser();

    useEffect(() => {
        API
            .getUserProfile(followID)
            .then(data => setFollowedUser({ id: data.data[0].id, bio: data.data[0].bio, contributionScore: data.data[0].contributionScore }));
        API
            .getFollowers(followID)
            .then(data => setFollowCount(data.data.length));
        API
            .getSpecificFollowed(user.id, followID)
            .then(data => setFollow(data.data.length));
    }, [followID, user.id]);

    const addFollow = () => {
        API.newFollow(followID, user.id);
        setFollow(1);
        let countHolder = followCount;
        countHolder += 1;
        setFollowCount(countHolder);

        let scoreHolder = followedUser.contributionScore;
        scoreHolder += 5;
        setFollowedUser({ id: followedUser.id, bio: followedUser.bio, contributionScore: scoreHolder });
        API.updateUser(followedUser.id, followedUser.bio, scoreHolder);
    };

    const delFollow = () => {
        API.deleteFollow(followID, user.id);
        setFollow(0);
        let countHolder = followCount;
        countHolder -= 1;
        setFollowCount(countHolder);

        let scoreHolder = followedUser.contributionScore;
        scoreHolder -= 5;
        setFollowedUser({ id: followedUser.id, bio: followedUser.bio, contributionScore: scoreHolder });
        API.updateUser(followedUser.id, followedUser.bio, scoreHolder);
    };

    const renderFollowCount = count => {
        return(
            <div>{ count }</div>
        )
    }

    const renderFollowButton = isFollow => {
        return(
          <div>
              { isFollow ? (
                  <IconButton aria-label="remove from favorites" onClick={delFollow}>
                      <Remove />
                      <Person />
                      { renderFollowCount(followCount) }
                  </IconButton>
              ) : (
                  <IconButton aria-label="add to favorites" onClick={addFollow}>
                      <Add />
                      <PersonOutline />
                      { renderFollowCount(followCount) }
                  </IconButton>
              )}
          </div>
        );
    };

    return(
        <div>
            {renderFollowButton(follow)}
        </div>
    );
};

export default FollowButton;
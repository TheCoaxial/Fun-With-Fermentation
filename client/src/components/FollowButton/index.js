import { React, useEffect, useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import { Person, PersonOutline, Add, Remove } from "@material-ui/icons";
import AuthService from "../../services/auth.service";
import API from "../../utils/api";

const FollowButton = ({ followID }) => {

    const [follow, setFollow] = useState(0);

    const user = AuthService.getCurrentUser();

    useEffect(() => {
        API
            .getSpecificFollowed(user.id, followID)
            .then(data => setFollow(data.data.length));
    }, []);

    const addFollow = () => {
        API.newFollow(followID, user.id);
        setFollow(1);
    };

    const delFollow = () => {
        API.deleteFollow(followID, user.id);
        setFollow(0);
    };

    const renderFollowButton = (isFollow) => {
        return(
          <div>
              { isFollow ? (
                  <IconButton aria-label="remove from favorites" onClick={delFollow}>
                      <Remove />
                      <Person />
                  </IconButton>
              ) : (
                  <IconButton aria-label="add to favorites" onClick={addFollow}>
                      <Add />
                      <PersonOutline />
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
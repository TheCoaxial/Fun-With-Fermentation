import React from "react";
import RedditIcon from "@material-ui/icons/Reddit";
import { RedditButton } from "react-social";
import "./style.css";

const RedditShare = () => {
    return (
        <RedditButton>
            <RedditIcon />
        </RedditButton>
    );
};

export default RedditShare;
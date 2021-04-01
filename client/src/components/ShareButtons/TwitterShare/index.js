import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import { TwitterButton } from "react-social";
import "./style.css";

const TwitterShare = () => {
    return (
        <TwitterButton>
            <TwitterIcon />
        </TwitterButton>
    );
};

export default TwitterShare;
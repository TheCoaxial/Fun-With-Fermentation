import React from "react";
import { RedditButton } from "react-social";
import "./style.css";

const RedditShare = () => {
    return (
        <RedditButton appId={1481059635420740}>
            {" Share to Facebook "}
        </RedditButton>
    );
};

export default RedditShare;
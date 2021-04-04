import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import { FacebookButton } from "react-social";

const FacebookShare = () => {
    return (
        <FacebookButton  appId={1481059635420740}>
            <FacebookIcon />
        </FacebookButton>
    );
};

export default FacebookShare;
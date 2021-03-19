import React from "react";
import { FacebookButton } from "react-social";
import "./style.css";

const FacebookShare = () => {
    return (
        <FacebookButton  appId={1481059635420740}>
{/*             Replace with facebook icon */}
            {" Share to Facebook "}
        </FacebookButton>
    );
};

export default FacebookShare;
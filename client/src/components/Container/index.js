import React from "react";
import "./style.css";

const Container = (props) => {
    return <main className="container bg-white mt-5 mx-auto">{props.children}</main>;
};

export default Container;
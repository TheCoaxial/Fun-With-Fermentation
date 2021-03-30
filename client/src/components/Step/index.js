import React from "react";

export default function Step({ id, duration, instructions }) {
    return(
        <div className="step">
            <p>Step: {id}</p>
            <p>Time: {duration}</p>
            <p>Instructions: {instructions}</p>
        </div>
    )
};
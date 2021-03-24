import React from "react";
import "../../App.css";
import './UserCard.css'

export default function UserCard({ username, bio, newBrew, score }) {



    return (
        <div>
            <div className="userCard">
                <div className="userFlex">
                    <img src="./sample-avatar.png" alt="sample avatar" className="avatar" />
                    <h3 className="title">
                        {username}
                    </h3>
                </div>
                
                <p className="bio">
                    {bio}
                </p>
            </div>
        </div>

    )
}
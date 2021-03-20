import React from "react";
import "../../App.css";
import './UserCard.css'

export default function UserCard() {
    return(
        <div>
            <div className="userCard">
                <div className="userFlex">
                    <img src ="./sample-avatar.png" alt="sample avatar" className="avatar" />
                    <h3 className="title">
                        Sample User Card
                    </h3>
                </div>

                <p className="bio">
                Lorem ipsum dolor sit amet
                </p>
            </div>

            <div className="userCard">
                <div className="userFlex">
                    <img src ="./sample-avatar.png" alt="sample avatar" className="avatar" />
                    <h3 className="title">
                        Sample User Card
                    </h3>
                </div>

                <p className="bio">
                    Lorem ipsum dolor sit amet
                </p>
            </div>
        </div>
        
    )
}
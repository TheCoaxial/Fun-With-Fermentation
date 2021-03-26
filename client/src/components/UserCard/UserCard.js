import React from "react";
import "../../App.css";
import './UserCard.css'

export default function UserCard(props) {
    const people = props.people.map((person)=> 

        [
        <div className="userCard">
                <div className="userFlex">
                    <img src ="./sample-avatar.png" alt="sample avatar" className="avatar" />
                    <h3 className="title">
                       
                        {person.name}
                    </h3>
                </div>

            <p className="external-bio">
            
            {person.bio}
            </p>
        </div>
        ]

    );

    // console.log(props.people);

    return(
        <div>

        { people }

        </div>

    )
}
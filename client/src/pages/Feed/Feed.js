import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import UserCard from "../../components/UserCard/UserCard"
import "./Feed.css";
import "../../App.css";

export default function Feed() {

    const [brews, setBrews] = useState([]);
    // const [currentUser, authCurrentUser] = useState([[currentUser = JSON.parse(localStorage.getItem('user'))]]);

   


    useEffect(() => {
        // getBrews();
    }, []);

    // const getBrews = async() => {
    //     const gottenBrews = await axios.get("/api/brew/all");
    //     setBrews(gottenBrews);
    // };

    // const brewMap = () => {
    //     if (brews.length) {
    //         return brews.map(brew => {
    //             return(
    //                 <RecipeCard
    //                     name={brew.name}
    //                     description={brew.description}
    //                     author={brew.author}
    //                     ingredients={brew.ingredients}
    //                 />
    //             );
    //         });
    //     }
    // };
    // if(currentUser){
    return(
        <div id="Feed">
            <Header />

            <div className="feedWrap">
                <div className="mainFeed">
                    {/* {brewMap()} */}
                    {/* <RecipeCard /> */}
                </div>

                <div className="sidebarWrap">
                    <div className="popularRecipesFeed">
                        <div className="sidebarHeader"></div>
                        {/* <RecipeCard /> */}
                        <div className="sidebarFooter"></div>
                    </div>

                    <div className="popularUsersFeed">
                        <div className="sidebarHeader"></div>
                        <UserCard /> 
                        <div className="sidebarFooter"></div>
                    </div>
                </div>
            </div>
        </div>
    )
    // } else {
    //    <div>
    //        <h1>No Token, No entry</h1>
    //    </div>
    // }
}
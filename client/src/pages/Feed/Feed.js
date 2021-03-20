import React from "react";
import Header from "../../components/Header/Header";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import UserCard from "../../components/UserCard/UserCard"
import "./Feed.css";
import "../../App.css";

export default function Feed() {
    return(
        <div id="Feed">
            <Header />

            <div className="feedWrap">
                <div className="mainFeed">
                    <RecipeCard />
                </div>

                <div className="sidebarWrap">
                    <div className="popularRecipesFeed">
                        <div className="sidebarHeader"></div>
                        <RecipeCard />
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
}
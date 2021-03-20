import React from "react";
import Header from "../../components/Header/Header";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import "./style.css";
import "../../App.css";

export default function Feed() {
    return(
        <div id="Feed">
            <Header />

            <div>Feed Page</div>

            <div className="feedWrap">
                <div className="mainFeed">
                    <RecipeCard />
                </div>

                <div className="sidebarWrap">
                    <div className="popularRecipesFeed">
                        <RecipeCard />
                    </div>

                    {/* <div className="popularUsersFeed">
                        <UserCard />
                    </div> */}
                </div>
            </div>
        </div>
    )
}
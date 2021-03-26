import React from "react";
import "./RecipeCard";
import "../../App.css";

export default function RecipeCard({ id, UserId, name, description, author }) {

    // const ingredientMap = () => {
    //     if (ingredients.length) {
    //         return ingredients.map(ingredient => {
    //             return(
    //                 <li>
    //                     { ingredient }
    //                 </li>
    //             )
    //         });
    //     } else {
    //         return(
    //             <p>"No Ingredients Found"</p>
    //         );
    //     }
    // };

    return (
        <div className="recipeCard">
            <h3 className="title">
                <a href={`/brews/${id}`}>{name}</a>
            </h3>
            <h6>Created by <a href={`/user/${UserId}`}>{author}</a></h6>
            <ul>
                {/* {ingredientMap()} */}
            </ul>
            <p className="description truncate-overflow">
                {description}
            </p>
        </div>
    );
};
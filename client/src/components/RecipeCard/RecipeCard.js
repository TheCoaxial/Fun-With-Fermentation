import React from "react";
import "./RecipeCard";
import "../../App.css";

export default function RecipeCard(props) {

    const { name, description, author, ingredients } = props;
    
    const ingredientMap = () => {
        if (ingredients.length) {
            return ingredients.map(ingredient => {
                return(
                    <li>
                        {ingredient}
                    </li>
                )
            });
        } else {
            return(
                <p>"No Ingredients Found"</p>
            );
        }
    };

    return(
        <div className="recipeCard">
            <h3 className="title">
                { name }
            </h3>
            <h6>Created by { author }</h6>
            <ul>
                {ingredientMap()}
            </ul>
            <p className="description truncate-overflow">
                { description }
            </p>
        </div>
    );
};
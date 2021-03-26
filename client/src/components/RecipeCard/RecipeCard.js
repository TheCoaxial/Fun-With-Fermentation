import React from "react";
// import "./RecipeCard";
import "../../App.css";

export default function RecipeCard(props) {
    console.log(props.brews)
    const favorites = props.brews.map((brew) => 
    
        [
            <div className="recipeCard">
                <h3 className="title">
                    {console.log(" recipe return",props.brews)}
                    { brew.name }
                </h3>
                <h6>Created by {brew.author} </h6>
                <ul>
                    {/* {ingredientMap()} */}
                </ul>
                <p className="description truncate-overflow">
                    {brew.description}
                </p>
            </div>
        ]

    );

    
   
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

    return(
        <div>
            { favorites }
        </div>
    );
};
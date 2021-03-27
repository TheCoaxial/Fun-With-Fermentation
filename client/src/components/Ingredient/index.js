import React from "react";

export default function Ingredient({ name, quantity, quantityUnits }) {
    return(
        <div className="ingredient">
            <p>Ingredient: {name}</p>
            <p>Quantity: {quantity} {quantityUnits}</p>
        </div>
    );
};
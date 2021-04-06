import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';

export default function Ingredient({ name, quantity, quantityUnits }) {
    return(
            <ListItem>
                <ListItemIcon>
                <CheckIcon />
                </ListItemIcon>
                <ListItemText
                primary={name}
/*                 secondary={quantity + " " + quantityUnits} */
                />
            </ListItem>
    );
};
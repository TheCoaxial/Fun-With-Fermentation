import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';

export default function Ingredient({ name, quantity, quantityUnits }) {
    return(
        
            <ListItem>
                <ListItemIcon>
                <CheckIcon />
                </ListItemIcon>
                <ListItemText
                primary={name}
                secondary={quantity + " " + quantityUnits}
                />
            </ListItem>
    );
};
import React from "react";
import "./style.css";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { red } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

export default function PlaceHolder({description, mockTitle}) {

    const classes = useStyles();
    

    return (

        <div className="recipeCard">
            <Card className={`${classes.root}`}>
                <CardHeader title={mockTitle} />              
                <CardContent>
                    <Typography variant="body2" component="p">
                        {description}
                    </Typography>
                </CardContent>


            </Card>
        </div>
    )
}
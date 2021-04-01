import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import API from '../../utils/api';
import Comment from '../../components/Comment/comment';
import Ingredient from "../../components/Ingredient";
import Step from "../../components/Step";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Timeline from '@material-ui/lab/Timeline';
import { makeStyles } from '@material-ui/core/styles';
import "./styles.css"
import authService from '../../services/auth.service.js';
import RedditShare from "../../components/ShareButtons/RedditShare";
import TwitterShare from "../../components/ShareButtons/TwitterShare";
import FacebookShare from "../../components/ShareButtons/FacebookShare";

const useStyles = makeStyles((theme) => ({
    timelineContent: {
      padding: '12px 16px',
    },
    secondaryTail: {
      backgroundColor: theme.palette.secondary.main,
    },
    verticallyCenterContent: {
      margin: 'auto 0',
    },
  }));

export default function BrewDisplay() {

    const classes = useStyles();

    let [brew, setBrew] = useState({});
    let [comments, setComments] = useState([]);
    let [ingredients, setIngredients] = useState([]);
    let [steps, setSteps] = useState([]);
    const [secondary, setSecondary] = React.useState(false);

    let [commentInput, setCommentInput] = useState("");

    let { brewId } = useParams();

    useEffect(() => {
        API.getSpecificBrew(brewId)
            .then((data) => {
                console.log(data.data);
                setBrew(data.data);
                setComments(data.data.Comments);
                setIngredients(data.data.Ingredients);
                setSteps(data.data.Steps);
            })
    }, []);

    let commentsJSX = comments.map(comment => <Comment 
        key={comment.createdAt}
        body={comment.body}
        createdAt={comment.createdAt}
        author={comment.author}
        UserId={comment.UserId} />);

    let ingredientsJSX = ingredients.map(ingredient => <Ingredient
        key={ingredient.id}
        name={ingredient.name}
        quantity={ingredient.quantity}
        quantityUnits={ingredient.quantityUnits}
    />);

    let stepsJSX = steps.map(step => <Step
        key={step.id}
        id={step.id}
        duration={step.duration}
        instructions={step.instructions}
    />);

    return (
        <div id="brewDisplay">
            <div id="mainBrewDisplay">

                <Grid item xs={12} className="mainHeaders">
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h2" component="div" className="h2-header">
                            {brew.name}
                    </Typography>

                    <RedditShare />
                    <TwitterShare />
                    <FacebookShare />

                    <Typography sx={{ mt: 4, mb: 2 }} variant="p" component="div" className="author-header">
                            Created by <a href={`/user/${brew.UserId}`}>{brew.author}</a>
                    </Typography>

                    <Typography sx={{ mt: 4, mb: 2 }} variant="p" component="div" className="description-header">
                            {brew.description}
                    </Typography>
                    
                 </Grid>

                <Grid item xs={12} md={6}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div" className="h5-headers">
                        Ingredients
                    </Typography>
                    <List id="ingredient-list">
                        {ingredientsJSX}
                    </List>
                 </Grid>

                    <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div" className="h5-headers">
                        Timeline
                    </Typography>
                    <Timeline>
                        {stepsJSX}
                    </Timeline>
            </div>

            <form onSubmit={(event) => {
                    let { id, username } = authService.getCurrentUser();

                    API.postComment(id, brewId, username, commentInput);
                }}>

                    <input type="text" value={commentInput}
                        placeholder="Add Comment"
                        onChange={(e) => {
                            setCommentInput(e.target.value)
                        }}></input>
                    <button type="submit">Add Comment</button>
            </form>

            <div id="commentSection">
                <h3>Comments</h3>
                <div id="comment-list">
                    {commentsJSX}
                </div>
            </div>
        </div>
    );
}
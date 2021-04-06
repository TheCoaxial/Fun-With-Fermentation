import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Redirect, useHistory } from "react-router-dom";
import AuthService from '../../services/auth.service.js';
import ls from 'local-storage';
import { Grid, Typography, List, TextField, Button, Link } from "@material-ui/core";
import Timeline from '@material-ui/lab/Timeline';
import DeleteIcon from '@material-ui/icons/Delete';
import API from '../../utils/api';
import Comment from '../../components/Comment/comment';
import Ingredient from "../../components/Ingredient";
import Step from "../../components/Step";
import RedditShare from "../../components/ShareButtons/RedditShare";
import TwitterShare from "../../components/ShareButtons/TwitterShare";
import FavoriteButton from "../../components/FavoriteButton";
import "./styles.css"

export default function BrewDisplay(props) {

    let history = useHistory();
    let [brew, setBrew] = useState({});
    let [comments, setComments] = useState([]);
    let [ingredients, setIngredients] = useState([]);
    let [steps, setSteps] = useState([]);
    let [commentInput, setCommentInput] = useState("");
    let { brewId } = useParams();
    const user = AuthService.getCurrentUser();

    useEffect(() => {
        API.getSpecificBrew(brewId)
            .then((data) => {
                setBrew(data.data);
                setComments(data.data.Comments);
                setIngredients(data.data.Ingredients);
                setSteps(data.data.Steps);
            });
    }, [brewId]);

    const handleCommentDelete = (commentId) => {
        API.deleteComment(commentId).then(res => {
            let temparray = comments.filter(comment => {
                if (comment.id !== commentId) {
                    return comment;
                }
            });
            setComments(temparray);
        });
    };

    const handleBrewDelete = () => {
        API.deleteBrew(brewId).then(() => {
            props.history.push('/feed')
        });
    };

    const renderBrewDelete = () => {
        if (brew.UserId === user.id) {
            return (
                <div id="deleteFlex">
                    <Button
                        id="delete"
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleBrewDelete()}
                    >
                        Delete This Brew
                    </Button>
                </div>
            );
        }
    };

    let userLink = <div><Typography sx={{ mt: 4, mb: 2 }} variant="inherit" className="author-header">Created by <Link onClick={() => { history.push(`/user/${brew.UserId}`) }} >{brew.author}</Link></Typography></div>;

    let commentsJSX = comments.map(comment => <Comment
        handleCommentDelete={handleCommentDelete}
        commentId={comment.id}
        key={comment.createdAt}
        body={comment.body}
        createdAt={comment.createdAt}
        author={comment.author}
        UserId={comment.UserId}
    />);

    ingredients.sort((a, b) => a.quantity - b.quantity);
    let ingredientsJSX = ingredients.map(ingredient => <Ingredient
        key={ingredient.id}
        name={ingredient.name}
        quantity={ingredient.quantity}
        quantityUnits={ingredient.quantityUnits}
    />);

    steps.sort((a, b) => a.duration - b.duration);
    let stepsJSX = steps.map(step => <Step
        key={step.id}
        duration={step.duration}
        instructions={step.instructions}
    />);

    if (ls.get('user')) {
        return (
            <div id="brewDisplay">
                <div id="brewDisplayFlex">
                    <div id="mainBrewDisplay">

                        <Grid item xs={12} className="mainHeaders">
                            <Typography sx={{ mt: 4, mb: 2 }} variant="h2" component="div" className="h2-header">
                                {brew.name}
                            </Typography>

                            <div id="shareButtons">
                                <FavoriteButton
                                    brewID={brewId}
                                />
                                <RedditShare />
                                <TwitterShare />
                            </div>

                            {userLink}

                            <p><Typography sx={{ mt: 4, mb: 2 }} variant="inherit" className="description-header">
                                Difficulty: {brew.difficulty}
                            </Typography></p>

                            <p><Typography sx={{ mt: 4, mb: 2 }} variant="inherit" className="description-header">
                                {brew.description}
                            </Typography></p>

                        </Grid>

                        <Grid item xs={12}>
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

                        {renderBrewDelete()}
                    </div>

                </div>

                <div id="commentSection">

                    <form onSubmit={(event) => {
                        event.preventDefault();
                        let { id, username } = AuthService.getCurrentUser();
                        API.postComment(id, brewId, username, commentInput).then(res => {
                            setComments([...comments, res.data]);
                            setCommentInput("");
                        });
                    }}>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            variant="outlined"
                            placeholder="Add a Comment Here"
                            value={commentInput}
                            onChange={(e) => {
                                setCommentInput(e.target.value)
                            }}
                        />
                        <Button type="submit" id="submitComment">Submit Comment</Button>
                    </form>

                    <div id="comment-list">
                        {commentsJSX}
                    </div>
                </div>

            </div>
        );
    } else { 
        return <Redirect to='/' /> 
    }
}
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import API from '../../utils/api';
import Comment from '../../components/Comment/comment';
import Ingredient from "../../components/Ingredient";
import Step from "../../components/Step";
import RedditShare from "../../components/ShareButtons/RedditShare";
import TwitterShare from "../../components/ShareButtons/TwitterShare";
import FacebookShare from "../../components/ShareButtons/FacebookShare";

import "./styles.css"
import authService from '../../services/auth.service.js';

export default function BrewDisplay() {

    let [brew, setBrew] = useState({});
    let [comments, setComments] = useState([]);
    let [ingredients, setIngredients] = useState([]);
    let [steps, setSteps] = useState([]);

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

    return (<div>
        <h2>{brew.name}</h2>
        <RedditShare />
        <TwitterShare />
        <FacebookShare />
        <p>Created by <a href={`/user/${brew.UserId}`}>{brew.author}</a></p>
        <p>{brew.description}</p>

        <h3>Ingredients</h3>
        <div id="ingredient-list">
            {ingredientsJSX}
        </div>

        <h3>Steps</h3>
        <div id="step-list">
            {stepsJSX}
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

        <h3>Comments</h3>
        <div id="comment-list">
            {commentsJSX}
        </div>
    </div>);
}
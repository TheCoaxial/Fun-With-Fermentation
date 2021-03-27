import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import API from '../../utils/api';
import Comment from '../../components/Comment/comment';

import "./styles.css"

export default function BrewDisplay() {

    let [brew, setBrew] = useState({});
    let [comments, setComments] = useState([]);

    let { brewId } = useParams();



    useEffect(() => {
        API.getSpecificBrew(brewId)
            .then((data) => {
                console.log(data.data);
                setBrew(data.data);
                setComments(data.data.Comments);
            })
    }, []);

    let commentsJSX = comments.map(comment => <Comment body={comment.body}
        createdAt={comment.createdAt}
        author={comment.author} />);

    return (<div>
        <h2>{brew.name}</h2>
        <p>Created by <a href={`/user/${brew.UserId}`}>{brew.author}</a></p>
        <p>{brew.description}</p>

        <h3>Comments</h3>
        <div id="comment-list">
            {commentsJSX}
        </div>
    </div>);
}
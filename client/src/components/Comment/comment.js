import React from 'react';
import './styles.css';

export default function Comment({ author, body, createdAt }) {

    return (
        <div class="comment">
            <p>{author}</p>
            <p>{body}</p>
            <p>{createdAt}</p>
        </div>);


}
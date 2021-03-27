import React from 'react';
import './styles.css';

export default function Comment({ author, body, createdAt ,userId}) {

    return (
        <div class="comment">
            <p><a href={`/user/${userId}`}>{author}</a></p>
            <p>{body}</p>
            <p>{createdAt}</p>
        </div>);


}
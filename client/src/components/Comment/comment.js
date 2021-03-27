import React from 'react';
import './styles.css';

export default function Comment({ author, body, createdAt ,UserId}) {

    return (
        <div class="comment">
            <p><a href={`/user/${UserId}`}>{author}</a></p>
            <p>{body}</p>
            <p>{createdAt}</p>
        </div>);


}
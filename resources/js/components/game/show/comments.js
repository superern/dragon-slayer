import React, { Component } from 'react';

class Comments extends Component {
    render() {
        const comments = this.props.comments;
        return (
            <ul className="list-group list-group-flush">
                {comments.map(comment => (
                    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                        key={comment.id}>
                        <div>{comment.description}</div>
                    </li>
                    )
                )}
            </ul>
        );
    }
}

export default Comments

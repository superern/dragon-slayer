import Comments from './comments';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ShowGame extends Component {
    constructor () {
        super();
        this.state = {
            game: []
        }
    }

    componentDidMount () {
        const { id } = this.props;
        axios.get(`/api/games/${id}`).then(response => {
            this.setState({
                game: response.data
            })
        })
    }

    handleBackClick() {
        window.location.href = '/home';
    }
    render() {
        const { game } = this.state;
        let comments = 'Loading comments ...';
        if(game.hasOwnProperty('comments') && game.comments.length)
            comments = <Comments comments={game.comments}/>;
        else comments = 'There are no comments';

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header flex justify-between align-items-center">
                                <div>Details on your <span className="font-bold">{game.name}</span> game</div>
                                <button className="btn btn-primary" onClick={this.handleBackClick}>Back</button>
                            </div>

                            <div className="card-body">
                                <div>
                                    <span className="font-bold">Name:</span> {game.name}
                                </div>
                                <div>
                                    <span className="font-bold">Status:</span> { !!+game.status? 'lost' : 'won' }
                                </div>
                                <div>
                                    <h1 className="font-bold">Comments</h1>
                                    {comments}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('ShowGame')) {
    const el = document.getElementById('ShowGame'),
        props = Object.assign({}, el.dataset);
    ReactDOM.render(<ShowGame {...props}/>, el);
}

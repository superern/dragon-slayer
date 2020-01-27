import DashboardGame from './DashboardGame';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Dashboard extends Component {
    constructor () {
        super();
        this.state = {
            games: []
        }
    }

    componentDidMount () {
        axios.get('/api/games').then(response => {
            this.setState({
                games: response.data
            })
        })
    }

    handleNewGameClick() {
        window.location.href = '/games/new'
    }
    render() {
        const { name } = this.props,
            { games } = this.state;

        let gameList = 'Loading games ...';
        if(games.length)
            gameList = <DashboardGame games={games}/>;
        else gameList = 'There are no games yet.';

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header flex justify-between align-items-center">
                                Welcome, {name} !
                                <button className="btn btn-primary" onClick={this.handleNewGameClick}>Start new game</button>
                            </div>

                            <div className="card-body">
                                <h1 className="font-bold">Your Games</h1>
                                {gameList}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('Dashboard')) {
    // find element by id

    const el = document.getElementById('Dashboard');
    // create new props object with element's data-attributes
    // result: {name: "demo1"}
    const props = Object.assign({}, el.dataset);

    ReactDOM.render(<Dashboard {...props} />, el);

}

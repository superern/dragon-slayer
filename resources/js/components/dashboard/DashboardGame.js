import React, { Component } from 'react';

class DashboardGame extends Component {
    render() {
        const games = this.props.games;
        return (
            <ul className="list-group list-group-flush">
                {games.map(game => (
                    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                        key={game.id}>
                        <div>
                            <a href={`/games/${game.id}`}>{game.name}</a> -
                            <span className={`ml-1 ${ !!+game.status? 'text-red-500' : 'text-green-500'}`}>
                                                    { !!+game.status? 'lost' : 'won' }
                            </span>
                        </div>
                    </li>
                    )
                )}
            </ul>
        );
    }
}

export default DashboardGame

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';

export default class CreateGame extends Component {
    constructor() {
        super();
        this.pressGiveUp = this.pressGiveUp.bind(this);
        this.pressAttack = this.pressAttack.bind(this);
        this.pressHeal = this.pressHeal.bind(this);
        this.pressBlast = this.pressBlast.bind(this);
        this.submit = this.submit.bind(this);

        this.state = {
            name: '',
            comments: [],
            dragon: {
                name: '',
                health: 100,
                attackSent: 0,
                healReceived: 0,
                blastCounter: 1,
            },
            you: {
                name: '',
                health: 100,
                attackSent: 0,
                healReceived: 0,
                blastCounter: 1,
            },
            status: 0
        }

    }

    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
        let you = {...this.state.you},
            dragon = {...this.state.dragon};

        you.name = this.props.name;
        dragon.name = faker.name.firstName();

        this.setState({name: faker.lorem.words(2)});
        this.setState({comments: [`You encountered Dragon ${dragon.name}`]});
        this.setState({you});
        this.setState({dragon});
    }
    componentDidUpdate(prevProps, prevState) {
        const {comments, dragon, you} = this.state;

        if(dragon.health === 0 && prevState.dragon.health !== dragon.health) {
            comments.push('You WON!');
            this.setState({comments: comments, status: 1});
            alert('You WON!');
            this.submit()
        }
        else if(you.health === 0 && prevState.you.health !== you.health) {
            comments.push('You died!');
            this.setState({comments: comments, status: 0});
            alert('You Died!');
            this.submit()
        }
    }

    handleQuitClick() {
        window.location.href = '/home';
    }
    handleRestartClick() {
        window.location.reload()
    }

    pressGiveUp() {
        const {comments, dragon} = this.state;
        let you = {...this.state.you},
            name = you.name;

        if (dragon.health > 0 && you.health > 0) {
            name = (name.split(' '))[0];

            if(you.health === 100) {
                comments.push(`Shame on you! you piece of chicken, we don't need a hero like you!`);
                comments.push(`The dragon ate you.`);
            }
            else if(you.health < 75 ) comments.push(`Nooo! ${name} don\'t give up on us.`);
            else comments.push(`You were chased by the dragon`);
            you.health = 0;
            this.setState({you});
            this.setState({comments: comments});
        }
    }
    pressAttack() {
        const {comments, you} = this.state;
        let dragon = {...this.state.dragon};

        if (dragon.health > 0 && you.health > 0) {
            let damage = this.randomDamage(0,10),
                name = you.name;

            name = (name.split(' '))[0];
            dragon.health = dragon.health - damage;

            if(dragon.health <= 0) dragon.health = 0;

            if(damage > 0 ) comments.push(`${name} attacked the dragon. Reduced its health by ${damage}.`);
            else comments.push(`Focus ${name}! Focus! You need to damage the dragon.`);

            this.setState({comments: comments});
            this.setState({dragon});

            // dragon attacking
            this.dragonAttack(comments, dragon)
        }
    }
    pressBlast() {
        let dragon = {...this.state.dragon},
            you= {...this.state.you},
            {comments } = {...this.state},
            name = you.name;

        if (dragon.health > 0 && you.health > 0) {
            name = (name.split(' '))[0];
            if(you.blastCounter !== 0) {
                you.blastCounter = you.blastCounter - 1;
                comments.push(`Wow! ${name} is flowing with a powerful aura.`);
                comments.push(`Looks like he will hit the Dragon very hard.`);
            }
            else {
                let damage = this.randomDamage(0,40);
                if(damage > 25) comments.push(`The dragon took a ${damage} damage critical hit!`);
                else if(damage <= 25) comments.push(`The attack was ${damage} damage not very powerful enough. But you can still do it!`);

                dragon.health = dragon.health - damage;
                if(dragon.health <= 0) dragon.health = 0;
                this.setState({dragon});

                you.blastCounter = this.randomNumber(1,3);
            }

            this.setState({you});
            this.setState({comments: comments});

            // dragon attacking
            this.dragonAttack(comments, dragon)
        }
    }
    pressHeal() {
        const {comments, dragon} = this.state;
        let you = {...this.state.you};

        if (dragon.health > 0 && you.health > 0 && you.health !== 100) {
            let heal = this.randomHeal(0,30),
                name = you.name;

            name = (name.split(' '))[0];
            you.health = you.health + heal;

            if(you.health > 100) you.health = 100;

            if(heal > 0 ) comments.push(`${name} increased health by ${heal}.`);
            else if(heal > 20 ) comments.push(`${name} greatly increased health by ${heal}.`);
            else comments.push(`Darn, ${name} dropped the potion!`);

            this.setState({comments: comments});
            this.setState({you});
        }
        else if(you.health === 100) {
            comments.push(`Too early to use your potion. Instead attack the Dragon.`);
            this.setState({comments: comments});
        }

        // dragon attacking
        this.dragonAttack(comments, dragon);
    }

    dragonAttack(comments, dragon) {
        setTimeout(()=>{
            let damage = this.randomDamage(0, 15),
                you = {...this.state.you};

            if(you.health > 0 && dragon.health > 0) {
                if(dragon.health < 50 && dragon.blastCounter !== 0) {
                    dragon.blastCounter = dragon.blastCounter - 1;
                    comments.push(`The dragon is raging!`);
                    comments.push(`Beware of a powerful attack!`);
                }

                let blasted = dragon.blastCounter;
                if(dragon.blastCounter === 0) {
                    damage = this.randomDamage(0,35);
                    dragon.blastCounter = this.randomNumber(0,5);
                    if(damage > 20 ) comments.push(`Dragon fired a powerful attack! You were hit by ${damage} damage.`);
                    else comments.push(`You're lucky, it was not very powerful, you were scratch by ${damage} damage.`);
                }

                you.health = you.health - damage;

                if(you.health <= 0) you.health = 0;

                if(damage > 0 && blasted !== 0) comments.push(`You took ${damage} damage from the dragon.`);
                else if(damage === 0) comments.push(`Nice evade! Keep it hero.`);

                this.setState({comments: comments});
                this.setState({you});
            }
        }, this.randomTimeout(800, 2000));
    }

    randomDamage(min, max) {
        return this.randomNumber(min, max)
    }
    randomHeal(min, max) {
        return this.randomNumber(min, max)
    }
    randomTimeout(min, max) {
        return this.randomNumber(min, max)
    }
    randomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    submit() {
        axios.post('/api/games', this.state)
            .then(response => {
                alert('Till the next journey.');
                window.location.href = '/home';
            })
            .catch(err => console.log(err));
    }
    render() {
        const { dragon, you, comments, name} = this.state;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header flex justify-between align-items-center">
                                <div><span className="font-bold">Game name:</span> {name}</div>
                                <div>
                                    <button className="btn btn-warning" onClick={this.handleRestartClick}>Restart</button>
                                    <button className="btn btn-danger ml-2" onClick={this.handleQuitClick}>Quit</button>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="flex justify-content-between align-items-center">
                                    <div className="col-md-5">
                                        <span>{you.name}</span>
                                        <div className="w-100 bg-gray-400 rounded-r-lg flex justify-content-end">
                                            <div className="bg-success py-1 rounded-r-lg relative"
                                                 style={{"height": "2em", "width": you.health+"%"}}>
                                                <span className="text-black ml-2 absolute">{you.health}%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-2 flex justify-around">
                                        <img src="/img/vs.png" alt="VS" width="50"/>
                                    </div>

                                    <div className="col-md-5 text-right">
                                        Dragon <span className="font-bold">{dragon.name}</span>
                                        <div className="w-100 bg-gray-400 rounded-l-lg">
                                            <div className="bg-success py-1 rounded-l-lg relative"
                                                 style={{"height": "2em", "width": dragon.health+"%"}}>
                                                <span className="text-black mr-2 absolute">{dragon.health}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex mt-5 align-items-center">
                                    <div className="border-2 flex flex-column p-2" style={{"width": "12em", "height": "12em"}}>
                                        <div className="text-center">
                                            <button className="border btn rounded-full btn-danger"
                                                    style={{"width": "50px", "height": "50px"}}
                                                    onClick={this.pressGiveUp}>w</button>
                                        </div>
                                        <div className="flex justify-content-between w-full">
                                            <button className="border btn rounded-full btn-warning"
                                                    style={{"width": "50px", "height": "50px"}}
                                                    onClick={this.pressBlast}>a</button>
                                            <button className="border btn rounded-full btn-secondary"
                                                    style={{"width": "50px", "height": "50px"}}
                                                    onClick={this.pressHeal}>d</button>
                                        </div>
                                        <div className="text-center">
                                            <button className="border btn rounded-full btn-dark"
                                                    style={{"width": "50px", "height": "50px"}}
                                                    onClick={this.pressAttack}>s</button>
                                        </div>
                                    </div>

                                    <div className="flex-grow-1 ml-5">
                                        <h1>Instructions:</h1>
                                        <div>a - Blast (Higher damage, but prone from a dragon's power attack)</div>
                                        <div>s - Heal (Increase your health)</div>
                                        <div>d - Attack (Upto 10 damage)</div>
                                        <div>w - Give Up (You will be defeated)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header flex justify-between align-items-center">
                                <span className="font-bold">Commentaries</span>
                            </div>

                            <div id="commentaries" className="card-body overflow-y-auto" style={{"maxHeight": "50em"}}>
                                { comments.map((comment, key) => (
                                    <div key={key}>{comment}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('CreateGame')) {
    // find element by id

    const el = document.getElementById('CreateGame');
    // create new props object with element's data-attributes
    // result: {name: "demo1"}
    const props = Object.assign({}, el.dataset);

    ReactDOM.render(<CreateGame {...props} />, el);

}

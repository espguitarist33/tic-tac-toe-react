import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    // It is often easier and more readable to just use a function when there is no state
        return (
            <button
                className="square"
                // Now we call the onClick method being passed in to us
                onClick={props.onClick}
            >
                {props.value}
            </button>
        );
    }

class Board extends React.Component {
    constructor(props) {
        // Let's start with an empty state for the whole board
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        // This re-renders all of them, wonder if that's even necessary at this point?
        this.setState({squares: squares});
    }
    
    renderSquare(i) {
        //Now we will tell the square it's state from our array. React calls the Squares as "controlled components"
        // handleClick allows the state to be updated via call-back and keeps the components correctly encapsulated (like pub/sub)
        return (
            <Square
                value={this.state.squares[i]}
                // Note that this property name doesn't actually matter.. <button>'s implementation does, however.
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render () {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <div>{/* TODO */}</div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
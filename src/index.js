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
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        // This re-renders all of them, wonder if that's even necessary at this point?
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
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
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

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

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares [a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
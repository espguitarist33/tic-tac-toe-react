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
    renderSquare(i) {
        //Now we will tell the square it's state from our array. React calls the Squares as "controlled components"
        // handleClick allows the state to be updated via call-back and keeps the components correctly encapsulated (like pub/sub)
        return (
            <Square
                value={this.props.squares[i]}
                // Note that this property name doesn't actually matter.. <button>'s implementation does, however.
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        const totalRows = 3;
        const totalColumns = 3;
        let rows = [];
        let totalSquares = 8;
        for (let i = 0; i < totalRows; i++){
            let squares = [];
            for (let k = 0; k < totalColumns; totalSquares--, k++) {
                squares.push(this.renderSquare(totalSquares));
            };
            rows.push(<div className="board-row">{squares}</div>);
        };
        return (
            <div>
                {rows}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                lastMove: -1
            }],
            stepNumber: 0,
            xIsNext: true,
            sortAsc: true,
        }
    }

    handleSortToggle() {
        this.setState({sortAsc: !this.state.sortAsc});
        this.calculateMoves();
    }


    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        // This re-renders all of them, wonder if that's even necessary at this point?
        this.setState({
            history: history.concat([{
                squares: squares,
                lastMove: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });        
        
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    calculateMoves() {
        const history = this.state.history;
        let moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            
            let moveData = `Move: ${Math.floor(step.lastMove/3) + 1},${(step.lastMove%3) + 1}`;
            if (move === history.length -1 ) {
                moveData = <b>{moveData}</b>
            }

            return (
                // We generally do not want to use indexes, as the list order can change. Here we do not change, so this is okay.
                <li key={move}>
                    <div>{moveData}<button onClick={() => this.jumpTo(move)}>{desc}</button></div>
                </li>
            );
        });
        if (!this.state.sortAsc) {
            moves = moves.reverse();
        }
        return moves
    }

    render () {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = this.calculateMoves();

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div><button onClick={() => this.handleSortToggle()}>Toggle Sort?</button></div>
                    <ol>{moves}</ol>
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
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
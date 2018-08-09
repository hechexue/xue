import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



class Square extends React.Component {
    render() {
        return (
            <button className="square"
                    disabled={this.props.value}
                    onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}



class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }
    render() {
        let status;
        if (this.props.winner) {
            status = 'Winner: ' + this.props.winner;
        } else {
            status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
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
function calculateWinner(squares, stepNumber) {
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
            alert(squares[a]+'获胜！')
            return squares[a];
        } else if (stepNumber===9){
            alert('平局')
            return '平局'
        }
    }
    return null;
}
class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber:0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
        console.log(this.state.history)
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares,this.state.stepNumber);
        const moves = history.map((step, move) => {
            const desc = move ?
                'Move #' + move :
                'Game start';
            return (
                <li>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board  squares={current.squares}
                            xIsNext = {this.state.xIsNext}
                            winner={winner}
                            onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>status</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

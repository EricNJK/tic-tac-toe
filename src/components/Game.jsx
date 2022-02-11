import { useState, useEffect } from "react";
import Board from "./Board";

export default function Game() {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [xIsNext, setXIsNext] = useState(true);
    const [status, setStatus] = useState("");

    // index -> move
    // history[index].squares -> step
    const moves = history.map((step, move) => {
        let description = move ? 'Go to move #' + move : 'Go to game start';

        return (
            <li key={move}><button onClick={() => jumpTo(move)}>{description}</button></li>
        )
    })

    const handleClick = (number) => {
        // get current
        let squares = history[history.length - 1].squares;

        if (squares[number]) {  // clicked a previously marked square
            alert("Selected square is occupied.");
            return;
        } else {  // next move  
            const squaresCopy = squares.slice();
            squaresCopy[number] = xIsNext ? 'X' : 'O';
            setHistory(history.concat([{ squares: squaresCopy }]));
            setXIsNext(!xIsNext);
        }
    };

    const resetGame = () => {
        //setSquares(Array(9).fill(null));
    };

    useEffect(() => {
        // check for winner
        let winner = calculateWinner(history[history.length - 1].squares);
        if (winner) {
            //setStatus("Winner: " + winner);
            alert("Congratulations player " + winner +
                "\nClick OK to start a new Game");
            jumpTo(0);
        }
        setStatus('Next player: ' + (xIsNext ? 'X' : 'O'));
    }, [xIsNext]);

    // Restores history[move].squares as current
    const jumpTo = (move) => {
        // we don't want to lose start state: (move + 1)
        let result = history.slice(0, move + 1);
        setHistory(result);
    };

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={history[history.length - 1].squares}
                    onClick={(i) => handleClick(i)} />
            </div>
            <div className="game-info">
                <div className="status">{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const winLines = [
        [0, 1, 2],  // 3 horizontal
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],  // 3 vertical
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],  // 2 diagonals
        [6, 2, 4]
    ];

    for (let i = 0; i < winLines.length; i++) {
        const [a, b, c] = winLines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] == squares[c]) {
            return squares[a];
        }
    }
    return null;
};
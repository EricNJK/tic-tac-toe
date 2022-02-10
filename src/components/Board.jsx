import { useEffect, useState } from "react";
import Square from "./Square";

export default function Board(props) {
    const [status, setStatus] = useState('Next player: X');
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXisNext] = useState(true);

    const renderSquare = (i) => {
        return <Square num={i} value={squares[i]} onClick={() => handleClick(i)} />;
    };

    const handleClick = (number) => {
        if (squares[number]) {  // clicked a previously marked square
            alert("Selected square is occupied.");
            return;
        } else {  // next move  
            const squaresCopy = squares.slice();
            squaresCopy[number] = xIsNext ? 'X' : 'O';
            setSquares(squaresCopy);
            setXisNext(!xIsNext);
        }
        // todo: check when squares are used up without winner, 
        // reset/ new game
        //if (squares.reduce((previousValue, currentValue, array)=>))
    };

    const resetGame = () => {
        setSquares(Array(9).fill(null));
    };

    useEffect(() => {
        // check for winner
        let winner = calculateWinner();
        if (winner) {
            setStatus("Winner: " + winner);
            alert("Congratulations player " + winner +
                "\nReload to start a new Game");
        } else {
            setStatus('Next player: ' + (xIsNext ? 'X' : 'O'));
        }
        console.log("xIsNext: " + xIsNext);
    }, [xIsNext]);

    const calculateWinner = () => {
        const winLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
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

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

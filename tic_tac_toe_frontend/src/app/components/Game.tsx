'use client';

import { useState } from 'react';
import Board from './Board';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current);
  const isDraw = !winner && current.every(square => square !== null);

  const handleClick = (i: number) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const currentSquares = [...current];

    if (calculateWinner(currentSquares) || currentSquares[i]) {
      return;
    }

    currentSquares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, currentSquares]);
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = 'Game ended in a draw!';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <h1 className="text-4xl font-bold text-primary">Tic Tac Toe</h1>
      
      <div className="text-xl font-semibold mb-4 fade-in" style={{ color: winner ? 'var(--color-accent)' : 'var(--color-primary)' }}>
        {status}
      </div>

      <Board squares={current} onClick={handleClick} />

      <div className="flex gap-4">
        <button
          onClick={resetGame}
          className="px-6 py-2 bg-primary text-white rounded-lg 
            hover:bg-primary/90 transition-colors focus:outline-none 
            focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          Reset Game
        </button>
        {(winner || isDraw) && (
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-accent text-white rounded-lg 
              hover:bg-accent/90 transition-colors focus:outline-none 
              focus:ring-2 focus:ring-accent focus:ring-opacity-50"
          >
            New Game
          </button>
        )}
      </div>
    </div>
  );
}

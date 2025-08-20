import Square from './Square';

interface BoardProps {
  squares: (string | null)[];
  onClick: (i: number) => void;
}

export default function Board({ squares, onClick }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-lg shadow-lg scale-in">
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  );
}

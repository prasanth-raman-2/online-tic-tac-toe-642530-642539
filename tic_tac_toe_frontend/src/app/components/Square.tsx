interface SquareProps {
  value: string | null;
  onClick: () => void;
}

export default function Square({ value, onClick }: SquareProps) {
  return (
    <button
      className={`w-20 h-20 border-2 border-primary text-4xl font-bold 
        flex items-center justify-center transition-colors scale-in
        hover:bg-secondary/10 focus:outline-none focus:ring-2 
        focus:ring-primary focus:ring-opacity-50
        ${value ? 'text-accent' : 'text-primary'}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

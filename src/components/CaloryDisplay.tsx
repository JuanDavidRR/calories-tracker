type CaloryDisplayProps = {
  calories: number;
  text: string;
};

function CaloryDisplay({ calories, text }: CaloryDisplayProps) {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-xl text-center">
      <span className="font-black text-6xl">{calories}</span>
      {text}
    </p>
  );
}

export default CaloryDisplay;

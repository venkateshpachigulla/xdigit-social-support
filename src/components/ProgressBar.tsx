type Props = { step: number };

export default function ProgressBar({ step }: Props) {
  return (
    <div className="flex gap-2 mb-4">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className={`flex-1 h-2 rounded ${
            step >= s ? "bg-blue-500" : "bg-gray-300"
          }`}
        ></div>
      ))}
    </div>
  );
}

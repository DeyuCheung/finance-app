import { textBody } from "./typography";

type StressIndicatorProps = {
  score: number;
};

export function StressIndicator({ score }: StressIndicatorProps) {
  const clamped = Math.min(Math.max(score, 0), 100);

  return (
    <div className="flex flex-col gap-3">
      <div
        className={`flex items-center justify-between tracking-wide text-stone-500 ${textBody}`}
      >
        <span>压力指数</span>
        <span className="tabular-nums text-stone-600">{clamped}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-200/80">
        <div
          className="h-full rounded-full bg-stone-400/90 transition-all duration-500 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

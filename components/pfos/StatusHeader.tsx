import { formatAmount } from "@/lib/finance";
import { StressIndicator } from "./StressIndicator";
import { textBody, textMetric, textTitle } from "./typography";

type StatusHeaderProps = {
  cash: number;
  netFlow: number;
  stressScore: number;
};

export function StatusHeader({ cash, netFlow, stressScore }: StatusHeaderProps) {
  return (
    <header className="border-b border-stone-200/80 pb-10">
      <p className={`${textBody} tracking-[0.2em] text-stone-400 uppercase`}>
        Personal Finance OS
      </p>
      <h1 className={`mt-2 text-stone-800 ${textTitle}`}>个人财务操作系统</h1>

      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        <div>
          <p className={`${textBody} text-stone-400`}>当前现金</p>
          <p className={`mt-2 text-stone-800 ${textMetric}`}>
            ¥{formatAmount(cash)}
          </p>
        </div>
        <div>
          <p className={`${textBody} text-stone-400`}>净流量</p>
          <p className={`mt-2 text-stone-700 ${textMetric}`}>
            {netFlow >= 0 ? "" : "−"}¥{formatAmount(Math.abs(netFlow))}
          </p>
        </div>
        <div className="sm:pt-1">
          <StressIndicator score={stressScore} />
        </div>
      </div>
    </header>
  );
}

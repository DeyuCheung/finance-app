import { formatAmount } from "@/lib/finance";
import { textBody, textMetric } from "./typography";

type DebtPanelProps = {
  debtInput: string;
  debt: number;
  onDebtChange: (value: string) => void;
};

const debtInputClass = `mt-2 w-full p-3 border border-red-200 bg-white/60 text-red-800 placeholder:text-red-300/80 focus:border-red-400 focus:outline-none rounded-sm transition-colors ${textBody}`;

export function DebtPanel({ debtInput, debt, onDebtChange }: DebtPanelProps) {
  return (
    <section className="rounded-sm border border-red-200/90 bg-red-50/40 p-8">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className={`${textBody} tracking-widest text-red-600/90`}>
            目前负债
          </h2>
          <p className={`mt-3 text-red-700 ${textMetric}`}>
            ¥{formatAmount(debt)}
          </p>
        </div>
        <div className="w-full max-w-[200px] sm:max-w-[220px]">
          <label htmlFor="debt" className={`${textBody} text-red-500/80`}>
            更新金额
          </label>
          <input
            id="debt"
            type="number"
            inputMode="decimal"
            className={debtInputClass}
            placeholder="0"
            value={debtInput}
            onChange={(e) => onDebtChange(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}

import { formatAmount } from "@/lib/finance";
import { textBody, textMetric } from "./typography";

type SummaryPanelProps = {
  totalExpense: number;
  netFlow: number;
  remainingCash: number;
};

export function SummaryPanel({
  totalExpense,
  netFlow,
  remainingCash,
}: SummaryPanelProps) {
  const rows = [
    { label: "总支出", value: totalExpense, prefix: "−" },
    { label: "净流量", value: netFlow, signed: true },
    { label: "剩余现金", value: remainingCash, signed: true },
  ];

  return (
    <section className="rounded-sm border border-stone-200/90 bg-[#f5f3ef] p-8">
      <h2 className={`${textBody} tracking-widest text-stone-400`}>汇总</h2>

      <dl className="mt-8 space-y-6">
        {rows.map(({ label, value, prefix, signed }) => (
          <div
            key={label}
            className="flex items-baseline justify-between border-b border-stone-200/50 pb-6 last:border-0 last:pb-0"
          >
            <dt className={`text-stone-500 ${textBody}`}>{label}</dt>
            <dd className={`text-stone-800 ${textMetric}`}>
              {signed ? (
                <>
                  {value >= 0 ? "" : "−"}¥{formatAmount(Math.abs(value))}
                </>
              ) : (
                <>
                  {prefix}¥{formatAmount(value)}
                </>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

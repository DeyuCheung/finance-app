import type { Expense } from "@/lib/types";
import { formatAmount } from "@/lib/finance";
import { textBody } from "./typography";

type ExpenseStreamProps = {
  expenses: Expense[];
};

export function ExpenseStream({ expenses }: ExpenseStreamProps) {
  return (
    <section className="rounded-sm border border-stone-200/90 bg-[#faf9f6] p-8">
      <div className="flex items-baseline justify-between">
        <h2 className={`${textBody} tracking-widest text-stone-400`}>
          支出事件流
        </h2>
        <span className={`${textBody} text-stone-300`}>{expenses.length} 条</span>
      </div>

      {expenses.length === 0 ? (
        <p className={`mt-12 text-center text-stone-300 ${textBody}`}>暂无记录</p>
      ) : (
        <ul className="mt-8 divide-y divide-stone-200/60">
          {expenses.map((expense, index) => (
            <li
              key={`${expense.time}-${index}`}
              className="flex items-baseline justify-between gap-4 py-4 first:pt-0"
            >
              <div className="min-w-0">
                <p className={`truncate text-stone-700 ${textBody}`}>
                  {expense.name}
                </p>
                <p className={`mt-1 text-stone-400 ${textBody}`}>{expense.time}</p>
              </div>
              <p className={`shrink-0 tabular-nums text-stone-600 ${textBody}`}>
                −¥{formatAmount(expense.amount)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

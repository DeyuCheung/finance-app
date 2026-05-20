type InputPanelProps = {
  cashInput: string;
  incomeInput: string;
  expenseName: string;
  expenseAmount: string;
  onCashChange: (value: string) => void;
  onIncomeChange: (value: string) => void;
  onExpenseNameChange: (value: string) => void;
  onExpenseAmountChange: (value: string) => void;
  onAddExpense: () => void;
};

import { textBody } from "./typography";

const inputClass = `w-full p-3 border border-stone-200 bg-white/60 text-stone-800 placeholder:text-stone-300 focus:border-stone-400 focus:outline-none rounded-sm transition-colors ${textBody}`;

const labelClass = `${textBody} text-stone-400`;

export function InputPanel({
  cashInput,
  incomeInput,
  expenseName,
  expenseAmount,
  onCashChange,
  onIncomeChange,
  onExpenseNameChange,
  onExpenseAmountChange,
  onAddExpense,
}: InputPanelProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddExpense();
  };

  return (
    <section className="rounded-sm border border-stone-200/90 bg-[#faf9f6] p-8">
      <h2 className={`${textBody} tracking-widest text-stone-400`}>输入</h2>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cash" className={labelClass}>
            现金
          </label>
          <input
            id="cash"
            type="number"
            inputMode="decimal"
            className={inputClass}
            placeholder="0"
            value={cashInput}
            onChange={(e) => onCashChange(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="income" className={labelClass}>
            收入
          </label>
          <input
            id="income"
            type="number"
            inputMode="decimal"
            className={inputClass}
            placeholder="0"
            value={incomeInput}
            onChange={(e) => onIncomeChange(e.target.value)}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 border-t border-stone-200/70 pt-8">
        <p className={labelClass}>支出事件</p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="expense-name" className="sr-only">
              名称
            </label>
            <input
              id="expense-name"
              type="text"
              className={inputClass}
              placeholder="名称，如咖啡、地铁"
              value={expenseName}
              onChange={(e) => onExpenseNameChange(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-40">
            <label htmlFor="expense-amount" className="sr-only">
              金额
            </label>
            <input
              id="expense-amount"
              type="number"
              inputMode="decimal"
              className={inputClass}
              placeholder="金额"
              value={expenseAmount}
              onChange={(e) => onExpenseAmountChange(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`shrink-0 border border-stone-300 px-8 py-3 tracking-widest text-stone-600 transition-colors hover:border-stone-400 hover:bg-stone-50 ${textBody}`}
          >
            添加
          </button>
        </div>
      </form>
    </section>
  );
}

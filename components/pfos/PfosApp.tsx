"use client";

import { useMemo, useState } from "react";
import { computeMetrics, formatTime } from "@/lib/finance";
import type { Expense } from "@/lib/types";
import { StatusHeader } from "./StatusHeader";
import { InputPanel } from "./InputPanel";
import { ExpenseStream } from "./ExpenseStream";
import { SummaryPanel } from "./SummaryPanel";
import { DebtPanel } from "./DebtPanel";
import { textBody } from "./typography";

function parseNumber(value: string): number {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}

export function PfosApp() {
  const [cashInput, setCashInput] = useState("");
  const [incomeInput, setIncomeInput] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [debtInput, setDebtInput] = useState("");

  const cash = useMemo(() => parseNumber(cashInput), [cashInput]);
  const income = useMemo(() => parseNumber(incomeInput), [incomeInput]);
  const debt = useMemo(() => parseNumber(debtInput), [debtInput]);

  const { totalExpense, netFlow, remainingCash, stressScore } = useMemo(
    () => computeMetrics(cash, income, expenses, debt),
    [cash, income, expenses, debt],
  );

  const addExpense = () => {
    const name = expenseName.trim();
    const amount = parseNumber(expenseAmount);
    if (!name || amount <= 0) return;

    setExpenses((prev) => [
      { name, amount, time: formatTime() },
      ...prev,
    ]);
    setExpenseName("");
    setExpenseAmount("");
  };

  return (
    <div className="min-h-screen bg-neutral-100 p-4 font-sans text-lg font-light text-stone-800 md:p-10 md:text-base">
      <main className="mx-auto max-w-5xl">
        <StatusHeader
          cash={cash}
          netFlow={netFlow}
          stressScore={stressScore}
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputPanel
            cashInput={cashInput}
            incomeInput={incomeInput}
            expenseName={expenseName}
            expenseAmount={expenseAmount}
            onCashChange={setCashInput}
            onIncomeChange={setIncomeInput}
            onExpenseNameChange={setExpenseName}
            onExpenseAmountChange={setExpenseAmount}
            onAddExpense={addExpense}
          />

          <DebtPanel
            debtInput={debtInput}
            debt={debt}
            onDebtChange={setDebtInput}
          />

          <ExpenseStream expenses={expenses} />

          <SummaryPanel
            totalExpense={totalExpense}
            netFlow={netFlow}
            remainingCash={remainingCash}
          />
        </div>

        <footer className={`mt-16 text-center tracking-widest text-stone-300 ${textBody}`}>
          系统记录 · 本地状态
        </footer>
      </main>
    </div>
  );
}


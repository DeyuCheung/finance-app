import type { Expense, FinanceMetrics } from "./types";

export function formatTime(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${d} ${h}:${min}`;
}

export function computeStressScore(
  cash: number,
  netFlow: number,
  totalExpense: number,
  debt = 0,
): number {
  let score = 0;
  if (cash < 1000) score += 30;
  if (netFlow < 0) score += 25;
  if (totalExpense > cash) score += 25;
  if (debt > 0) score += 20;
  return Math.min(score, 100);
}

export function computeMetrics(
  cash: number,
  income: number,
  expenses: Expense[],
  debt = 0,
): FinanceMetrics {
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netFlow = income - totalExpense;
  const remainingCash = cash + netFlow;
  const stressScore = computeStressScore(cash, netFlow, totalExpense, debt);

  return { totalExpense, netFlow, remainingCash, stressScore };
}

export function formatAmount(value: number): string {
  return value.toLocaleString("zh-CN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

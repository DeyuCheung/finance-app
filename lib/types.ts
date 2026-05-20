export type Expense = {
  name: string;
  amount: number;
  time: string;
};

export type FinanceMetrics = {
  totalExpense: number;
  netFlow: number;
  remainingCash: number;
  stressScore: number;
};

"use client";

import { useEffect, useState } from "react";

type Expense = { name: string; amount: number; date: string };
type Income = { source: string; amount: number; date: string };
type Debt = { name: string; amount: number };

export default function PfosApp() {
  /* ===== STATE ===== */
  const [baseCash, setBaseCash] = useState(0);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);

  const [incSource, setIncSource] = useState("");
  const [incAmount, setIncAmount] = useState("");
  const [expName, setExpName] = useState("");
  const [expAmount, setExpAmount] = useState("");
  const [debtName, setDebtName] = useState("");
  const [debtAmount, setDebtAmount] = useState("");
  const [aiSummary, setAiSummary] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  /* ===== SAFE MONEY ===== */
  const toMoney = (n: number) => Math.round(n * 100) / 100;

  /* ===== LOAD ===== */
  useEffect(() => {
    const saved = localStorage.getItem("pfos-data");
    if (saved) {
      const data = JSON.parse(saved);
      setBaseCash(data.baseCash || 0);
      setIncomes(data.incomes || []);
      setExpenses(data.expenses || []);
      setDebts(data.debts || []);
    }
  }, []);

  /* ===== SAVE ===== */
  useEffect(() => {
    localStorage.setItem(
      "pfos-data",
      JSON.stringify({ baseCash, incomes, expenses, debts })
    );
  }, [baseCash, incomes, expenses, debts]);

  /* ===== CALC ===== */
  const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);

  const cash = toMoney(baseCash + totalIncome - totalExpense);
  const totalDebt = debts.reduce((s, d) => s + d.amount, 0);

const riskScore = Math.min(
  100,
  (totalDebt / (cash + totalIncome + 1)) * 60 +
  (totalExpense / (totalIncome + 1)) * 40
);

const getRiskLevel = (s: number) => {
  if (s < 30) return "🟢 LOW";
  if (s < 60) return "🟡 MEDIUM";
  if (s < 80) return "🟠 HIGH";
  return "🔴 CRITICAL";
};

  /* ===== ADD ===== */
  const addIncome = () => {
    if (!incSource || !incAmount) return;
    setIncomes([
      ...incomes,
      { source: incSource, amount: toMoney(Number(incAmount)), date: new Date().toISOString() },
    ]);
    setIncSource("");
    setIncAmount("");
  };

  const addExpense = () => {
    if (!expName || !expAmount) return;
    setExpenses([
      ...expenses,
      { name: expName, amount: toMoney(Number(expAmount)), date: new Date().toISOString() },
    ]);
    setExpName("");
    setExpAmount("");
  };

  const addDebt = () => {
    if (!debtName || !debtAmount) return;
    setDebts([
      ...debts,
      { name: debtName, amount: toMoney(Number(debtAmount)) },
    ]);
    setDebtName("");
    setDebtAmount("");
  };
  const generateAI = async () => {
  setLoadingAI(true);

  const res = await fetch("/api/ai-summary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ incomes, expenses }),
  });

  const data = await res.json();

  setAiSummary(data.text || data.error || "");
  setLoadingAI(false);
};

  /* ===== UI ===== */
  const input = {
    width: "100%",
    padding: 10,
    marginTop: 8,
    borderRadius: 12,
    border: "1px solid #ddd",
  };

  const card = {
    background: "rgba(255,255,255,0.75)",
    padding: 16,
    borderRadius: 20,
    marginBottom: 14,
  };

  return (
    <div style={{ padding: 20, fontFamily: "system-ui" }}>
     {/* TITLE */}
<div style={{ textAlign: "center", marginBottom: "28px" }}>
  <h1
    style={{
      fontSize: "42px",       // 大字
      fontWeight: "900",      // 加粗
      margin: 0,
      letterSpacing: "2px",
      color: "#3f51b5",       // 靛蓝色
    }}
  >
    ユナ資金リスク管理
  </h1>

  <div
    style={{
      marginTop: "8px",
      fontSize: "14px",
      color: "#7b6f9e",      // 小字英文
      letterSpacing: "1.5px",
      fontWeight: "600",
    }}
  >
    YUNA FINANCIAL RISK MANAGEMENT SYSTEM
  </div>
</div>

      {/* CASH */}
      <div style={card}>
        <h3>现金 ¥{cash}</h3>
        <input
          style={input}
          type="number"
          value={baseCash}
          onChange={(e) => setBaseCash(Number(e.target.value))}
        />
      </div>

      {/* INCOME */}
      <div style={card}>
        <h3>收入</h3>

        {incomes.map((i, idx) => (
          <div key={idx}>
            {i.source} +¥{i.amount}
            <button onClick={() =>
              setIncomes(incomes.filter((_, i) => i !== idx))
            }>
              删除
            </button>
          </div>
        ))}

        <input style={input} value={incSource} onChange={(e) => setIncSource(e.target.value)} placeholder="来源" />
        <input style={input} value={incAmount} onChange={(e) => setIncAmount(e.target.value)} placeholder="金额" />
        <button onClick={addIncome}>添加</button>
      </div>

      {/* EXPENSE */}
      <div style={card}>
        <h3>支出</h3>

        {expenses.map((e, idx) => (
          <div key={idx}>
            {e.name} -¥{e.amount}
            <button onClick={() =>
              setExpenses(expenses.filter((_, i) => i !== idx))
            }>
              删除
            </button>
          </div>
        ))}

        <input style={input} value={expName} onChange={(e) => setExpName(e.target.value)} placeholder="名称" />
        <input style={input} value={expAmount} onChange={(e) => setExpAmount(e.target.value)} placeholder="金额" />
        <button onClick={addExpense}>添加</button>
      </div>

      {/* DEBT */}
      <div style={card}>
        <h3>负债</h3>

        {debts.map((d, idx) => (
          <div key={idx}>
            {d.name} -¥{d.amount}
            <button onClick={() =>
              setDebts(debts.filter((_, i) => i !== idx))
            }>
              删除
            </button>
          </div>
        ))}

        <input style={input} value={debtName} onChange={(e) => setDebtName(e.target.value)} placeholder="负债" />
        <input style={input} value={debtAmount} onChange={(e) => setDebtAmount(e.target.value)} placeholder="金额" />
        <button onClick={addDebt}>添加</button>
      </div>

      <div style={card}>
  <h3>🤖 AI 周报</h3>

  <button onClick={generateAI} disabled={loadingAI}>
    {loadingAI ? "生成中..." : "生成AI总结"}
  </button>

  {aiSummary && (
    <div style={{ marginTop: 10, whiteSpace: "pre-line" }}>
      {aiSummary}
    </div>
  )}
</div>

      {/* RESET */}
      <button
        style={{ marginTop: 20 }}
        onClick={() => {
          localStorage.clear();
          location.reload();
        }}
      >
        重置
      </button>
    </div>
  );
}
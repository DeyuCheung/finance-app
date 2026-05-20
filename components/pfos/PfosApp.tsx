"use client";

import { useEffect, useState } from "react";

type Expense = {
  name: string;
  amount: number;
  date: string;
};

type Income = {
  source: string;
  amount: number;
  date: string;
};

type Debt = {
  name: string;
  amount: number;};

export default function PfosApp() {
  // 💰 现有存款
  const [baseCash, setBaseCash] = useState(0);

  // 💵 收入
  const [incomes, setIncomes] = useState<Income[]>([]);

  // 💸 支出
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // ❤️ 负债
  const [debts, setDebts] = useState<Debt[]>([]);

  // ✏️ 输入
  const [incSource, setIncSource] = useState("");
  const [incAmount, setIncAmount] = useState("");

  const [expName, setExpName] = useState("");
  const [expAmount, setExpAmount] = useState("");

  const [debtName, setDebtName] = useState("");
  const [debtAmount, setDebtAmount] = useState("");


  // 📊 统计
  const totalIncome = incomes.reduce(
    (s, i) => s + i.amount,
    0
  );

  const totalExpense = expenses.reduce(
    (s, e) => s + e.amount,
    0
  );

  const totalDebt = debts.reduce(
    (s, d) => s + d.amount,
    0
  );

  // 💰 当前现金
  const cash =
    baseCash + totalIncome - totalExpense;

  // 😵 压力值
  const stress = Math.min(
    100,
    (
      (totalExpense + totalDebt) /
      (cash + totalIncome + 1)
    ) * 100
  );

  // 💾 本地保存
  useEffect(() => {
    const saved = localStorage.getItem(
      "pfos-data"
    );

    if (saved) {
      const data = JSON.parse(saved);

      setBaseCash(data.baseCash || 0);
      setIncomes(data.incomes || []);
      setExpenses(data.expenses || []);
      setDebts(data.debts || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "pfos-data",
      JSON.stringify({
        baseCash,
        incomes,
        expenses,
        debts,
      })
    );
  }, [baseCash, incomes, expenses, debts]);

  // 📅 日期
  const today = new Date();

  const isThisWeek = (date: string) => {
    const d = new Date(date);

    const diff =
      (today.getTime() - d.getTime()) /
      (1000 * 60 * 60 * 24);

    return diff <= 7;
  };

  const isThisMonth = (date: string) => {
    const d = new Date(date);

    return (
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  // 📊 周报
  const weekIncome = incomes
    .filter((i) => isThisWeek(i.date))
    .reduce((s, i) => s + i.amount, 0);

  const weekExpense = expenses
    .filter((e) => isThisWeek(e.date))
    .reduce((s, e) => s + e.amount, 0);

  // 📊 月报
  const monthIncome = incomes
    .filter((i) => isThisMonth(i.date))
    .reduce((s, i) => s + i.amount, 0);

  const monthExpense = expenses
    .filter((e) => isThisMonth(e.date))
    .reduce((s, e) => s + e.amount, 0);

  // ➕ 收入
  const addIncome = () => {
    if (!incSource || !incAmount) return;

    setIncomes([
      ...incomes,
      {
        source: incSource,
        amount: Number(incAmount),
        date: new Date().toISOString(),
      },
    ]);

    setIncSource("");
    setIncAmount("");
  };

  // ➕ 支出
  const addExpense = () => {
    if (!expName || !expAmount) return;

    setExpenses([
      ...expenses,
      {
        name: expName,
        amount: Number(expAmount),
        date: new Date().toISOString(),
      },
    ]);

    setExpName("");
    setExpAmount("");
  };

  // ➕ 负债
  const addDebt = () => {
    if (!debtName || !debtAmount) return;

    setDebts([
      ...debts,
      {
        name: debtName,
        amount: Number(debtAmount),
      },
    ]);

    setDebtName("");
    setDebtAmount("");
  };

  // ✨ 通用输入框样式
  const inputStyle = {
  padding: "14px",
  border: "2px solid #ffffff",
  borderRadius: "18px",
  marginTop: "10px",
  width: "100%",
  background: "rgba(255,255,255,0.85)",
  fontSize: "16px",
  boxSizing: "border-box" as const,
  outline: "none",
};

  // ✨ 卡片
  const cardStyle = {
  background: "rgba(255,255,255,0.72)",
  padding: "20px",
  borderRadius: "28px",
  marginBottom: "20px",
  boxShadow: "0 10px 30px rgba(255,255,255,0.35)",
  backdropFilter: "blur(16px)",
  border: "2px solid rgba(255,255,255,0.45)",
};

  return (
    <div
    
      style={{
        
  padding: "20px",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, sans-serif",
  background:
  "linear-gradient(135deg, #ffd6ec 0%, #d6f7ff 25%, #e4ffd6 50%, #fff7b8 75%, #e6d6ff 100%)",
  minHeight: "100vh",
}}
    >
      <div
  style={{
    textAlign: "center",
    marginBottom: "28px",
  }}
>
  <h1
    style={{
      fontSize: "42px",
      fontWeight: "900",
      margin: 0,
      letterSpacing: "2px",
      color: "#3f51b5",
    }}
  >
    ユナ資金リスク管理
  </h1>

  <div
    style={{
      marginTop: "8px",
      fontSize: "14px",
      color: "#7b6f9e",
      letterSpacing: "1.5px",
      fontWeight: "600",
    }}
  >
    YUNA FINANCIAL RISK MANAGEMENT SYSTEM
  </div>
</div>

      {/* 💰 现金 */}
      <div
  style={{
    ...cardStyle,
  }}
>
        <h2>当前现金：¥ {cash}</h2>
<input
  placeholder="修改现有存款"
  type="number"
  value={baseCash}
  onChange={(e) =>
    setBaseCash(Number(e.target.value))
  }
  style={inputStyle}
/>
        <div>现有存款：¥ {baseCash}</div>

        <div
          style={{
            marginTop: "5px",
            color: "#666",
          }}
        >


        </div>
      </div>

      {/* ❤️ 负债 */}
      <div
        style={{
          ...cardStyle,
          border: "2px solid #ff9ecf",
          background:
  "linear-gradient(135deg,#ffd6e7,#ffe3f7,#fff0f5)",
        }}
      >
        <h3>负债（总负债 ¥ {totalDebt}）</h3>

        {debts.map((d, idx) => (
          <div key={idx}>
            {d.name} -¥{d.amount}

            <button
              style={{ marginLeft: "10px" }}
              onClick={() => {
                const newName = prompt(
                  "修改负债名称",
                  d.name
                );

                const newAmount = prompt(
                  "修改金额",
                  String(d.amount)
                );

                if (
                  newName &&
                  newAmount
                ) {
                  const updated = [...debts];

                  updated[idx] = {
                    name: newName,
                    amount: Number(newAmount),
                  };

                  setDebts(updated);
                }
              }}
            >
              编辑
            </button>

            <button
              style={{ marginLeft: "10px" }}
              onClick={() =>
                setDebts(
                  debts.filter(
                    (_, i) => i !== idx
                  )
                )
              }
            >
              删除
            </button>
          </div>
        ))}

        <input
          placeholder="负债名称"
          value={debtName}
          onChange={(e) =>
            setDebtName(e.target.value)
          }
          style={inputStyle}
        />

        <input
          placeholder="负债金额"
          type="number"
          value={debtAmount}
          onChange={(e) =>
            setDebtAmount(e.target.value)
          }
          style={inputStyle}
        />

        <button
          style={{ marginTop: "10px" }}
          onClick={addDebt}
        >
          添加负债
        </button>
      </div>

      {/* 😵 压力 */}
      <div style={cardStyle}>
        <h3>压力指数</h3>

        <div
          style={{
            width: "100%",
            height: "20px",
            background: "#eee",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${stress}%`,
              height: "100%",
              background:
  stress > 70
    ? "linear-gradient(90deg,#ff6ba6,#ff3b7a)"
    : "linear-gradient(90deg,#7bdff2,#b2f7ef,#eff7f6,#f7d6e0,#f2b5d4)",
            }}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          {stress.toFixed(1)} / 100
        </div>
      </div>

      {/* 💵 收入 */}
      <div style={cardStyle}>
  <h3
  style={{
    color: "#6b5b95",
    fontWeight: "800",
    fontSize: "22px",
    marginBottom: "12px",
  }}
>
          收入明细（总收入 ¥ {totalIncome}）
        </h3>

        {incomes.map((i, idx) => (
          <div key={idx}>
            {i.source} +¥{i.amount}

            <button
              style={{ marginLeft: "10px" }}
              onClick={() => {
                const source = prompt(
                  "修改收入来源",
                  i.source
                );

                const amount = prompt(
                  "修改金额",
                  String(i.amount)
                );

                if (source && amount) {
                  const updated = [
                    ...incomes,
                  ];

                  updated[idx] = {
                    ...updated[idx],
                    source,
                    amount:
                      Number(amount),
                  };

                  setIncomes(updated);
                }
              }}
            >
              编辑
            </button>

            <button
              style={{ marginLeft: "10px" }}
              onClick={() =>
                setIncomes(
                  incomes.filter(
                    (_, n) => n !== idx
                  )
                )
              }
            >
              删除
            </button>
          </div>
        ))}

        <input
          placeholder="收入来源"
          value={incSource}
          onChange={(e) =>
            setIncSource(e.target.value)
          }
          style={inputStyle}
        />

        <input
          placeholder="收入金额"
          type="number"
          value={incAmount}
          onChange={(e) =>
            setIncAmount(e.target.value)
          }
          style={inputStyle}
        />

        <button
          style={{ marginTop: "10px" }}
          onClick={addIncome}
        >
          添加收入
        </button>
      </div>

      {/* 💸 支出 */}
      <div style={cardStyle}>
        <h3
  style={{
    color: "#6b5b95",
    fontWeight: "800",
    fontSize: "22px",
    marginBottom: "12px",
  }}
>
          支出明细（总支出 ¥ {totalExpense}）
        </h3>

        {expenses.map((e, idx) => (
          <div key={idx}>
            {e.name} -¥{e.amount}

            <button
              style={{ marginLeft: "10px" }}
              onClick={() => {
                const name = prompt(
                  "修改支出名称",
                  e.name
                );

                const amount = prompt(
                  "修改金额",
                  String(e.amount)
                );

                if (name && amount) {
                  const updated = [
                    ...expenses,
                  ];

                  updated[idx] = {
                    ...updated[idx],
                    name,
                    amount:
                      Number(amount),
                  };

                  setExpenses(updated);
                }
              }}
            >
              编辑
            </button>

            <button
              style={{ marginLeft: "10px" }}
              onClick={() =>
                setExpenses(
                  expenses.filter(
                    (_, i) => i !== idx
                  )
                )
              }
            >
              删除
            </button>
          </div>
        ))}

        <input
          placeholder="支出名称"
          value={expName}
          onChange={(e) =>
            setExpName(e.target.value)
          }
          style={inputStyle}
        />

        <input
          placeholder="支出金额"
          type="number"
          value={expAmount}
          onChange={(e) =>
            setExpAmount(e.target.value)
          }
          style={inputStyle}
        />

        <button
          style={{ marginTop: "10px" }}
          onClick={addExpense}
        >
          添加支出
        </button>
      </div>

      {/* 📅 周报/月报 */}
      <div style={cardStyle}>
        <h3>周报 / 月报</h3>

        <div>
          本周收入：¥ {weekIncome}
        </div>

        <div>
          本周支出：¥ {weekExpense}
        </div>

        <hr />

        <div>
          本月收入：¥ {monthIncome}
        </div>

        <div>
          本月支出：¥ {monthExpense}
        </div>
      </div>

      {/* ✏️ 修改存款 */}
      

      {/* 🗑 重置 */}
      <button
        style={{
          marginTop: "30px",
          padding: "10px",
          borderRadius: "10px",
          background: "#ffdede",
        }}
        onClick={() => {
          localStorage.removeItem(
            "pfos-data"
          );

          location.reload();
        }}
      >
        重置所有数据
      </button>
    </div>
  );
}

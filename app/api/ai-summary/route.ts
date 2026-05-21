import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { incomes, expenses } = await req.json();

    const prompt = `
你是一个财务分析AI。

请根据以下数据生成：
1. 本周财务总结
2. 主要消费分类
3. 一句优化建议（必须具体）

收入：${JSON.stringify(incomes)}
支出：${JSON.stringify(expenses)}

要求：中文 + 简洁 + 理财顾问语气
`;

    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "你是专业财务分析助手" },
        { role: "user", content: prompt },
      ],
    });

    return Response.json({
      text: res.choices[0].message.content,
    });

  } catch (err: any) {
    return Response.json(
      { error: err.message || "AI error" },
      { status: 500 }
    );
  }
}
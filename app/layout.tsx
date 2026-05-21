import "./globals.css";

export const metadata = {
  title: "Yuna资金风险管理",
  description: "Financial system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, sans-serif",
          background:
            "linear-gradient(135deg,#ffd6ec,#d6f7ff,#e4ffd6,#fff7b8,#e6d6ff)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
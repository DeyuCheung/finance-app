import "./globals.css";

export const metadata = {
  title: "Yuna资金风险管理",
  description: "Financial System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, sans-serif",
          background: "#fff",
        }}
      >
        {children}
      </body>
    </html>
  );
}

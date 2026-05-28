import "./globals.css";

export const metadata = {
  title: "elab tools",
  description: "First test deployment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}

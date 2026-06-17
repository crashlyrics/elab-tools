import "./globals.css";

export const metadata = {
  title: "elab.shop",
  description: "Digitale Werkzeuge für professionellen workflow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}

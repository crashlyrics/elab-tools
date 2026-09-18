import "@neondatabase/auth-ui/css";
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "elab.shop",
  description: "Digitale Werkzeuge für den professionellen Workflow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "MXO Soluções",
  description: "Gerador de relátorios mxo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

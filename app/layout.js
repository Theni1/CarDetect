import './globals.css'
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className = "font-sans">
        <main>
        {children}
        </main>
      </body>
    </html>
  );  
}

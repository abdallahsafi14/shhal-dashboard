import { Cairo } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
});

export const metadata = {
  title: "Shhal Dashboard",
  description: "Admin Dashboard for Shhal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-sans antialiased bg-[var(--background)] text-[var(--foreground)]`}>
        <div className="flex min-h-screen">
          {/* Sidebar - Fixed Right */}
          <Sidebar />
          
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col mr-64 w-full transition-all duration-300">
            <Header />
            <main className="flex-1 p-8 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

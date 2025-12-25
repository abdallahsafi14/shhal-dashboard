import { Cairo } from "next/font/google";
import "./globals.css";
import DashboardLayout from "./DashboardLayout";

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
      <body className={`${cairo.variable} font-sans antialiased`}>
        <DashboardLayout>
            {children}
        </DashboardLayout>
      </body>
    </html>
  );
}

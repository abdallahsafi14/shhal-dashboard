"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import { useRouter } from "next/navigation";
import { USE_MOCK } from "@/lib/config";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Set sidebar to open by default on desktop, closed on mobile
    if (typeof window !== "undefined") {
      setIsSidebarOpen(window.innerWidth >= 1024);
    }
  }, []);

  useEffect(() => {
    if (USE_MOCK) return; // Skip auth check in mock mode

    const token = localStorage.getItem("shhal_admin_token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="flex min-h-screen bg-[#FDFDFD]">
        <div className="flex-1 flex flex-col w-full min-w-0">
          <div className="bg-white h-20" />
          <main className="flex-1 p-4 md:p-8 w-full max-w-[1600px] mx-auto overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FDFDFD]">
      {/* Sidebar - Drawer on Mobile, Fixed on Desktop */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div
        className={`
        flex-1 flex flex-col w-full min-w-0 transition-all duration-300
        lg:mr-64
      `}
      >
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-8 w-full max-w-[1600px] mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

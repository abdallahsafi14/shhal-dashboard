"use client";
import React from "react";
import { Search, Bell, Settings, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Header({ onMenuClick }) {
  return (
    <header className="bg-white h-20 px-4 md:px-8 flex items-center justify-between border-b border-gray-100 sticky top-0 z-40">
      {/* Right Side: Menu Button (Mobile) & Title */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 hidden sm:block">لوحة التحكم</h1>
      </div>

      {/* Left Side: Actions & Search */}
      <div className="flex items-center gap-3 md:gap-6 flex-1 justify-end">
        
        {/* Search Bar - Responsive */}
        <div className="relative w-full max-w-[120px] sm:max-w-[200px] md:max-w-xs lg:max-w-md hidden xs:block">
          <input
            type="text"
            placeholder="ابحث هنا"
            className="w-full bg-gray-50 border border-gray-100 rounded-full py-2 px-4 pl-10 text-sm text-right focus:ring-2 focus:ring-primary/20 outline-none focus:bg-white transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        {/* Icons Group */}
        <div className="flex items-center gap-2 md:gap-3">
          <button className="p-2 rounded-full border border-gray-100 hover:bg-gray-50 text-gray-400 hover:text-primary transition-all">
            <Bell className="w-5 h-5" />
          </button>
          
          <Link href="/settings" className="p-2 rounded-full border border-gray-100 hover:bg-gray-50 text-gray-400 hover:text-primary transition-all">
            <Settings className="w-5 h-5" />
          </Link>

          {/* Profile Picture */}
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-100 relative cursor-pointer hover:border-primary/50 transition-all">
             <Image
                src="/icons/Logo.png"
                alt="Profile"
                fill
                className="object-cover p-1"
                loading="lazy"
                suppressHydrationWarning
             />
          </div>
        </div>
      </div>
    </header>
  );
}

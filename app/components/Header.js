"use client";
import React from "react";
import { Search, Bell, Settings } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white h-20 px-8 flex items-center justify-between border-b border-gray-100">
      {/* Title Section (Right Side in RTL) */}
      <div className="flex-1">
         <h1 className="text-2xl font-bold text-gray-800">لوحة التحكم</h1>
      </div>

      {/* Actions & Search Section (Left Side) */}
      <div className="flex items-center gap-6">
        
        {/* Search Bar */}
        <div className="relative w-80">
          <input
            type="text"
            placeholder="ابحث هنا"
            className="w-full bg-gray-100 border-none rounded-full py-2.5 px-4 pl-10 text-sm text-right focus:ring-2 focus:ring-primary outline-none"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          {/* Profile Picture */}
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-200 relative">
             <Image
                src="/icons/Logo.png"
                alt="Profile"
                fill
                className="object-cover"
             />
          </div>
        </div>
      </div>
    </header>
  );
}

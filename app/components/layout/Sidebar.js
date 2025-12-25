"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Users, 
  Megaphone, 
  Coins, 
  FileText, 
  Layers 
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const menuItems = [
    { name: "إدارة الحسابات", icon: Users, href: "/accounts" },
    { name: "إدارة الإعلانات", icon: Megaphone, href: "/ads" },
    { name: "إدارة صرف النقاط", icon: Coins, href: "/points" },
    { name: "إدارة المدخلات", icon: FileText, href: "/orders" },
    { name: "إدارة الفئات", icon: Layers, href: "/categories" },
  ];

  return (
    <aside className="w-64 bg-white h-screen flex flex-col fixed right-0 top-0 z-50 shadow-sm border-l border-gray-100">
      {/* Logo Section */}
      <div className="flex items-center justify-center py-6 px-6 text-right">
        <div className="relative w-40 h-24">
          <Image
            src="/icons/Logo.png"
            alt="Shhal Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-8 space-y-2 mt-8">
        {menuItems.map((item, index) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center justify-start gap-4 px-6 py-4 transition-all duration-200 group font-bold relative ${
                isActive 
                  ? "text-[#8B8A6C]" 
                  : "text-gray-400 hover:text-[#8B8A6C]"
              }`}
            >
              <item.icon className="w-6 h-6 flex-shrink-0" />
              <span className="text-base">{item.name}</span>
              
              {isActive && (
                <div 
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-10 bg-[#8B8A6C] rounded-r-lg"
                />
              )}
              {/* Active Indicator Bar */}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

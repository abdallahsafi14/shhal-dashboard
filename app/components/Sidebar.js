"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Users, 
  Megaphone, 
  Coins, 
  FileText, 
  Layers 
} from "lucide-react";

export default function Sidebar() {
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
      <div className="flex items-center justify-center py-6 px-6">
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
      <nav className="flex-1 py-8 px-4 space-y-2 mt-8">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-50 transition-all duration-200 group font-bold"
          >
            <item.icon className="w-6 h-6 flex-shrink-0" />
            <span className="text-base">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

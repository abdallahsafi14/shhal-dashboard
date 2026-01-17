"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Megaphone, Coins, FileText, Layers, X } from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const menuItems = [
    { name: "إدارة الحسابات", icon: Users, href: "/" },
    { name: "إدارة الإعلانات", icon: Megaphone, href: "/ads" },
    { name: "إدارة صرف النقاط", icon: Coins, href: "/points" },
    { name: "إدارة المدخلات", icon: FileText, href: "/orders" },
    { name: "إدارة الفئات", icon: Layers, href: "/categories" },
    { name: "إدارة الفئات الفرعية", icon: Layers, href: "/sub-categories" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        fixed right-0 top-0 h-screen bg-white z-[70] shadow-xl border-l border-gray-100 transition-transform duration-300 w-64
        lg:translate-x-0 lg:z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        {/* Close Button Mobile */}
        <button
          onClick={onClose}
          className="lg:hidden absolute left-4 top-6 p-2 text-gray-500 hover:text-gray-800"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo Section */}
        <div className="flex items-center justify-center py-6 px-6">
          <div className="relative w-40 h-24">
            <Image
              src="/icons/Logo.png"
              alt="Shhal Logo"
              fill
              className="object-contain"
              priority
              unoptimized={false}
              suppressHydrationWarning
            />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-4 space-y-1 mt-4">
          {menuItems.map((item, index) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={index}
                href={item.href}
                onClick={(e) => {
                  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                    onClose();
                  }
                }}
                className={`flex items-center justify-end gap-4 px-6 py-4 transition-all duration-200 group font-bold relative ${
                  isActive
                    ? "text-[#8B8A6C] bg-gray-50/50"
                    : "text-gray-400 hover:text-[#8B8A6C] hover:bg-gray-50/30"
                }`}
              >
                <span className="text-base">{item.name}</span>
                <item.icon className="w-6 h-6 flex-shrink-0" />

                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#8B8A6C] rounded-l-lg" />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

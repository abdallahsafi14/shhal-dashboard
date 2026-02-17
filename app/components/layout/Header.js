"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, Settings, Menu, User, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import LogoutModal from "./LogoutModal";

export default function Header({ onMenuClick }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  const handleLogoutClick = () => {
    setIsProfileMenuOpen(false);
    setIsLogoutModalOpen(true);
  };

  return (
    <>
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
            {/* <button className="p-2 rounded-full border border-gray-100 hover:bg-gray-50 text-gray-400 hover:text-primary transition-all">
              <Bell className="w-5 h-5" />
            </button> */}
            
            <Link href="/settings" className="p-2 rounded-full border border-gray-100 hover:bg-gray-50 text-gray-400 hover:text-primary transition-all">
              <Settings className="w-5 h-5" />
            </Link>

            {/* Profile Picture with Dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-100 relative cursor-pointer hover:border-primary/50 transition-all flex items-center justify-center"
              >
                <Image
                  src="/icons/Logo.png"
                  alt="Profile"
                  fill
                  className="object-cover p-1"
                  loading="lazy"
                  suppressHydrationWarning
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left">
                  <Link
                    href="/profile"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-right hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                  >
                    <User className="w-5 h-5 text-gray-500" />
                    <span>الملف الشخصي</span>
                  </Link>
                  <button
                    onClick={handleLogoutClick}
                    className="w-full flex items-center gap-3 px-4 py-3 text-right hover:bg-red-50 transition-colors text-red-600 font-medium"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
}

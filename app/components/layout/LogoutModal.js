"use client";
import React, { useRef, useEffect } from "react";
import { X, LogOut } from "lucide-react";
import { useLogout } from "@/hooks/useDashboard";

export default function LogoutModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleConfirm = () => {
    logout();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden relative animate-in fade-in zoom-in duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
          disabled={isLoggingOut}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 pt-12">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <LogOut className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              تأكيد تسجيل الخروج
            </h2>
            <p className="text-gray-500 text-sm">
              هل أنت متأكد من رغبتك في تسجيل الخروج؟
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="text-[#0E3A53] font-bold px-8 py-3 rounded-lg border-2 border-[#0E3A53] hover:bg-[#0E3A53] hover:text-white transition-all"
              disabled={isLoggingOut}
            >
              إلغاء
            </button>
            <button
              onClick={handleConfirm}
              disabled={isLoggingOut}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold shadow-sm transition-all transform active:scale-95 flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              {isLoggingOut ? "جاري تسجيل الخروج..." : "تسجيل الخروج"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

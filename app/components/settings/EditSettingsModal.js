"use client";
import React, { useRef, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

export default function EditSettingsModal({ isOpen, onClose }) {
  const modalRef = useRef(null);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div 
        ref={modalRef} 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden relative animate-in fade-in zoom-in duration-200"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-10 pt-16">
          <div className="text-center mb-10">
            <h2 className="text-xl font-bold text-gray-700">
              أضف معلومات عن فئة جديدة وقم بإنشاء الفئات الفرعية التابعة لها .
            </h2>
          </div>

          <div className="space-y-10">
            {/* SMTP HOST */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-xs font-bold text-[#0E3A53]">
                SMTP HOST
              </label>
              <input
                type="text"
                defaultValue="Mail.cdl.eilk.tepldck.site"
                className="w-full border border-gray-200 rounded-xl py-4 px-6 text-right focus:outline-none focus:border-primary transition-colors text-gray-600 font-medium"
                dir="ltr"
              />
            </div>

            {/* Port */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-xs font-bold text-[#0E3A53]">
                المنفذ
              </label>
              <input
                type="text"
                defaultValue="7493"
                className="w-full border border-gray-200 rounded-xl py-4 px-6 text-right focus:outline-none focus:border-primary transition-colors text-gray-600 font-medium"
                dir="ltr"
              />
            </div>

            {/* Username */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-xs font-bold text-[#0E3A53]">
                اسم المستخدم
              </label>
              <input
                type="text"
                defaultValue="Mail.cdl.eilk.tepldck.site"
                className="w-full border border-gray-200 rounded-xl py-4 px-6 text-right focus:outline-none focus:border-primary transition-colors text-gray-600 font-medium"
                dir="ltr"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-xs font-bold text-[#0E3A53]">
                كلمة السر
              </label>
              <input
                type="password"
                defaultValue="**********"
                className="w-full border border-gray-200 rounded-xl py-4 px-6 text-right focus:outline-none focus:border-primary transition-colors text-gray-600 font-medium tracking-widest"
                dir="ltr"
              />
            </div>

            {/* Encryption Dropdown */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-xs font-bold text-[#0E3A53]">
                التشفير
              </label>
              <div className="relative group">
                <select 
                  className="w-full border border-gray-200 rounded-xl py-4 px-6 text-right focus:outline-none focus:border-primary transition-colors text-gray-600 font-bold appearance-none bg-white cursor-pointer"
                  dir="rtl"
                >
                  <option value="SSL">SSL</option>
                  <option value="TLS">TLS</option>
                </select>
                <ChevronDown className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-12 mt-12">
            <button 
              onClick={onClose}
              className="text-[#0E3A53] font-bold text-lg underline decoration-2 underline-offset-8 hover:text-gray-700 transition-colors"
            >
              إلغاء
            </button>
            <button className="bg-[#0E3A53] hover:bg-[#062b40] text-white px-16 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-95">
              حفظ التغييرات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

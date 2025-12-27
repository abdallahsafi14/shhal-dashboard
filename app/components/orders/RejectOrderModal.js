"use client";
import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

export default function RejectOrderModal({ isOpen, onClose, onConfirm }) {
  const modalRef = useRef(null);
  const [reason, setReason] = useState("");

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
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div 
        ref={modalRef} 
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden relative animate-in fade-in zoom-in duration-200"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 pt-12">
          {/* Header */}
          <div className="text-right mb-8">
            <h2 className="text-xl font-bold text-gray-700">
              أضف سبب لرفض هذا الطلب ...
            </h2>
          </div>

          {/* Textarea with Label on Border */}
          <div className="relative mb-8">
            <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53]">
              سبب الرفض
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-4 text-right min-h-[150px] focus:outline-none focus:border-primary transition-colors resize-none"
              dir="rtl"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-start gap-4">
            <button 
              onClick={() => onConfirm(reason)}
              className="bg-[#0E3A53] hover:bg-[#062b40] text-white px-8 py-3 rounded-lg font-bold shadow-sm transition-all transform active:scale-95"
            >
              أضف السبب
            </button>
            <button 
              onClick={onClose}
              className="text-gray-500 font-bold underline decoration-2 underline-offset-4 hover:text-gray-700 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

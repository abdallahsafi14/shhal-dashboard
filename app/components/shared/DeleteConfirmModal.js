"use client";
import React, { useRef, useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, title, description, isDeleting }) {
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
        className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden relative animate-in fade-in zoom-in duration-200"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 pt-12 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {title || "هل أنت متأكد من الحذف؟"}
          </h3>
          {description && (
            <p className="text-gray-500 mb-6 text-sm">{description}</p>
          )}

          <div className="flex items-center justify-center gap-4 w-full px-4">
            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 bg-[#DC2626] hover:bg-red-700 disabled:opacity-50 text-white py-3 rounded-lg font-bold shadow-sm transition-colors"
            >
              {isDeleting ? "جاري الحذف..." : "تأكيد الحذف"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-bold transition-colors"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

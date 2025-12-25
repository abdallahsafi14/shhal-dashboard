"use client";
import React, { useRef, useEffect } from "react";
import { X, User } from "lucide-react";

export default function DeleteUserModal({ isOpen, onClose }) {
  const modalRef = useRef(null);

  // Close modal when clicking outside
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
      {/* Modal Container */}
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

        {/* Content */}
        <div className="p-8 pt-12 flex flex-col items-center text-center">
            
            {/* User Icon Circle */}
            <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-6">
                <User className="w-8 h-8 text-[#9CA3AF]" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800 mb-8">
                هل أنت متأكد من رغبتك في حذف اسم هذا العضو؟
            </h3>

             {/* Footer Buttons */}
             <div className="flex items-center justify-center gap-4 w-full px-4">
                {/* Confirm Delete Button */}
                <button className="flex-1 bg-[#DC2626] hover:bg-red-700 text-white py-3 rounded-lg font-bold shadow-sm transition-colors">
                    تأكيد
                </button>

                {/* Cancel Button */}
                <button 
                    onClick={onClose}
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

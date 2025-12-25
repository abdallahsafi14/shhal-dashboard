"use client";
import React, { useRef, useEffect } from "react";
import { X, Image as ImageIcon } from "lucide-react";

// Shared Input Component
const FloatingLabelInput = ({ label, placeholder, type = "text", defaultValue }) => {
    return (
      <div className="relative w-full">
        <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-gray-700">
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right text-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-300"
          dir="rtl"
          defaultValue={defaultValue}
        />
      </div>
    );
};

export default function AddAdModal({ isOpen, onClose }) {
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
        className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden relative animate-in fade-in zoom-in duration-200"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

         {/* Content */}
         <div className="p-10 pt-12">
            
            {/* Header */}
            <div className="text-center mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-gray-700">
                  أضف معلومات عن اعلان جديد وقيم بإنشاء معلومات الاعلان.
                </h2>
            </div>

            <div className="space-y-6">
                 {/* Ads Name */}
                <FloatingLabelInput 
                    label="اسم الاعلان" 
                    placeholder="اكتب اسم الاعلان هنا .." 
                />

                 {/* Ads Code */}
                <FloatingLabelInput 
                    label="كود الاعلان" 
                    placeholder="اكتب كود الاعلان هنا .." 
                />

                {/* Dimensions: Length & Width */}
                <div className="flex gap-4">
                    <FloatingLabelInput 
                        label="طول الاعلان" 
                        placeholder="اكتب طول الاعلان هنا .." 
                    />
                    <FloatingLabelInput 
                        label="عرض الاعلان" 
                        placeholder="اكتب عرض الاعلان هنا .." 
                    />
                </div>

                {/* Media Upload (Images) */}
                <div className="relative w-full">
                     <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-gray-700 z-10">
                        الوسائط
                    </label>
                    <div className="border border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                        <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 px-4 py-2 rounded-md mb-2 shadow-sm text-sm">
                            أضف اعلان
                        </button>
                        <p className="text-gray-400 text-sm">تمرير الصورة , السحب والافلات</p>
                    </div>
                </div>

                 {/* Footer Buttons */}
                <div className="flex items-center justify-start gap-6 pt-4">
                    {/* Add Button */}
                    <button className="flex items-center gap-2 bg-[#0E3A53] hover:bg-[#062b40] text-white px-8 py-3 rounded-lg font-bold shadow-sm transition-all">
                        <span>أضف اعلان</span>
                    </button>

                    {/* Cancel Button */}
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
    </div>
  );
}

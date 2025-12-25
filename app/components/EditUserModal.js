"use client";
import React, { useRef, useEffect } from "react";
import { X, User, ChevronDown, UserCheck } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Shared Reusable Input Component
const FloatingLabelInput = ({ label, placeholder, type = "text", value, defaultValue }) => {
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

export default function EditUserModal({ isOpen, onClose }) {
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
                أضف معلومات عن عضو جديد وقم بإنشاء حساب المستخدم.
                </h2>
                {/* Note: In the screenshot it says the SAME text as Add Modal? 
                    "أضف معلومات عن عضو جديد..." 
                    Wait, let me double check the screenshot.
                    Ah, the screenshot for Edit Modal says "أضف معلومات عن عضو جديد...". 
                    Wait, this is an EDIT modal. Usually it should say "Edit User".
                    However, following the user request "very similir to the add use modal" and following the screenshot provided.
                    The screenshot clearly shows the Edit modal (right side image) has the same title text.
                    Except the button says "تعديل مستخدم".
                    I will copy the screenshot text exactly.
                */}
            </div>

            <div className="space-y-6">
                 {/* Username */}
                <FloatingLabelInput 
                    label="اسم المستخدم" 
                    placeholder="اكتب اسم المستخدم هنا .." 
                    defaultValue="John Carter" // Mock data as per screenshot
                />

                 {/* Phone Number */}
                <div className="relative w-full">
                    <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-gray-700 z-10">
                        رقم الهاتف
                    </label>
                    <div dir="ltr" className="phone-input-container">
                        <PhoneInput
                            country={'sy'}
                            value="963943276876"
                            separateDialCode={true}
                            enableAreaCodes={true}
                            inputProps={{
                                name: 'phone',
                                required: true,
                                className: 'w-full border border-gray-300 rounded-lg px-4 py-3 pl-[20px] pr-[110px] text-right text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-[50px] !bg-white'
                            }}
                            containerClass="!w-full"
                            buttonClass="!bg-transparent !border-0 !border-l !border-gray-200 hover:!bg-gray-50"
                        />
                         {/* We can reuse the GLOBAL styles injected in AddUserModal if loaded, but safer to include them here or move to global CSS. 
                             For now, I will re-include the style tag to ensure it works independently.
                         */}
                          <style jsx global>{`
                            .phone-input-container { direction: ltr; }
                            .phone-input-container .react-tel-input .flag-dropdown {
                                left: auto !important; right: 1px !important; top: 1px !important; bottom: 1px !important;
                                border-right: none !important; border-left: 1px solid #e5e7eb !important;
                                border-radius: 0 0.5rem 0.5rem 0 !important; background-color: transparent !important;
                                width: 90px !important; display: flex; justify-content: center;
                            }
                            .phone-input-container .react-tel-input .form-control {
                                padding-right: 100px !important; padding-left: 14px !important;
                                text-align: right !important; margin: 0 !important; color: #111827 !important;
                            }
                            .phone-input-container .react-tel-input .selected-flag {
                                padding: 0 !important; width: 100% !important; display: flex; justify-content: center; align-items: center;
                            }
                            .phone-input-container .react-tel-input .selected-flag .arrow {
                                left: 10px !important; border-top-color: #6b7280 !important;
                            }
                        `}</style>
                    </div>
                </div>

                {/* Email */}
                <FloatingLabelInput 
                    label="البريد الإلكتروني" 
                    placeholder="اكتب البريد الإلكتروني هنا" 
                    type="email"
                    defaultValue="wedadjoulaq@gmail.com"
                />

                {/* Status - Custom Select */}
                <div className="relative w-full">
                     <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-gray-700">
                        حالة المستخدم
                    </label>
                    <div className="relative">
                        <select 
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right text-gray-700 appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                            dir="rtl"
                        >
                            <option>المستخدم نشط</option>
                            <option>المستخدم متوقف</option>
                        </select>
                        <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                 {/* Footer Buttons */}
                <div className="flex items-center justify-start gap-6 pt-4">
                    {/* Edit Button */}
                    <button className="flex items-center gap-2 bg-primary hover:bg-[#062b40] text-white px-8 py-3 rounded-lg font-bold shadow-sm transition-all">
                        <UserCheck className="w-5 h-5" />
                        <span>تعديل مستخدم</span>
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

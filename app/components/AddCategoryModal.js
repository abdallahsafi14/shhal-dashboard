"use client";
import React, { useState, useRef, useEffect } from "react";
import { X, Plus } from "lucide-react";

export default function AddCategoryModal({ isOpen, onClose }) {
  const [subCategories, setSubCategories] = useState([""]);
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

  const addSubCategoryField = () => {
    setSubCategories([...subCategories, ""]);
  };

  const handleSubCategoryChange = (index, value) => {
    const updated = [...subCategories];
    updated[index] = value;
    setSubCategories(updated);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div 
        ref={modalRef} 
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden relative animate-in fade-in zoom-in duration-200"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 pt-12">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-700">
              أضف معلومات عن فئة جديدة وقم بإنشاء الفئات الفرعية التابعة لها .
            </h2>
          </div>

          <div className="space-y-8">
            {/* Main Category Name */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53]">
                اسم الفئة
              </label>
              <input
                type="text"
                placeholder="اكتب اسم الفئة هنا .."
                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary transition-colors h-14"
                dir="rtl"
              />
            </div>

            {/* Category Image */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53]">
                صورة الفئة
              </label>
              <div className="w-full border border-gray-300 rounded-lg h-32 flex items-center justify-center text-gray-400">
                {/* Image upload placeholder */}
              </div>
            </div>

            {/* Sub Categories */}
            <div className="space-y-4 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {subCategories.map((sub, index) => (
                <div key={index} className="relative">
                  <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53]">
                    الفئة الفرعية
                  </label>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={addSubCategoryField}
                      className="bg-[#0E3A53] text-white p-2 rounded-lg hover:bg-[#062b40] transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                    <input
                      type="text"
                      value={sub}
                      onChange={(e) => handleSubCategoryChange(index, e.target.value)}
                      placeholder="اكتب اسم الفئة الفرعية هنا .."
                      className="flex-1 border border-gray-300 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary transition-colors h-14"
                      dir="rtl"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 mt-10">
            <button 
              onClick={onClose}
              className="text-[#0E3A53] font-bold underline decoration-2 underline-offset-4 hover:text-gray-700 transition-colors"
            >
              إلغاء
            </button>
            <button className="bg-[#0E3A53] hover:bg-[#062b40] text-white px-12 py-3 rounded-lg font-bold shadow-sm transition-all transform active:scale-95">
              اضافة فئة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

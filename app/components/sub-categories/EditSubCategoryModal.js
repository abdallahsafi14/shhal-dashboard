"use client";
import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useSubCategoryActions } from "@/hooks/useDashboard";
import { useCategories } from "@/hooks/useDashboard";

export default function EditSubCategoryModal({ isOpen, onClose, subCategory }) {
  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
  });
  const modalRef = useRef(null);
  const { data: categoriesData } = useCategories();
  const { updateSubCategory, isUpdating } = useSubCategoryActions();

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

  // Set form data when subCategory changes
  useEffect(() => {
    if (subCategory && isOpen) {
      setFormData({
        category_id: subCategory.category_id?.toString() || "",
        name: subCategory.name || "",
      });
    }
  }, [subCategory, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category_id) {
      alert("يرجى اختيار الفئة الرئيسية");
      return;
    }

    if (!formData.name.trim()) {
      alert("يرجى إدخال اسم الفئة الفرعية");
      return;
    }

    try {
      await updateSubCategory({
        id: subCategory.id,
        data: {
          category_id: parseInt(formData.category_id),
          name: formData.name.trim(),
        },
      });
      onClose();
    } catch (error) {
      console.error("Error updating sub-category:", error);
      alert("حدث خطأ في تحديث الفئة الفرعية. يرجى المحاولة مرة أخرى.");
    }
  };

  if (!isOpen || !subCategory) return null;

  const categories = categoriesData?.data || [];

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
              تعديل الفئة الفرعية
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Category Selection */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53]">
                الفئة الرئيسية *
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary transition-colors h-14"
                dir="rtl"
                required
              >
                <option value="">اختر الفئة الرئيسية</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub-Category Name */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53]">
                اسم الفئة الفرعية *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="اكتب اسم الفئة الفرعية هنا .."
                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary transition-colors h-14"
                dir="rtl"
                required
              />
            </div>

            <div className="flex items-center justify-center gap-8 mt-10">
              <button
                type="button"
                onClick={onClose}
                className="text-[#0E3A53] font-bold underline decoration-2 underline-offset-4 hover:text-gray-700 transition-colors"
                disabled={isUpdating}
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="bg-[#0E3A53] hover:bg-[#062b40] disabled:opacity-50 disabled:cursor-not-allowed text-white px-12 py-3 rounded-lg font-bold shadow-sm transition-all transform active:scale-95"
              >
                {isUpdating ? "جاري التحديث..." : "تحديث الفئة الفرعية"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

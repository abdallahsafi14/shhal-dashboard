"use client";
import React, { useState, useRef, useEffect } from "react";
import { X, Plus, Upload, Image as ImageIcon } from "lucide-react";
import { useCategoryActions } from "@/hooks/useDashboard";

export default function AddCategoryModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    status: "active",
    image: null,
  });
  const [subCategories, setSubCategories] = useState([""]);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);

  const { createCategory, isCreating } = useCategoryActions();

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

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        status: "active",
        image: null,
      });
      setSubCategories([""]);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("يرجى اختيار ملف صورة صحيح");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("حجم الصورة يجب أن يكون أقل من 5 ميجابايت");
        return;
      }

      // Store file in state
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Generate preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("يرجى إدخال اسم الفئة");
      return;
    }

    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("status", formData.status); // Send as string "active"/"inactive"

    // --- FIX FOR IMAGE ---
    // Get image directly from file input ref
    if (
      fileInputRef.current &&
      fileInputRef.current.files &&
      fileInputRef.current.files[0]
    ) {
      const imageFile = fileInputRef.current.files[0];
      submitData.append("image_file", imageFile); // Try image_file instead of image
    }

    // Try sending as JSON instead of FormData
    const jsonData = {
      name: formData.name,
      status: formData.status,
    };

    // Add subcategories
    const validSubCategories = subCategories.filter((sub) => sub.trim() !== "");
    if (validSubCategories.length > 0) {
      jsonData.sub_categories = validSubCategories.map((name) => ({ name }));
    }

    // For now, skip image upload since API response shows image: null
    // TODO: Handle image upload separately if needed

    console.log("Sending JSON data:", jsonData);

    try {
      await createCategory(jsonData);
      onClose();
    } catch (error) {
      console.error("Error creating category:", error);
      alert("حدث خطأ في إضافة الفئة. يرجى المحاولة مرة أخرى.");
    }
  };

  const addSubCategoryField = () => {
    setSubCategories([...subCategories, ""]);
  };

  const handleSubCategoryChange = (index, value) => {
    const updated = [...subCategories];
    updated[index] = value;
    setSubCategories(updated);
  };

  const removeSubCategory = (index) => {
    if (subCategories.length > 1) {
      setSubCategories(subCategories.filter((_, i) => i !== index));
    }
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

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Main Category Name */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53]">
                اسم الفئة *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="اكتب اسم الفئة هنا .."
                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary transition-colors h-14"
                dir="rtl"
                required
              />
            </div>

            {/* Category Image */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53]">
                صورة الفئة
              </label>
              <div
                className="w-full border border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-primary transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">انقر لرفع الصورة</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Status */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53]">
                حالة الفئة
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary transition-colors h-14"
                dir="rtl"
              >
                <option value="active">مفعلة</option>
                <option value="inactive">غير مفعلة</option>
              </select>
            </div>

            {/* Sub Categories */}
            <div className="space-y-4">
              <label className="block text-sm font-bold text-[#0E3A53] text-right">
                الفئات الفرعية (اختياري)
              </label>
              <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                {subCategories.map((sub, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => removeSubCategory(index)}
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                      disabled={subCategories.length === 1}
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <input
                      type="text"
                      value={sub}
                      onChange={(e) =>
                        handleSubCategoryChange(index, e.target.value)
                      }
                      placeholder="اكتب اسم الفئة الفرعية هنا .."
                      className="flex-1 border border-gray-300 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary transition-colors h-14"
                      dir="rtl"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSubCategoryField}
                  className="w-full bg-gray-100 text-gray-600 p-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" /> إضافة فئة فرعية أخرى
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 mt-10">
              <button
                type="button"
                onClick={onClose}
                className="text-[#0E3A53] font-bold underline decoration-2 underline-offset-4 hover:text-gray-700 transition-colors"
                disabled={isCreating}
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={isCreating}
                className="bg-[#0E3A53] hover:bg-[#062b40] disabled:opacity-50 disabled:cursor-not-allowed text-white px-12 py-3 rounded-lg font-bold shadow-sm transition-all transform active:scale-95"
              >
                {isCreating ? "جاري الإضافة..." : "إضافة فئة"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState, useRef, useEffect } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { useCategoryActions } from "@/hooks/useDashboard";
import { toast } from "sonner";

export default function EditCategoryModal({ isOpen, onClose, category }) {
  const [formData, setFormData] = useState({
    name: "",
    status: "active",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);

  const { updateCategory, isUpdating } = useCategoryActions();

  // Map display status to API value (active | suspended)
  const getApiStatus = (displayStatus) => {
    if (displayStatus === "active" || displayStatus === "suspended") return displayStatus;
    return displayStatus === "فئة مفعلة" ? "active" : "suspended";
  };

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

  useEffect(() => {
    if (isOpen && category) {
      setFormData({
        name: category.mainName || category.name || "",
        status: getApiStatus(category.status),
      });
      setImageFile(null);
      setImagePreview(category.image || null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [isOpen, category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("يرجى اختيار ملف صورة صحيح");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("حجم الصورة يجب أن يكون أقل من 5 ميجابايت");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category?.id) return;
    if (!formData.name.trim()) {
      toast.error("يرجى إدخال اسم الفئة");
      return;
    }

    const payload = new FormData();
    payload.append("name", formData.name.trim());
    payload.append("status", formData.status);
    if (imageFile) {
      payload.append("image", imageFile);
    }

    updateCategory(
      { id: category.id, data: payload },
      { onSuccess: () => onClose() }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-lg max-h-[90vh] rounded-2xl shadow-xl overflow-hidden relative animate-in fade-in zoom-in duration-200 flex flex-col"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 pt-12 overflow-y-auto flex-1 min-h-0">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-700">تعديل الفئة</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53] z-10">
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

            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53] z-10">
                صورة الفئة
              </label>
              <div
                className="w-full border border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-primary transition-colors overflow-hidden"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-contain bg-gray-50"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-4">
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

            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53] z-10">
                الحالة *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary transition-colors h-14 appearance-none bg-white"
                dir="rtl"
                required
              >
                <option value="active">نشط</option>
                <option value="suspended">متوقف</option>
              </select>
            </div>

            <div className="flex items-center justify-center gap-8 pt-4">
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
                {isUpdating ? "جاري الحفظ..." : "تعديل فئة"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

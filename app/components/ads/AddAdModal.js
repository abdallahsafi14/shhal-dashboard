"use client";
import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useAdActions } from "@/hooks/useDashboard";

export default function AddAdModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);
  const { createAd, isCreating } = useAdActions();
  
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    width: "",
    height: "",
    status: "active",
    media: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        code: "",
        width: "",
        height: "",
        status: "active",
        media: null,
      });
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [isOpen]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("يرجى اختيار ملف صورة صحيح");
        return;
      }
      setFormData((prev) => ({ ...prev, media: file }));
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("يرجى إدخال اسم الإعلان");
      return;
    }
    if (!formData.code.trim()) {
      alert("يرجى إدخال كود الإعلان");
      return;
    }
    if (!formData.width.trim()) {
      alert("يرجى إدخال عرض الإعلان");
      return;
    }
    if (!formData.height.trim()) {
      alert("يرجى إدخال ارتفاع الإعلان");
      return;
    }
    if (!formData.media) {
      alert("يرجى إضافة صورة للإعلان");
      return;
    }

    const submitData = new FormData();
    submitData.append("name", formData.name.trim());
    submitData.append("code", formData.code.trim());
    submitData.append("width", formData.width.trim());
    submitData.append("height", formData.height.trim());
    submitData.append("status", formData.status);
    submitData.append("media", formData.media);

    try {
      await createAd(submitData);
      onClose();
    } catch (error) {
      console.error("Error creating ad:", error);
      alert("حدث خطأ في إضافة الإعلان. يرجى المحاولة مرة أخرى.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-10 pt-12">
          <div className="text-center mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-gray-700">
              أضف معلومات عن اعلان جديد وقم بإنشاء معلومات الاعلان
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ad Name */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53]">
                اسم الاعلان *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="اكتب اسم الاعلان هنا .."
                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary transition-colors h-14"
                dir="rtl"
                required
              />
            </div>

            {/* Ad Code */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53]">
                كود الاعلان *
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="اكتب كود الاعلان هنا .."
                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary transition-colors h-14"
                dir="rtl"
                required
              />
            </div>

            {/* width */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53]">
                عرض الاعلان *
              </label>
              <input
                type="text"
                name="width"
                value={formData.width }
                onChange={handleInputChange}
                placeholder="مثال: 728 "
                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary transition-colors h-14"
                dir="ltr"
                required
              />
            </div>
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53]">
                ارتفاع الاعلان *
              </label>
              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                placeholder="مثال: 90"
                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary transition-colors h-14"
                dir="ltr"
                required
              />
            </div>

            {/* Status */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53] z-10">
                الحالة *
              </label>
              <div className="relative">
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
                <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Media Upload */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53] z-10">
                الوسائط *
              </label>
              <div className="border border-gray-300 rounded-lg p-6">
                {imagePreview ? (
                  <div className="space-y-4">
                    <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden relative border border-gray-200">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData((prev) => ({ ...prev, media: null }));
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      className="w-full bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-100 transition-colors"
                    >
                      إزالة الصورة
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 px-4 py-2 rounded-md mb-2 shadow-sm text-sm"
                    >
                      أضف اعلان
                    </button>
                    <p className="text-gray-400 text-sm">تمرير الصورة , السحب والافلات</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required={!imagePreview}
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-start gap-6 pt-4">
              <button
                type="submit"
                disabled={isCreating}
                className="flex items-center gap-2 bg-[#0E3A53] hover:bg-[#062b40] disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold shadow-sm transition-all"
              >
                <span>{isCreating ? "جاري الإضافة..." : "أضف اعلان"}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-500 font-bold underline decoration-2 underline-offset-4 hover:text-gray-700 transition-colors"
                disabled={isCreating}
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

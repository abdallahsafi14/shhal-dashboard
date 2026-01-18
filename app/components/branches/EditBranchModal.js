"use client";
import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useBranchActions } from "@/hooks/useDashboard";
import { useStores } from "@/hooks/useDashboard";

export default function EditBranchModal({ isOpen, onClose, branch }) {
  const [formData, setFormData] = useState({
    store_id: "",
    name: "",
    longitude: "",
    latitude: "",
  });
  const modalRef = useRef(null);
  const { data: storesData } = useStores();
  const { updateBranch, isUpdating } = useBranchActions();

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

  // Set form data when branch changes
  useEffect(() => {
    if (branch && isOpen) {
      setFormData({
        store_id: branch.store_id?.toString() || "",
        name: branch.name || "",
        longitude: branch.longitude || "",
        latitude: branch.latitude || "",
      });
    }
  }, [branch, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.store_id) {
      alert("يرجى اختيار المتجر");
      return;
    }

    if (!formData.name.trim()) {
      alert("يرجى إدخال اسم الفرع");
      return;
    }

    if (!formData.longitude.trim()) {
      alert("يرجى إدخال خط الطول");
      return;
    }

    if (!formData.latitude.trim()) {
      alert("يرجى إدخال خط العرض");
      return;
    }

    try {
      await updateBranch({
        id: branch.id,
        data: {
          store_id: parseInt(formData.store_id),
          name: formData.name.trim(),
          longitude: formData.longitude.trim(),
          latitude: formData.latitude.trim(),
        },
      });
      onClose();
    } catch (error) {
      console.error("Error updating branch:", error);
      alert("حدث خطأ في تحديث الفرع. يرجى المحاولة مرة أخرى.");
    }
  };

  if (!isOpen || !branch) return null;

  const stores = storesData?.data || [];

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
              تعديل الفرع
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Store Selection */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53]">
                المتجر *
              </label>
              <select
                name="store_id"
                value={formData.store_id}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary transition-colors h-14"
                dir="rtl"
                required
              >
                <option value="">اختر المتجر</option>
                {stores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Branch Name */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53]">
                اسم الفرع *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="اكتب اسم الفرع هنا .."
                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary transition-colors h-14"
                dir="rtl"
                required
              />
            </div>

            {/* Longitude */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53]">
                خط الطول *
              </label>
              <input
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleInputChange}
                placeholder="مثال: 36.2028000"
                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary transition-colors h-14"
                dir="ltr"
                required
              />
            </div>

            {/* Latitude */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53]">
                خط العرض *
              </label>
              <input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleInputChange}
                placeholder="مثال: 33.5138000"
                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary transition-colors h-14"
                dir="ltr"
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
                {isUpdating ? "جاري التحديث..." : "تحديث الفرع"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

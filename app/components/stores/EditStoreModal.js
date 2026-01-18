"use client";
import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useStoreActions } from "@/hooks/useDashboard";

export default function EditStoreModal({ isOpen, onClose, store }) {
  const [formData, setFormData] = useState({
    name: "",
  });
  const modalRef = useRef(null);
  const { updateStore, isUpdating } = useStoreActions();

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

  // Set form data when store changes
  useEffect(() => {
    if (store && isOpen) {
      setFormData({
        name: store.name || "",
      });
    }
  }, [store, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("يرجى إدخال اسم المتجر");
      return;
    }

    try {
      await updateStore({
        id: store.id,
        data: {
          name: formData.name.trim(),
        },
      });
      onClose();
    } catch (error) {
      console.error("Error updating store:", error);
      alert("حدث خطأ في تحديث المتجر. يرجى المحاولة مرة أخرى.");
    }
  };

  if (!isOpen || !store) return null;

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
              تعديل المتجر
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Store Name */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53]">
                اسم المتجر *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="اكتب اسم المتجر هنا .."
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
                {isUpdating ? "جاري التحديث..." : "تحديث المتجر"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

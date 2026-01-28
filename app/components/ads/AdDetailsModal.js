"use client";
import React, { useRef, useEffect } from "react";
import { X, Edit2 } from "lucide-react";
import Image from "next/image";
import { useAdDetails } from "@/hooks/useDashboard";

export default function AdDetailsModal({ isOpen, onClose, adId, onEdit }) {
  const modalRef = useRef(null);
  const validAdId = adId && adId !== "---" ? adId : null;
  const { data: adResponse, isLoading } = useAdDetails(validAdId);
  const ad = adResponse?.data;

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
      <div
        ref={modalRef}
        className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 pt-12">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B8A6C]"></div>
              <span className="mr-2 text-gray-500">جاري التحميل...</span>
            </div>
          ) : !ad ? (
            <div className="flex items-center justify-center min-h-[200px] text-gray-500">
              الإعلان غير موجود
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800">تفاصيل الإعلان</h2>
                <button
                  onClick={onEdit}
                  className="flex items-center gap-2 bg-[#0E3A53] hover:bg-[#062b40] text-white px-6 py-2 rounded-lg font-bold transition-all"
                >
                  <Edit2 className="w-5 h-5" />
                  تعديل
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Ad Image */}
                {ad.media_url && (
                  <div className="w-full h-64 bg-gray-100 rounded-xl overflow-hidden relative border border-gray-200">
                    <Image
                      src={ad?.media_url}
                      alt={ad.name || "Ad"}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-bold text-gray-500 mb-2 block">اسم الإعلان</label>
                    <p className="text-gray-800 font-medium">{ad.name || "---"}</p>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-500 mb-2 block">كود الإعلان</label>
                    <p className="text-gray-800 font-medium">{ad.code || "---"}</p>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-500 mb-2 block">الأبعاد</label>
                    <p className="text-gray-800 font-medium dir-ltr text-right">{ad.dimensions || "---"}</p>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-500 mb-2 block">الحالة</label>
                    <span
                      className={`px-4 py-1.5 rounded-md text-xs font-bold ${
                        ad.status === "active"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {ad.status === "active" ? "نشط" : "متوقف"}
                    </span>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-500 mb-2 block">تاريخ الإنشاء</label>
                    <p className="text-gray-800 font-medium dir-ltr text-right">
                      {ad.created_at
                        ? new Date(ad.created_at).toLocaleDateString("en-GB")
                        : "---"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-500 mb-2 block">تاريخ التحديث</label>
                    <p className="text-gray-800 font-medium dir-ltr text-right">
                      {ad.updated_at
                        ? new Date(ad.updated_at).toLocaleDateString("en-GB")
                        : "---"}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

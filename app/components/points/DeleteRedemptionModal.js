"use client";
import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { usePointsRedemptionActions } from "@/hooks/useDashboard";

export default function DeleteRedemptionModal({
  isOpen,
  onClose,
  redemptionId,
  onSuccess,
}) {
  const modalRef = useRef(null);
  const { deleteRedemption, isDeleting } = usePointsRedemptionActions();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const handleConfirm = () => {
    if (!redemptionId) return;
    deleteRedemption(redemptionId, {
      onSuccess: () => {
        onClose();
        onSuccess?.();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden relative animate-in fade-in zoom-in duration-200"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 pt-12">
          <h2 className="text-xl font-bold text-gray-800 text-right mb-2">
            حذف العملية
          </h2>
          <p className="text-gray-600 text-right mb-6">
            هل أنت متأكد من حذف هذه العملية؟ لا يمكن التراجع عن هذا الإجراء.
          </p>

          <div className="flex items-center justify-start gap-4">
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50"
            >
              {isDeleting ? "جاري الحذف..." : "حذف"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="text-gray-500 font-bold underline decoration-2 underline-offset-4 hover:text-gray-700"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

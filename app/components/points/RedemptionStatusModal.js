"use client";
import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { usePointsRedemptionActions } from "@/hooks/useDashboard";

export default function RedemptionStatusModal({
  isOpen,
  onClose,
  redemptionId,
  action,
  onSuccess,
}) {
  const modalRef = useRef(null);
  const [notes, setNotes] = useState("");
  const { updateStatus, isUpdatingStatus } = usePointsRedemptionActions();

  useEffect(() => {
    if (isOpen) setNotes("");
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!redemptionId) return;
    const status = action === "approve" ? "approved" : "rejected";
    updateStatus(
      { redemptionId, status, notes: notes.trim() || undefined },
      {
        onSuccess: () => {
          onClose();
          onSuccess?.();
        },
      }
    );
  };

  if (!isOpen) return null;

  const isReject = action === "reject";
  const title = isReject ? "رفض العملية" : "قبول العملية";
  const submitLabel = isReject ? "رفض" : "قبول";
  const submitStyle = isReject
    ? "bg-red-600 hover:bg-red-700 text-white"
    : "bg-[#0E3A53] hover:bg-[#062b40] text-white";

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
          <h2 className="text-xl font-bold text-gray-800 text-right mb-6">
            {title}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53]">
                ملاحظات {isReject && "(اختياري)"}
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="أضف ملاحظات إن وجدت..."
                className="w-full border border-gray-300 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary transition-colors min-h-[100px] resize-y"
                dir="rtl"
                rows={3}
              />
            </div>

            <div className="flex items-center justify-start gap-4 pt-2">
              <button
                type="submit"
                disabled={isUpdatingStatus}
                className={`px-6 py-3 rounded-lg font-bold transition-colors disabled:opacity-50 ${submitStyle}`}
              >
                {isUpdatingStatus ? "جاري التنفيذ..." : submitLabel}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-500 font-bold underline decoration-2 underline-offset-4 hover:text-gray-700"
                disabled={isUpdatingStatus}
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

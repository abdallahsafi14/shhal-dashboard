"use client";
import React, { useRef, useEffect } from "react";
import { X, Edit2, User, Mail, Phone, Calendar, Shield, Coins, Clock } from "lucide-react";
import { useUserById } from "@/hooks/useDashboard";
import Image from "next/image";

export default function UserDetailsModal({ isOpen, onClose, userId, onEditClick }) {
  const modalRef = useRef(null);
  const { data: userData, isLoading } = useUserById(userId);

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

  const handleEdit = () => {
    onClose();
    onEditClick();
  };

  if (!isOpen || !userId) return null;

  const user = userData?.data;

  const formatDate = (dateString) => {
    if (!dateString) return "---";
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "---";
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    if (status === "active") {
      return (
        <span className="px-4 py-1.5 rounded-md text-xs font-bold bg-[#D1FAE5] text-[#059669] border border-[#D1FAE5]">
          نشط
        </span>
      );
    }
    return (
      <span className="px-4 py-1.5 rounded-md text-xs font-bold bg-[#E0F2FE] text-[#0369A1] border border-[#E0F2FE]">
        متوقف
      </span>
    );
  };

  const getRoleBadge = (role) => {
    if (role === "admin") {
      return (
        <span className="px-4 py-1.5 rounded-md text-xs font-bold bg-[#EBDFFB] text-[#8659C9] border border-[#EBDFFB]">
          مدير
        </span>
      );
    }
    return (
      <span className="px-4 py-1.5 rounded-md text-xs font-bold bg-[#FEF3C7] text-[#D97706] border border-[#FEF3C7]">
        مستخدم
      </span>
    );
  };

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

        <div className="p-8 pt-12">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B8A6C]"></div>
            </div>
          ) : !user ? (
            <div className="text-center py-12">
              <p className="text-gray-500">المستخدم غير موجود</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
                  تفاصيل المستخدم
                </h2>
              </div>

              {/* User Info */}
              <div className="space-y-6">
                {/* Profile Section */}
                <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                  <div className="relative w-20 h-20 rounded-full bg-gray-100 overflow-hidden border-2 border-gray-200">
                    <Image
                      src="/icons/Logo.png"
                      alt="User"
                      fill
                      className="object-cover p-2"
                      suppressHydrationWarning
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {user.first_name} {user.last_name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(user.status)}
                      {getRoleBadge(user.role)}
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="relative">
                    <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53] flex items-center gap-2">
                      <User className="w-4 h-4" />
                      الاسم الأول
                    </label>
                    <div className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right bg-gray-50 h-14 flex items-center">
                      <span className="text-gray-700 font-medium">
                        {user.first_name || "---"}
                      </span>
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="relative">
                    <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53] flex items-center gap-2">
                      <User className="w-4 h-4" />
                      اسم العائلة
                    </label>
                    <div className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right bg-gray-50 h-14 flex items-center">
                      <span className="text-gray-700 font-medium">
                        {user.last_name || "---"}
                      </span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53] flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      البريد الإلكتروني
                    </label>
                    <div className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right bg-gray-50 h-14 flex items-center">
                      <span className="text-gray-700 font-medium dir-ltr">
                        {user.email || "---"}
                      </span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53] flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      رقم الهاتف
                    </label>
                    <div className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right bg-gray-50 h-14 flex items-center">
                      <span className="text-gray-700 font-medium dir-ltr">
                        {user.phone || "---"}
                      </span>
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="relative">
                    <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53] flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      تاريخ الميلاد
                    </label>
                    <div className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right bg-gray-50 h-14 flex items-center">
                      <span className="text-gray-700 font-medium">
                        {formatDate(user.date_of_birth)}
                      </span>
                    </div>
                  </div>

                  {/* Points */}
                  <div className="relative">
                    <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53] flex items-center gap-2">
                      <Coins className="w-4 h-4" />
                      النقاط
                    </label>
                    <div className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right bg-gray-50 h-14 flex items-center">
                      <span className="text-gray-700 font-medium">
                        {user.points || 0} نقطة
                      </span>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="relative">
                    <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53] flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      الدور
                    </label>
                    <div className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right bg-gray-50 h-14 flex items-center">
                      {getRoleBadge(user.role)}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="relative">
                    <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53] flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      الحالة
                    </label>
                    <div className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right bg-gray-50 h-14 flex items-center">
                      {getStatusBadge(user.status)}
                    </div>
                  </div>

                  {/* Last Login */}
                  <div className="relative md:col-span-2">
                    <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53] flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      آخر تسجيل دخول
                    </label>
                    <div className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right bg-gray-50 h-14 flex items-center">
                      <span className="text-gray-700 font-medium">
                        {formatDateTime(user.last_login)}
                      </span>
                    </div>
                  </div>

                  {/* Created At */}
                  <div className="relative md:col-span-2">
                    <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53] flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      تاريخ الإنشاء
                    </label>
                    <div className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right bg-gray-50 h-14 flex items-center">
                      <span className="text-gray-700 font-medium">
                        {formatDateTime(user.created_at)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex items-center justify-center gap-4 pt-6 border-t border-gray-100">
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 bg-[#0E3A53] hover:bg-[#062b40] text-white px-8 py-3 rounded-lg font-bold shadow-sm transition-all transform active:scale-95"
                  >
                    <Edit2 className="w-5 h-5" />
                    تعديل المستخدم
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

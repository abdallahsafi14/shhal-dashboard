"use client";
import React, { useState } from "react";
import { useAdminProfile, useAdminProfileActions } from "@/hooks/useDashboard";
import { User, Mail, Shield, Calendar, Edit2, Save, X } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: profileData, isLoading } = useAdminProfile();
  const { updateProfile, isUpdating } = useAdminProfileActions();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const profile = profileData?.data;

  React.useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || "",
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("حدث خطأ في تحديث الملف الشخصي. يرجى المحاولة مرة أخرى.");
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || "",
      });
    }
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
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
        غير نشط
      </span>
    );
  };

  const getRoleBadge = (role) => {
    return (
      <span className="px-4 py-1.5 rounded-md text-xs font-bold bg-[#EBDFFB] text-[#8659C9] border border-[#EBDFFB]">
        {role === "admin" ? "مدير" : role}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B8A6C]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div className="text-right">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            الملف الشخصي
          </h2>
          <p className="text-gray-500 text-sm max-w-md ml-auto">
            عرض وتعديل معلومات ملفك الشخصي
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-[#0E3A53] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#062b40] transition-all shadow-lg active:scale-95 flex items-center gap-2"
          >
            <Edit2 className="w-5 h-5" />
            تعديل الملف الشخصي
          </button>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative w-32 h-32 rounded-full bg-gray-100 overflow-hidden border-4 border-gray-200 mb-4">
              <Image
                src="/icons/Logo.png"
                alt="Profile"
                fill
                className="object-cover p-2"
                suppressHydrationWarning
              />
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {profile?.first_name} {profile?.last_name}
              </h3>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                {getStatusBadge(profile?.status)}
                {getRoleBadge(profile?.role)}
              </div>
            </div>
          </div>

          {/* Profile Information Section */}
          <div className="flex-1 space-y-6">
            {/* First Name */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53] flex items-center gap-2">
                <User className="w-4 h-4" />
                الاسم الأول
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary transition-colors h-14"
                  dir="rtl"
                />
              ) : (
                <div className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right bg-gray-50 h-14 flex items-center">
                  <span className="text-gray-700 font-medium">
                    {profile?.first_name || "---"}
                  </span>
                </div>
              )}
            </div>

            {/* Last Name */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53] flex items-center gap-2">
                <User className="w-4 h-4" />
                اسم العائلة
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary transition-colors h-14"
                  dir="rtl"
                />
              ) : (
                <div className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right bg-gray-50 h-14 flex items-center">
                  <span className="text-gray-700 font-medium">
                    {profile?.last_name || "---"}
                  </span>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53] flex items-center gap-2">
                <Mail className="w-4 h-4" />
                البريد الإلكتروني
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary transition-colors h-14"
                  dir="ltr"
                />
              ) : (
                <div className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right bg-gray-50 h-14 flex items-center">
                  <span className="text-gray-700 font-medium">
                    {profile?.email || "---"}
                  </span>
                </div>
              )}
            </div>

            {/* Role (Read-only) */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53] flex items-center gap-2">
                <Shield className="w-4 h-4" />
                الدور
              </label>
              <div className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right bg-gray-50 h-14 flex items-center">
                <span className="text-gray-700 font-medium">
                  {getRoleBadge(profile?.role)}
                </span>
              </div>
            </div>

            {/* Last Login */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53] flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                آخر تسجيل دخول
              </label>
              <div className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right bg-gray-50 h-14 flex items-center">
                <span className="text-gray-700 font-medium">
                  {formatDate(profile?.last_login)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex items-center justify-center gap-4 pt-4">
                <button
                  onClick={handleCancel}
                  className="text-[#0E3A53] font-bold px-8 py-3 rounded-lg border-2 border-[#0E3A53] hover:bg-[#0E3A53] hover:text-white transition-all flex items-center gap-2"
                  disabled={isUpdating}
                >
                  <X className="w-5 h-5" />
                  إلغاء
                </button>
                <button
                  onClick={handleSave}
                  disabled={isUpdating}
                  className="bg-[#0E3A53] hover:bg-[#062b40] disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold shadow-sm transition-all transform active:scale-95 flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {isUpdating ? "جاري الحفظ..." : "حفظ التغييرات"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

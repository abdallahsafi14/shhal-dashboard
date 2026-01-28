"use client";
import React, { useState, useRef, useEffect } from "react";
import { X, UserCheck, ChevronDown } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useUserActions } from "@/hooks/useDashboard";

// Shared Reusable Input Component
const FloatingLabelInput = ({ 
  label, 
  placeholder, 
  type = "text", 
  value, 
  onChange,
  name,
  required = false,
  dir = "rtl"
}) => {
  return (
    <div className="relative w-full">
      <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-gray-700">
        {label} {required && "*"}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right text-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-300"
        dir={dir}
        required={required}
      />
    </div>
  );
};

export default function EditUserModal({ isOpen, onClose, user }) {
  const modalRef = useRef(null);
  const { updateUser, isUpdating } = useUserActions();
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    password: "",
    status: "active",
    role: "user",
    points: 0,
  });

  // Set form data when user changes
  useEffect(() => {
    if (user && isOpen) {
      // Format date_of_birth for input (YYYY-MM-DD)
      let formattedDate = "";
      if (user.date_of_birth) {
        const date = new Date(user.date_of_birth);
        formattedDate = date.toISOString().split("T")[0];
      }

      // Convert Arabic status to English for API
      let statusValue = user.status || "active";
      if (statusValue === "نشط") {
        statusValue = "active";
      } else if (statusValue === "متوقف") {
        statusValue = "suspended";
      }

      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        date_of_birth: formattedDate,
        password: "", // Don't pre-fill password
        status: statusValue,
        role: user.role || "user",
        points: user.points || 0,
      });
    }
  }, [user, isOpen]);

  // Close modal when clicking outside
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (phone) => {
    setFormData((prev) => ({
      ...prev,
      phone: phone,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.first_name.trim()) {
      alert("يرجى إدخال الاسم الأول");
      return;
    }

    if (!formData.last_name.trim()) {
      alert("يرجى إدخال اسم العائلة");
      return;
    }

    if (!formData.email.trim()) {
      alert("يرجى إدخال البريد الإلكتروني");
      return;
    }

    // Prepare update data (only include password if provided)
    const updateData = {
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      email: formData.email.trim(),
      phone: formData.phone || null,
      date_of_birth: formData.date_of_birth || null,
      status: formData.status,
      role: formData.role,
      points: parseInt(formData.points) || 0,
    };

    // Only include password if it's been changed
    if (formData.password.trim()) {
      updateData.password = formData.password.trim();
    }

    try {
      await updateUser({
        id: user.id,
        data: updateData,
      });
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("حدث خطأ في تحديث المستخدم. يرجى المحاولة مرة أخرى.");
    }
  };

  if (!isOpen || !user) return null;

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
              تعديل معلومات المستخدم
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name */}
            <FloatingLabelInput
              label="الاسم الأول"
              placeholder="اكتب الاسم الأول هنا .."
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              required
            />

            {/* Last Name */}
            <FloatingLabelInput
              label="اسم العائلة"
              placeholder="اكتب اسم العائلة هنا .."
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              required
            />

            {/* Email */}
            <FloatingLabelInput
              label="البريد الإلكتروني"
              placeholder="اكتب البريد الإلكتروني هنا"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            {/* Phone Number */}
            <div className="relative w-full">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-gray-700 z-10">
                رقم الهاتف
              </label>
              <div dir="ltr" className="phone-input-container">
                <PhoneInput
                  country={"sy"}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  separateDialCode={true}
                  enableAreaCodes={true}
                  inputProps={{
                    name: "phone",
                    className:
                      "w-full border border-gray-300 rounded-lg px-4 py-3 pl-[20px] pr-[110px] text-right text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-[50px] !bg-white",
                  }}
                  containerClass="!w-full"
                  buttonClass="!bg-transparent !border-0 !border-l !border-gray-200 hover:!bg-gray-50"
                />
                <style jsx global>{`
                  .phone-input-container {
                    direction: ltr;
                  }
                  .phone-input-container .react-tel-input .flag-dropdown {
                    left: auto !important;
                    right: 1px !important;
                    top: 1px !important;
                    bottom: 1px !important;
                    border-right: none !important;
                    border-left: 1px solid #e5e7eb !important;
                    border-radius: 0 0.5rem 0.5rem 0 !important;
                    background-color: transparent !important;
                    width: 90px !important;
                    display: flex;
                    justify-content: center;
                  }
                  .phone-input-container .react-tel-input .form-control {
                    padding-right: 100px !important;
                    padding-left: 14px !important;
                    text-align: right !important;
                    margin: 0 !important;
                    color: #111827 !important;
                  }
                  .phone-input-container .react-tel-input .selected-flag {
                    padding: 0 !important;
                    width: 100% !important;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  .phone-input-container .react-tel-input .selected-flag .arrow {
                    left: 10px !important;
                    border-top-color: #6b7280 !important;
                  }
                `}</style>
              </div>
            </div>

            {/* Date of Birth */}
            <FloatingLabelInput
              label="تاريخ الميلاد"
              placeholder="اختر تاريخ الميلاد"
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleInputChange}
              dir="ltr"
            />

            {/* Password (Optional) */}
            <FloatingLabelInput
              label="كلمة المرور (اختياري - اتركه فارغاً إذا لم تريد تغييره)"
              placeholder="اكتب كلمة المرور الجديدة هنا"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />

            {/* Status */}
            <div className="relative w-full">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-gray-700">
                حالة المستخدم *
              </label>
              <div className="relative">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right text-gray-700 appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                  dir="rtl"
                  required
                >
                  <option value="active">نشط</option>
                  <option value="suspended">متوقف</option>
                </select>
                <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Role */}
            <div className="relative w-full">
              <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-gray-700">
                الدور *
              </label>
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-right text-gray-700 appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
                  dir="rtl"
                  required
                >
                  <option value="user">مستخدم</option>
                  <option value="admin">مدير</option>
                </select>
                <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Points */}
            <FloatingLabelInput
              label="النقاط"
              placeholder="0"
              type="number"
              name="points"
              value={formData.points}
              onChange={handleInputChange}
              dir="ltr"
            />

            {/* Footer Buttons */}
            <div className="flex items-center justify-start gap-6 pt-4">
              <button
                type="submit"
                disabled={isUpdating}
                className="flex items-center gap-2 bg-[#0E3A53] hover:bg-[#062b40] disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-bold shadow-sm transition-all"
              >
                <UserCheck className="w-5 h-5" />
                <span>{isUpdating ? "جاري التحديث..." : "تعديل مستخدم"}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="text-gray-500 font-bold underline decoration-2 underline-offset-4 hover:text-gray-700 transition-colors"
                disabled={isUpdating}
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

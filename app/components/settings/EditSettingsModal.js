"use client";
import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { useSmtpSettings, useSmtpSettingsActions } from "@/hooks/useDashboard";

export default function EditSettingsModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const { data: smtpResponse } = useSmtpSettings();
  const { updateSmtpSettings, isUpdatingSmtp } = useSmtpSettingsActions();
  const smtp = smtpResponse?.data || {};

  const [formData, setFormData] = useState({
    smtp_host: "",
    smtp_username: "",
    smtp_password: "",
    smtp_port: 465,
    smtp_encryption: "ssl",
  });

  useEffect(() => {
    if (isOpen && smtp && Object.keys(smtp).length > 0) {
      setFormData({
        smtp_host: smtp.smtp_host || "",
        smtp_username: smtp.smtp_username || "",
        smtp_password: "",
        smtp_port: smtp.smtp_port || 465,
        smtp_encryption: smtp.smtp_encryption || "ssl",
      });
    }
  }, [isOpen, smtp]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      smtp_host: formData.smtp_host,
      smtp_username: formData.smtp_username,
      smtp_port: Number(formData.smtp_port),
      smtp_encryption: formData.smtp_encryption,
    };
    if (formData.smtp_password.trim()) {
      payload.smtp_password = formData.smtp_password;
    }
    updateSmtpSettings(payload, {
      onSuccess: () => onClose(),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-xl overflow-hidden relative animate-in fade-in zoom-in duration-200 flex flex-col"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-10 pt-16 overflow-y-auto flex-1 min-h-0">
          <div className="text-center mb-10">
            <h2 className="text-xl font-bold text-gray-700">
              تعديل إعدادات SMTP
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* SMTP HOST */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-xs font-bold text-[#0E3A53]">
                SMTP HOST
              </label>
              <input
                type="text"
                name="smtp_host"
                value={formData.smtp_host}
                onChange={handleChange}
                placeholder="smtp.example.com"
                className="w-full border border-gray-200 rounded-xl py-4 px-6 text-right focus:outline-none focus:border-primary transition-colors text-gray-600 font-medium"
                dir="ltr"
                required
              />
            </div>

            {/* Port */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-xs font-bold text-[#0E3A53]">
                المنفذ
              </label>
              <input
                type="number"
                name="smtp_port"
                value={formData.smtp_port}
                onChange={handleChange}
                placeholder="465"
                className="w-full border border-gray-200 rounded-xl py-4 px-6 text-right focus:outline-none focus:border-primary transition-colors text-gray-600 font-medium"
                dir="ltr"
                required
              />
            </div>

            {/* Username */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-xs font-bold text-[#0E3A53]">
                اسم المستخدم
              </label>
              <input
                type="text"
                name="smtp_username"
                value={formData.smtp_username}
                onChange={handleChange}
                placeholder="user@example.com"
                className="w-full border border-gray-200 rounded-xl py-4 px-6 text-right focus:outline-none focus:border-primary transition-colors text-gray-600 font-medium"
                dir="ltr"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-xs font-bold text-[#0E3A53]">
                كلمة السر
              </label>
              <input
                type="password"
                name="smtp_password"
                value={formData.smtp_password}
                onChange={handleChange}
                placeholder="اتركه فارغاً للإبقاء على كلمة السر الحالية"
                className="w-full border border-gray-200 rounded-xl py-4 px-6 text-right focus:outline-none focus:border-primary transition-colors text-gray-600 font-medium"
                dir="ltr"
              />
            </div>

            {/* Encryption Dropdown */}
            <div className="relative">
              <label className="absolute -top-3 right-4 bg-white px-1 text-xs font-bold text-[#0E3A53]">
                التشفير
              </label>
              <div className="relative">
                <select
                  name="smtp_encryption"
                  value={formData.smtp_encryption}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl py-4 px-6 text-right focus:outline-none focus:border-primary transition-colors text-gray-600 font-bold appearance-none bg-white cursor-pointer"
                  dir="rtl"
                >
                  <option value="ssl">SSL</option>
                  <option value="tls">TLS</option>
                </select>
                <ChevronDown className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center justify-center gap-12 mt-12">
              <button
                type="button"
                onClick={onClose}
                disabled={isUpdatingSmtp}
                className="text-[#0E3A53] font-bold text-lg underline decoration-2 underline-offset-8 hover:text-gray-700 transition-colors"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={isUpdatingSmtp}
                className="bg-[#0E3A53] hover:bg-[#062b40] disabled:opacity-50 text-white px-16 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-95"
              >
                {isUpdatingSmtp ? "جاري الحفظ..." : "حفظ التغييرات"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

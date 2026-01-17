"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDFDFD] to-gray-50 p-4" dir="rtl">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative w-32 h-32">
            <Image
              src="/icons/Logo.png"
              alt="Shhal Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="text-9xl font-bold text-[#8B8A6C] opacity-20 leading-none">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            الصفحة غير موجودة
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان آخر.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="w-3 h-3 bg-[#8B8A6C] rounded-full opacity-30"></div>
          <div className="w-3 h-3 bg-[#8B8A6C] rounded-full opacity-50"></div>
          <div className="w-3 h-3 bg-[#8B8A6C] rounded-full"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="flex items-center gap-2 bg-[#0E3A53] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#062b40] transition-all shadow-lg active:scale-95"
          >
            <Home className="w-5 h-5" />
            العودة للصفحة الرئيسية
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-white text-[#0E3A53] border-2 border-[#0E3A53] px-8 py-3 rounded-lg font-bold hover:bg-[#0E3A53] hover:text-white transition-all shadow-lg active:scale-95"
          >
            <ArrowRight className="w-5 h-5" />
            العودة للخلف
          </button>
        </div>

        {/* Help Text */}
        {/* <div className="mt-12 text-sm text-gray-500">
          <p>
            إذا كنت تعتقد أن هذا خطأ، يرجى{" "}
            <Link href="/settings" className="text-[#0E3A53] hover:underline font-medium">
              الاتصال بالدعم
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
}

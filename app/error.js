"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, RefreshCw, AlertCircle } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

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

        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            حدث خطأ غير متوقع
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto mb-4">
            عذراً، حدث خطأ أثناء تحميل الصفحة. يرجى المحاولة مرة أخرى.
          </p>
          {process.env.NODE_ENV === "development" && error?.message && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-right">
              <p className="text-sm text-red-800 font-mono break-all">
                {error.message}
              </p>
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="w-3 h-3 bg-red-500 rounded-full opacity-30"></div>
          <div className="w-3 h-3 bg-red-500 rounded-full opacity-50"></div>
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={reset}
            className="flex items-center gap-2 bg-[#0E3A53] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#062b40] transition-all shadow-lg active:scale-95"
          >
            <RefreshCw className="w-5 h-5" />
            إعادة المحاولة
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 bg-white text-[#0E3A53] border-2 border-[#0E3A53] px-8 py-3 rounded-lg font-bold hover:bg-[#0E3A53] hover:text-white transition-all shadow-lg active:scale-95"
          >
            <Home className="w-5 h-5" />
            العودة للصفحة الرئيسية
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-12 text-sm text-gray-500">
          <p>
            إذا استمرت المشكلة، يرجى{" "}
            <Link href="/settings" className="text-[#0E3A53] hover:underline font-medium">
              الاتصال بالدعم
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

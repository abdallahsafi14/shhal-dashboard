"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { setCookie, getCookie } from "@/lib/cookie-utils";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggingIn } = useAuth();
  const router = useRouter();

  // Restore session: if we have a token in localStorage but landed on login (e.g. cookie
  // was cleared on reload), set the cookie again and redirect to dashboard so reload keeps us in.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("shhal_admin_token");
    if (!token) return;
    if (getCookie("shhal_admin_token")) return; // Cookie already set, stay on login or let user log in again
    setCookie("shhal_admin_token", token, 7);
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get("redirect") || "/";
    urlParams.delete("redirect");
    urlParams.delete("unauthorized");
    const query = urlParams.toString() ? `?${urlParams.toString()}` : "";
    router.replace(redirect + query);
  }, [router]);

  // Show unauthorized message only when we're truly logged out (no token to restore)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("shhal_admin_token")) return; // Session restore will handle redirect
    const urlParams = new URLSearchParams(window.location.search);
    const unauthorized = urlParams.get("unauthorized");
    if (unauthorized === "true") {
      toast.warning("يجب عليك تسجيل الدخول للوصول لهذه الصفحة");
      urlParams.delete("unauthorized");
      const newUrl = window.location.pathname + (urlParams.toString() ? `?${urlParams.toString()}` : "");
      router.replace(newUrl);
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="min-h-screen flex" dir="rtl">
      {/* Right Side - Branding (appears on right in RTL) */}
      <div className="hidden lg:flex lg:w-1/3 bg-[#8B8A6C] items-center justify-center p-12 relative overflow-hidden">
        <div className="text-center z-10 max-w-md flex flex-col items-center">
          {/* Logo/Brand */}
          <div className="relative w-[150px] h-[150px] mb-8">
            <Image
              src="/icons/Logo.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* Description */}
          <p className="text-white/90 text-lg leading-relaxed mb-12 font-light">
            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
            النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد
            من النصوص الأخرى.
          </p>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-6">
            <Link
              href="#"
              className="transform hover:scale-110 transition-transform duration-300"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </Link>
            <Link
              href="#"
              className="transform hover:scale-110 transition-transform duration-300"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </Link>
            <Link
              href="#"
              className="transform hover:scale-110 transition-transform duration-300"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </Link>
            <Link
              href="#"
              className="transform hover:scale-110 transition-transform duration-300"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Link>
            <Link
              href="#"
              className="transform hover:scale-110 transition-transform duration-300"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Left Side - Login Form (appears on left in RTL) */}
      <div className="flex-1 w-full flex items-center justify-center p-8 bg-white relative overflow-hidden">
        {/* Decorative curved element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B8A6C]/10 rounded-full translate-x-32 -translate-y-32 border-2 border-dashed border-[#8B8A6C]/20"></div>
        <div className="w-full max-w-md relative z-10">
          {/* Illustration */}
          <div className="w-full mb-8 flex justify-center">
            <Image
              src="/icons/login.png"
              alt="Login Illustration"
              width={250}
              height={250}
              className="w-[250px] h-auto object-contain"
              priority
            />
          </div>

          {/* Form Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#8B8A6C] mb-2 text-right">
              معلومات تسجيل الدخول
            </h2>
            <p className="text-gray-500 text-sm text-right">
              أهلاً بعودتك ! من فضلك قم بإدخال بريدك الألكتروني وكلمة المرور
              لإتمام العملية بنجاح
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2 text-right"
              >
                البريد الألكتروني
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="أكتب البريد الإلكتروني هنا من فضلك"
                  className={`w-full rounded-md border bg-white pr-10 pl-3 py-2 text-sm text-right focus:outline-none focus:ring-2 focus:border-transparent transition-colors border-gray-200 text-gray-800 placeholder:text-gray-400 focus:ring-[#07334B]`}
                  required
                />
                {/* Email Icon */}
                <div
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2 text-right"
              >
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="أكتب كلمة المرور هنا من فضلك"
                  className={`w-full rounded-md border bg-white pr-10 pl-3 py-2 text-sm text-right focus:outline-none focus:ring-2 focus:border-transparent transition-colors border-gray-200 text-gray-800 placeholder:text-gray-400 focus:ring-[#07334B]`}
                  required
                />
                {/* Password Icon */}
                <div
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#07334B] text-white py-3 rounded-lg font-medium hover:bg-[#07334B]/90 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? "جاري التحميل..." : "تسجيل الدخول"}
            </button>

            {/* Register Link */}
            <div className="text-center text-sm text-gray-500">
              ليس لديك حساب؟{" "}
              <Link
                href="/register"
                className="text-[#07334B] hover:underline font-medium"
              >
                سجل الآن
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

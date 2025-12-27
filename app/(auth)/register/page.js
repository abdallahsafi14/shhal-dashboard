'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const { register, isRegistering } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        register(formData);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };


    return (
        <div className="min-h-screen flex" dir="rtl">
            {/* Right Side - Branding */}
            <div className="hidden lg:flex lg:w-1/3 bg-[#8B8A6C] items-center justify-center p-12 relative overflow-hidden">
                <div className="text-center z-10 max-w-md flex flex-col items-center">
                    <div className='relative w-[150px] h-[150px] mb-8'>
                        <Image 
                            src="/icons/Logo.png" 
                            alt="Logo" 
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <p className="text-white/90 text-lg leading-relaxed mb-12 font-light">
                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى.
                    </p>
                </div>
            </div>

            {/* Left Side - Register Form */}
            <div className="flex-1 w-full flex items-center justify-center p-8 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B8A6C]/10 rounded-full translate-x-32 -translate-y-32 border-2 border-dashed border-[#8B8A6C]/20"></div>
                <div className="w-full max-w-md relative z-10">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-[#8B8A6C] mb-2 text-right">إنشاء حساب جديد</h2>
                        <p className="text-gray-500 text-sm text-right">
                            من فضلك قم بإدخال بياناتك لإنشاء حساب جديد
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                الاسم بالكامل
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="أكتب اسمك الكامل هنا"
                                className="w-full rounded-md border bg-white pr-4 pl-3 py-2 text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#07334B] border-gray-200 text-gray-800 placeholder:text-gray-400"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                البريد الألكتروني
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="أكتب البريد الإلكتروني هنا"
                                className="w-full rounded-md border bg-white pr-4 pl-3 py-2 text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#07334B] border-gray-200 text-gray-800 placeholder:text-gray-400"
                                required
                            />
                        </div>

                        {/* Phone Input */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                رقم الهاتف
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="أكتب رقم هاتفك هنا"
                                className="w-full rounded-md border bg-white pr-4 pl-3 py-2 text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#07334B] border-gray-200 text-gray-800 placeholder:text-gray-400"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className="w-full bg-[#07334B] text-white py-3 rounded-lg font-medium hover:bg-[#07334B]/90 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isRegistering ? 'جاري التحميل...' : 'إنشاء حساب'}
                        </button>

                        <div className="text-center text-sm text-gray-500">
                            لديك حساب بالفعل؟{' '}
                            <Link href="/login" className="text-[#07334B] hover:underline font-medium">
                                تسجيل الدخول
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

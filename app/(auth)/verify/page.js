'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';

export default function Verify() {
    const [otp, setOtp] = useState('');
    // Assuming useAuth will handle verify
    const { verify, isVerifying } = useAuth(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        // verify({ otp });
    };

    return (
        <div className="min-h-screen flex" dir="rtl">
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
                </div>
            </div>

            <div className="flex-1 w-full flex items-center justify-center p-8 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B8A6C]/10 rounded-full translate-x-32 -translate-y-32 border-2 border-dashed border-[#8B8A6C]/20"></div>
                <div className="w-full max-w-md relative z-10">
                    <div className="w-full mb-8 flex justify-center">
                        <Image 
                            src="/icons/verify-opt.png" 
                            alt="Verify OTP Illustration" 
                            width={250}
                            height={250}
                            className="w-[250px] h-auto object-contain"
                            priority
                        />
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-[#8B8A6C] mb-2 text-right">تأكيد الرمز</h2>
                        <p className="text-gray-500 text-sm text-right">
                            لقد تم إرسال رمز التأكيد إلى بريدك الإلكتروني، يرجى إدخاله هنا
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                رمز التأكيد
                            </label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="000000"
                                className="w-full rounded-md border bg-white px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-[#07334B] border-gray-200 text-gray-800 placeholder:text-gray-300"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#07334B] text-white py-3 rounded-lg font-medium hover:bg-[#07334B]/90 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                        >
                            تأكيد
                        </button>

                        <div className="text-center text-sm text-gray-500">
                            لم يصلك الرمز؟{' '}
                            <button type="button" className="text-[#07334B] hover:underline font-medium">
                                إعادة إرسال الرمز
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

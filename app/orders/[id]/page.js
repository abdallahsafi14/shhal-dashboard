"use client";
import React, { useState } from "react";
import { 
  ChevronRight, 
  ArrowRight, 
  Star, 
  Eye, 
  Tag, 
  Store, 
  ImageIcon, 
  CircleDollarSign,
  Package,
  Clock
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import RejectOrderModal from "../../components/orders/RejectOrderModal";

export default function OrderDetailsPage({ params }) {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Top Header / Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link 
          href="/orders" 
          className="flex items-center gap-2 text-gray-800 font-bold hover:text-primary transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
          <span>الرجوع للخلف</span>
        </Link>
      </div>

      {/* Main Info Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
        
        {/* Row 1: Status, Request Type, Points */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#F8F9FA] p-4 rounded-xl">
           <div className="flex items-center gap-2 bg-[#E0F2FE] text-[#0369A1] px-4 py-1.5 rounded-lg text-sm font-bold border border-[#E0F2FE]">
              <div className="w-2 h-2 rounded-full bg-[#0369A1]"></div>
              <span>قيد المعالجة</span>
           </div>

           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-500 font-medium">
                  <Package className="w-4 h-4" />
                  <span>نوع الطلب :</span>
                  <span className="text-[#8B8A6C] font-bold">اضافة منتج جديد</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 font-medium">
                  <CircleDollarSign className="w-4 h-4" />
                  <span>النقاط المكتسبة :</span>
                  <span className="text-[#8B8A6C] font-bold">42 نقطة</span>
              </div>
           </div>
        </div>

        {/* Product Title */}
        <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-800">ساعة ذكية بمواصفات خارقة</h1>
        </div>

        {/* Description */}
        <div className="space-y-3 text-right">
            <h3 className="flex items-center justify-end gap-2 font-bold text-gray-700">
                <span>وصف المنتج :</span>
                <Tag className="w-4 h-4 text-[#8B8A6C]" />
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-4xl mr-auto">
                هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق
            </p>
        </div>

        {/* Meta Stats: Rating, Category, Views */}
        <div className="flex flex-wrap items-center justify-end gap-6 pt-4 border-t border-gray-50">
            <div className="flex items-center gap-2 text-gray-600">
                <span className="bg-gray-100 p-1 rounded-md"><Package className="w-4 h-4 text-gray-400" /></span>
                <span className="font-bold">فئة الالكترونيات</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-bold">4.7</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
                <Eye className="w-4 h-4 text-gray-400" />
                <span className="font-bold">21,671</span>
            </div>
        </div>

        {/* Variants */}
        <div className="flex flex-wrap items-center justify-end gap-3">
             <div className="bg-[#B5B499] text-white px-6 py-1.5 rounded-lg text-sm font-bold">
                 العمر : 15 - 24 سنة
             </div>
             <div className="bg-[#B5B499] text-white px-6 py-1.5 rounded-lg text-sm font-bold">
                 المقاس : XS
             </div>
             <div className="bg-[#B5B499] text-white px-6 py-1.5 rounded-lg text-sm font-bold">
                 اللون : أسود
             </div>
             <h3 className="flex items-center gap-2 font-bold text-gray-700 ml-4">
                <span>متغيرات المنتج :</span>
                <Clock className="w-4 h-4 text-[#8B8A6C]" />
            </h3>
        </div>

        {/* Stores */}
        <div className="space-y-4 text-right">
            <h3 className="flex items-center justify-end gap-2 font-bold text-gray-700">
                <span>المتاجر المتوفرة :</span>
                <Store className="w-4 h-4 text-[#8B8A6C]" />
            </h3>
            <div className="flex flex-wrap justify-end gap-4">
                {["Noon", "Nick", "Nick", "Nick", "Nick", "Nick", "Nick", "Nick", "Zara", "Zara", "Zara", "Zara", "Shein"].map((store, i) => (
                    <span key={i} className="text-gray-500 text-sm font-medium">{store}</span>
                ))}
            </div>
        </div>

        {/* Product Images */}
        <div className="space-y-4 text-right">
            <h3 className="flex items-center justify-end gap-2 font-bold text-gray-700">
                <span>صور المنتج :</span>
                <ImageIcon className="w-4 h-4 text-[#8B8A6C]" />
            </h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                {Array(10).fill(0).map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative border border-gray-100 hover:border-primary transition-colors cursor-pointer group">
                        <Image src="/icons/Logo.png" alt="product" fill className="object-contain p-2 grayscale group-hover:grayscale-0 transition-opacity" />
                    </div>
                ))}
            </div>
        </div>

        {/* Pricing Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            {/* Suggested Prices */}
            <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                <h3 className="flex items-center justify-end gap-2 font-bold text-gray-700 mb-6 text-lg">
                    <span>الاسعار المقترحة :</span>
                    <Store className="w-5 h-5 text-[#8B8A6C]" />
                </h3>
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                             <div className="flex items-center gap-1 font-bold text-[#0E3A53]">
                                 <span>$</span>
                                 <span>123.5</span>
                             </div>
                             <div className="flex items-center gap-2 text-gray-500">
                                 <span className="text-sm">ماجيلا</span>
                                 <Store className="w-4 h-4 text-gray-300" />
                             </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Previous Prices */}
            <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                <h3 className="flex items-center justify-end gap-2 font-bold text-gray-700 mb-6 text-lg">
                    <span>الاسعار السابقة :</span>
                    <Store className="w-5 h-5 text-[#8B8A6C]" />
                </h3>
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                             <div className="flex items-center gap-1 font-bold text-[#8B8A6C]">
                                 <span>$</span>
                                 <span>123.5</span>
                             </div>
                             <div className="flex items-center gap-2 text-gray-500 text-right">
                                 <div className="flex flex-col">
                                     <span className="text-sm font-medium">ماجيلا</span>
                                     <span className="text-[10px] text-gray-400">اتفاقية سوق التجار مقابل ملهى الملكي</span>
                                 </div>
                                 <Store className="w-4 h-4 text-gray-300" />
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="flex items-center justify-center gap-8 pt-10 border-t border-gray-50">
            <button 
                onClick={() => setIsRejectModalOpen(true)}
                className="text-[#DC2626] font-bold text-lg border-b-2 border-[#DC2626] pb-1 hover:opacity-80 transition-opacity"
            >
                رفض الطلب
            </button>
            <button className="bg-[#0E3A53] hover:bg-[#062b40] text-white px-16 py-3.5 rounded-xl font-bold text-lg shadow-lg hover:shadow-primary/20 transition-all transform active:scale-95">
                قبول الطلب
            </button>
        </div>

      </div>

      {/* Reject Modal */}
      <RejectOrderModal 
        isOpen={isRejectModalOpen} 
        onClose={() => setIsRejectModalOpen(false)} 
      />
    </div>
  );
}

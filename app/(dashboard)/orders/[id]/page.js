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
  Package,
  Clock,
  MapPin,
  CircleDollarSign
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import RejectOrderModal from "@/app/components/orders/RejectOrderModal";

import { useOrderDetails, useOrderActions } from "@/hooks/useDashboard";
import { use } from "react";

export default function OrderDetailsPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const { data: orderResponse, isLoading } = useOrderDetails(id);
  const { updateStatus, isUpdating } = useOrderActions();
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const order = orderResponse?.data;

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px]">جاري التحميل...</div>;
  if (!order) return <div className="flex items-center justify-center min-h-[400px]">الطلب غير موجود</div>;

  const handleAccept = () => {
    updateStatus({ id, status: 'accepted' });
  };

  const handleRejectConfirm = (reason) => {
    updateStatus({ id, status: 'rejected', reason });
    setIsRejectModalOpen(false);
  };
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
      <div className=" p-8 space-y-8">
        
        {/* Row 1: Status, Request Type, Points */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#FDFBF7] p-4 rounded-xl">
          

           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-secondary font-medium">
                  <Package className="w-4 h-4" />
                  <span>نوع الطلب :</span>
                   <span className="text-[#8B8A6C] font-bold">{order.type === 'update' ? 'تحديث منتج' : 'اضافة منتج جديد'}</span>
               </div>
               <div className="flex items-center gap-2 text-secondary font-medium">
                   <CircleDollarSign className="w-4 h-4" />
                   <span>النقاط المكتسبة :</span>
                   <span className="text-[#8B8A6C] font-bold">{order.points || 0} نقطة</span>
               </div>
            </div>
             <div className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold border ${
             order.status === 'pending' ? "bg-[#E0F2FE] text-[#0369A1] border-[#E0F2FE]" :
             order.status === 'accepted' ? "bg-green-100 text-green-600 border-green-200" :
             "bg-red-100 text-red-600 border-red-200"
           }`}>
              <div className={`w-2 h-2 rounded-full ${
                order.status === 'pending' ? "bg-[#0369A1]" :
                order.status === 'accepted' ? "bg-green-600" :
                "bg-red-600"
              }`}></div>
              <span>{order.status === 'rejected' ? "تم رفضها" : order.status === 'pending' ? "قيد المعالجة" : "تم قبولها"}</span>
           </div>
         </div>

         {/* Product Title */}
         <div className="text-right">
             <h1 className="text-2xl font-bold text-gray-800">{order.product?.name || "---"}</h1>
         </div>

         {/* Description */}
         <div className="space-y-3 text-right">
             <h3 className="flex items-center justify-start gap-2 font-bold text-gray-700">
                 <span>وصف المنتج :</span>
                 <Tag className="w-4 h-4 text-[#8B8A6C]" />
             </h3>
             <p className="text-gray-400 text-sm leading-relaxed max-w-4xl mr-auto">
                 {order.product?.description || "لا يوجد وصف"}
             </p>
         </div>

        {/* Meta Stats: Rating, Category, Views */}
      <div className="flex items-center justify-between">
          <div className="flex  items-center justify-center gap-16 py-4 border-t border-gray-200 border-b border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
                <span className="bg-gray-100 p-1 rounded-md"><Package className="w-4 h-4 text-gray-400" /></span>
                <span className="font-bold">فئة {order.category?.name || "---"}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-bold">{order.product?.rating || 0}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
                <Eye className="w-4 h-4 text-gray-400" />
                <span className="font-bold">{order.product?.views || 0}</span>
            </div>
        </div>

        {/* Variants */}
        <div className="flex flex-wrap flex-col items-start justify-end gap-3">
             <h3 className="flex items-center gap-2 font-bold text-gray-700 ml-4">
                <Clock className="w-4 h-4 text-[#8B8A6C]" />
                <span>متغيرات المنتج :</span>
            </h3>
           <div className="flex items-center gap-2">
              <div className="bg-[#B5B499] text-white px-6 py-1.5 rounded-lg text-sm font-bold">
                 العمر : 15 - 24 سنة
             </div>
             <div className="bg-[#B5B499] text-white px-6 py-1.5 rounded-lg text-sm font-bold">
                 المقاس : XS
             </div>
             <div className="bg-[#B5B499] text-white px-6 py-1.5 rounded-lg text-sm font-bold">
                 اللون : أسود
             </div>
           </div>
        </div>
      </div>

        {/* Stores */}
        <div className="space-y-4 text-right bg-[#FDFBF7] rounded-3xl p-8 border border-gray-100">
            <h3 className="flex items-center justify-start gap-2 font-bold text-gray-700">
                <Store className="w-4 h-4 text-[#8B8A6C]" />
                <span>المتاجر المتاحة :</span>
            </h3>
            <div className="flex flex-wrap justify-start gap-4">
                {order.stores?.map((store, i) => (
                    <span key={i} className="text-gray-500 text-sm font-medium">{store.name}</span>
                )) || <span className="text-gray-400 text-sm">لا توجد متاجر</span>}
            </div>
        </div>

       

        {/* Pricing Tables */}
        <div className=" gap-8 pt-8">
            {/* Suggested Prices */}
            <div className="bg-[#FDFBF7] rounded-3xl p-8 border border-gray-100">
                <h3 className="flex items-center justify-start  gap-2 font-bold text-[#0E3A53] mb-8 text-xl">
                    <Store className="w-6 h-6" />
                    <span>الاسعار المقترحة :</span>
                </h3>
                <div className="space-y-6 flex  justify-between items-center">
                    {order.suggested_prices?.map((item, i) => (
                        <div key={i} className="flex items-center justify-between gap-8">
                            {/* Price (Far Left) */}
                              <div className="text-right space-y-1">
                                 <div className="flex items-center justify-start gap-2 text-secondary font-bold">
                                     <Store className="w-4 h-4" />
                                     <span>{item.store_name}</span>
                                 </div>
                                 <div className="flex items-center justify-start gap-2 text-secondary text-sm">
                                     <MapPin className="w-3.5 h-3.5" />
                                     <span className="font-medium">اللاذقية سوق التجار مقابل مقهى الملكي</span>
                                 </div>
                             </div>

                             {/* Shop Info (Right) */}
                              <div className="text-lg font-bold text-[#0E3A53]">
                                 ${item.price}
                             </div>
                           
                        </div>
                    )) || <p className="text-gray-400 text-sm text-center">لا توجد أسعار مقترحة</p>}
                    {order.suggested_prices?.map((item, i) => (
                        <div key={i} className="flex items-center justify-between  gap-8">
                            {/* Price (Far Left) */}
                             <div className="text-right space-y-1">
                                 <div className="flex items-center justify-start gap-2 text-secondary font-bold">
                                     <Store className="w-4 h-4" />
                                     <span>{item.store_name}</span>
                                 </div>
                                 <div className="flex items-center justify-start gap-2 text-secondary text-sm">
                                     <MapPin className="w-3.5 h-3.5" />
                                     <span className="font-medium">اللاذقية سوق التجار مقابل مقهى الملكي</span>
                                 </div>
                             </div>

                             {/* Shop Info (Right) */}
                              <div className="text-lg font-bold text-[#0E3A53]">
                                 ${item.price}
                             </div>
                            
                        </div>
                    )) || <p className="text-gray-400 text-sm text-center">لا توجد أسعار مقترحة</p>}
                </div>
            </div>

            {/* Previous Prices */}
          
        </div>
         {/* Product Images */}
        <div className="space-y-4 text-right">
            <h3 className="flex items-center justify-start gap-2 font-bold text-gray-700">
                <span>صور المنتج :</span>
                <ImageIcon className="w-4 h-4 text-[#8B8A6C]" />
            </h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                {order.product?.images?.map((img, i) => (
                    <div key={i} className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative border border-gray-100 hover:border-primary transition-colors cursor-pointer group">
                        <Image src={img || "/icons/Logo.png"} alt="product" fill className="object-contain p-2 grayscale group-hover:grayscale-0 transition-opacity" />
                    </div>
                )) || <p className="text-gray-400 text-sm text-right col-span-full">لا توجد صور</p>}
            </div>
        </div>

        {/* Action Buttons Footer */}
        {order.status === 'pending' && (
            <div className="flex items-center justify-start gap-8 pt-10 border-t border-gray-50">
                <button 
                    onClick={handleAccept}
                    disabled={isUpdating}
                    className="bg-[#0E3A53] hover:bg-[#062b40] text-white px-16 py-3.5 rounded-xl font-bold text-lg shadow-lg hover:shadow-primary/20 transition-all transform active:scale-95 disabled:opacity-50"
                >
                    {isUpdating ? 'جاري التحميل...' : 'قبول الطلب'}
                </button>
                <button 
                    onClick={() => setIsRejectModalOpen(true)}
                    disabled={isUpdating}
                    className="text-[#DC2626] font-bold text-lg border-b-2 border-[#DC2626] pb-1 hover:opacity-80 transition-opacity disabled:opacity-50"
                >
                    رفض الطلب
                </button>
            </div>
        )}

      </div>

      {/* Reject Modal */}
      <RejectOrderModal 
        isOpen={isRejectModalOpen} 
        onClose={() => setIsRejectModalOpen(false)} 
        onConfirm={handleRejectConfirm}
      />
    </div>
  );
}

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
  const { approveOrder, rejectOrder, isApproving, isRejecting } = useOrderActions();
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const order = orderResponse?.data;
  const productData = order?.product_data || {};
  const isUpdating = isApproving || isRejecting;

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px]">جاري التحميل...</div>;
  if (!order) return <div className="flex items-center justify-center min-h-[400px]">الطلب غير موجود</div>;

  const handleAccept = () => {
    approveOrder(id);
  };

  const handleRejectConfirm = (reason) => {
    rejectOrder({ id, reason });
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
                   <span className="text-[#8B8A6C] font-bold">{order.type || '---'}</span>
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
             <h1 className="text-2xl font-bold text-gray-800">{order.product_name || productData.name_ar || "---"}</h1>
         </div>

         {/* Description */}
         <div className="space-y-3 text-right">
             <h3 className="flex items-center justify-start gap-2 font-bold text-gray-700">
                 <span>وصف المنتج :</span>
                 <Tag className="w-4 h-4 text-[#8B8A6C]" />
             </h3>
             <p className="text-gray-400 text-sm leading-relaxed max-w-4xl mr-auto">
                 {productData.description || "لا يوجد وصف"}
             </p>
         </div>

        {/* Meta Stats: Category, Barcode */}
      <div className="flex items-center justify-between">
          <div className="flex  items-center justify-center gap-16 py-4 border-t border-gray-200 border-b border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
                <span className="bg-gray-100 p-1 rounded-md"><Package className="w-4 h-4 text-gray-400" /></span>
                <span className="font-bold">فئة {order.category || "---"}</span>
            </div>
            {productData.barcode && (
              <div className="flex items-center gap-2 text-gray-600">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="font-bold">باركود: {productData.barcode}</span>
              </div>
            )}
        </div>

        {/* Variants */}
        {productData.variants && productData.variants.length > 0 && (
          <div className="flex flex-wrap flex-col items-start justify-end gap-3">
               <h3 className="flex items-center gap-2 font-bold text-gray-700 ml-4">
                  <Clock className="w-4 h-4 text-[#8B8A6C]" />
                  <span>متغيرات المنتج :</span>
              </h3>
             <div className="flex items-center gap-2">
                {productData.variants.map((variant, i) => (
                  <div key={i} className="bg-[#B5B499] text-white px-6 py-1.5 rounded-lg text-sm font-bold">
                    {variant.key} : {variant.value}
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>

        {/* Price */}
        {productData.price && (
          <div className="space-y-4 text-right bg-[#FDFBF7] rounded-3xl p-8 border border-gray-100">
              <h3 className="flex items-center justify-start gap-2 font-bold text-gray-700">
                  <CircleDollarSign className="w-4 h-4 text-[#8B8A6C]" />
                  <span>السعر :</span>
              </h3>
              <div className="text-2xl font-bold text-[#0E3A53]">
                  {productData.price} $
              </div>
          </div>
        )}

       

        {/* User Info */}
        {order.user && (
          <div className="bg-[#FDFBF7] rounded-3xl p-8 border border-gray-100">
              <h3 className="flex items-center justify-start gap-2 font-bold text-gray-700 mb-4">
                  <Package className="w-4 h-4 text-[#8B8A6C]" />
                  <span>معلومات المستخدم :</span>
              </h3>
              <div className="space-y-2 text-right">
                  <p className="text-gray-600"><span className="font-bold">الاسم:</span> {order.user.name || "---"}</p>
                  <p className="text-gray-600"><span className="font-bold">البريد الإلكتروني:</span> {order.user.email || "---"}</p>
              </div>
          </div>
        )}

        {/* Rejection Reason */}
        {order.rejection_reason && (
          <div className="bg-red-50 rounded-3xl p-8 border border-red-200">
              <h3 className="flex items-center justify-start gap-2 font-bold text-red-700 mb-4">
                  <span>سبب الرفض :</span>
              </h3>
              <p className="text-red-600 text-right">{order.rejection_reason}</p>
          </div>
        )}
         {/* Product Images */}
        {productData.images && productData.images.length > 0 && (
          <div className="space-y-4 text-right">
              <h3 className="flex items-center justify-start gap-2 font-bold text-gray-700">
                  <span>صور المنتج :</span>
                  <ImageIcon className="w-4 h-4 text-[#8B8A6C]" />
              </h3>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                  {productData.images.map((img, i) => (
                      <div key={i} className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative border border-gray-100 hover:border-primary transition-colors cursor-pointer group">
                          <Image src={img || "/icons/Logo.png"} alt="product" fill className="object-contain p-2 grayscale group-hover:grayscale-0 transition-opacity" />
                      </div>
                  ))}
              </div>
          </div>
        )}

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

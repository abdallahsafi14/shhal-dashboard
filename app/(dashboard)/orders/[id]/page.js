"use client";
import React, { useState, useEffect, useCallback } from "react";
import { 
  ArrowRight, 
  Tag, 
  ImageIcon, 
  Package,
  Clock,
  CircleDollarSign,
  X,
  ChevronRight,
  ChevronLeft
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
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const order = orderResponse?.data;
  const productData = order?.product_data || {};
  const isUpdating = isApproving || isRejecting;

  // Build full storage URL for product images (API returns paths like "products/xxx.jpg")
  const apiBase = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "") : "https://api.shihal.net";
  const getImageSrc = (path) => {
    if (!path) return "/icons/Logo.png";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    return `${apiBase}/storage/${path.replace(/^\/+/, "")}`;
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px]">جاري التحميل...</div>;
  if (!order) return <div className="flex items-center justify-center min-h-[400px]">الطلب غير موجود</div>;

  const handleAccept = () => {
    approveOrder(id);
  };

  const handleRejectConfirm = (reason) => {
    rejectOrder({ id, reason });
    setIsRejectModalOpen(false);
  };

  const images = productData?.images || [];
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i == null ? i : i <= 0 ? images.length - 1 : i - 1));
  }, [images.length]);
  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i == null ? i : i >= images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex == null) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goPrev();
      if (e.key === "ArrowLeft") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, goPrev, goNext]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 px-4 sm:px-6">
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
      <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
        
        {/* Row 1: Status, Request Type, Points */}
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 bg-[#FDFBF7] p-3 sm:p-4 rounded-xl">
           <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-2 text-secondary font-medium text-sm sm:text-base">
                  <Package className="w-4 h-4 shrink-0" />
                  <span>نوع الطلب :</span>
                  <span className="text-[#8B8A6C] font-bold">{order.type || "---"}</span>
              </div>
              <div className="flex items-center gap-2 text-secondary font-medium text-sm sm:text-base">
                  <CircleDollarSign className="w-4 h-4 shrink-0" />
                  <span>النقاط المكتسبة :</span>
                  <span className="text-[#8B8A6C] font-bold">{order.points || 0} نقطة</span>
              </div>
           </div>
           <div className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 rounded-lg text-sm font-bold border shrink-0 ${
             order.status === "pending" ? "bg-[#E0F2FE] text-[#0369A1] border-[#E0F2FE]" :
             order.status === "accepted" ? "bg-green-100 text-green-600 border-green-200" :
             "bg-red-100 text-red-600 border-red-200"
           }`}>
              <div className={`w-2 h-2 rounded-full shrink-0 ${
                order.status === "pending" ? "bg-[#0369A1]" :
                order.status === "accepted" ? "bg-green-600" :
                "bg-red-600"
              }`} />
              <span>{order.status === "rejected" ? "تم رفضها" : order.status === "pending" ? "قيد المعالجة" : "تم قبولها"}</span>
           </div>
         </div>

         {/* Product Title */}
         <div className="text-right">
             <h1 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">{order.product_name || productData.name_ar || "---"}</h1>
         </div>

         {/* Description */}
         <div className="space-y-3 text-right">
             <h3 className="flex items-center justify-start gap-2 font-bold text-gray-700 text-sm sm:text-base">
                 <span>وصف المنتج :</span>
                 <Tag className="w-4 h-4 text-[#8B8A6C] shrink-0" />
             </h3>
             <p className="text-gray-400 text-sm leading-relaxed max-w-4xl mr-auto break-words">
                 {productData.description || "لا يوجد وصف"}
             </p>
         </div>

        {/* Meta Stats: Category, Barcode */}
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 sm:gap-8 md:gap-16 py-4 border-t border-b border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
                <span className="bg-gray-100 p-1 rounded-md shrink-0"><Package className="w-4 h-4 text-gray-400" /></span>
                <span className="font-bold text-sm sm:text-base">فئة {order.category || "---"}</span>
            </div>
            {productData.barcode && (
              <div className="flex items-center gap-2 text-gray-600">
                  <Tag className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="font-bold text-sm sm:text-base break-all">باركود: {productData.barcode}</span>
              </div>
            )}
        </div>

        {/* Variants - responsive wrap */}
        {productData.variants && productData.variants.length > 0 && (
          <div className="space-y-3">
             <h3 className="flex items-center gap-2 font-bold text-gray-700 text-sm sm:text-base">
                <Clock className="w-4 h-4 text-[#8B8A6C] shrink-0" />
                <span>متغيرات المنتج :</span>
             </h3>
             <div className="flex flex-wrap gap-2 justify-end">
                {productData.variants.map((variant, i) => (
                  <span
                    key={i}
                    className="bg-[#B5B499] text-white px-3 py-1.5 sm:px-6 sm:py-1.5 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap"
                  >
                    {variant.key} : {variant.value}
                  </span>
                ))}
             </div>
          </div>
        )}

        {/* Price */}
        {productData.price && (
          <div className="space-y-4 text-right bg-[#FDFBF7] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-100">
              <h3 className="flex items-center justify-start gap-2 font-bold text-gray-700 text-sm sm:text-base">
                  <CircleDollarSign className="w-4 h-4 text-[#8B8A6C] shrink-0" />
                  <span>السعر :</span>
              </h3>
              <div className="text-xl sm:text-2xl font-bold text-[#0E3A53]">
                  {productData.price} $
              </div>
          </div>
        )}

        {/* User Info */}
        {order.user && (
          <div className="bg-[#FDFBF7] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-100">
              <h3 className="flex items-center justify-start gap-2 font-bold text-gray-700 mb-4 text-sm sm:text-base">
                  <Package className="w-4 h-4 text-[#8B8A6C] shrink-0" />
                  <span>معلومات المستخدم :</span>
              </h3>
              <div className="space-y-2 text-right text-sm sm:text-base">
                  <p className="text-gray-600 break-words"><span className="font-bold">الاسم:</span> {order.user.name || "---"}</p>
                  <p className="text-gray-600 break-all"><span className="font-bold">البريد الإلكتروني:</span> {order.user.email || "---"}</p>
              </div>
          </div>
        )}

        {/* Rejection Reason */}
        {order.rejection_reason && (
          <div className="bg-red-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-red-200">
              <h3 className="flex items-center justify-start gap-2 font-bold text-red-700 mb-4 text-sm sm:text-base">
                  <span>سبب الرفض :</span>
              </h3>
              <p className="text-red-600 text-right text-sm sm:text-base break-words">{order.rejection_reason}</p>
          </div>
        )}
         {/* Product Images */}
        {productData.images && productData.images.length > 0 && (
          <div className="space-y-4 text-right">
              <h3 className="flex items-center justify-start gap-2 font-bold text-gray-700 text-sm sm:text-base">
                  <span>صور المنتج :</span>
                  <ImageIcon className="w-4 h-4 text-[#8B8A6C]" />
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2 sm:gap-3">
                  {productData.images.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => openLightbox(i)}
                        className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative border border-gray-100 hover:border-primary transition-colors cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                          <Image src={getImageSrc(img)} alt={`منتج ${i + 1}`} fill className="object-contain p-2 grayscale group-hover:grayscale-0 transition-opacity" />
                      </button>
                  ))}
              </div>
          </div>
        )}

        {/* Image Lightbox */}
        {lightboxIndex !== null && images.length > 0 && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="عرض الصورة"
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="إغلاق"
            >
              <X className="w-6 h-6" />
            </button>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="absolute top-1/2 right-4 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="الصورة السابقة"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="absolute top-1/2 left-4 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="الصورة التالية"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
              </>
            )}
            <div
              className="relative w-full max-w-4xl h-[70vh] min-h-[280px]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={getImageSrc(images[lightboxIndex])}
                alt={`منتج ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
            {images.length > 1 && (
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
                {lightboxIndex + 1} / {images.length}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons Footer */}
        {order.status === "pending" && (
            <div className="flex flex-wrap items-center justify-start gap-4 sm:gap-8 pt-8 sm:pt-10 border-t border-gray-50">
                <button
                    type="button"
                    onClick={handleAccept}
                    disabled={isUpdating}
                    className="bg-[#0E3A53] hover:bg-[#062b40] text-white px-8 sm:px-16 py-3 sm:py-3.5 rounded-xl font-bold text-base sm:text-lg shadow-lg w-full sm:w-auto"
                >
                    {isUpdating ? "جاري التحميل..." : "قبول الطلب"}
                </button>
                <button
                    type="button"
                    onClick={() => setIsRejectModalOpen(true)}
                    disabled={isUpdating}
                    className="text-[#DC2626] font-bold text-base sm:text-lg border-b-2 border-[#DC2626] pb-1 w-full sm:w-auto"
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

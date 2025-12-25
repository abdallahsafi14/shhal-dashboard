"use client";
import React, { useRef, useEffect } from "react";
import { X, User, FileText, Calendar, Coins, Wallet, CreditCard, Bitcoin } from "lucide-react";

export default function TransactionDetailsModal({ isOpen, onClose, transaction }) {
  const modalRef = useRef(null);

  // Close modal when clicking outside
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

  if (!isOpen) return null;

  // Mock data fallback
  const data = transaction || {
      id: "123",
      name: "محمد الأحمد العلي",
      opNumber: "123",
      date: "12 / 12 / 2024",
      points: "1232 نقطة",
      amount: "120 $",
      paymentMethod: "باي بال (Paypal)",
      status: "تم صرفها"
  };

  const isCompleted = data.status === "تم صرفها";
  const statusStyles = isCompleted 
    ? "bg-[#D1FAE5] text-[#059669]" 
    : "bg-[#E0F2FE] text-[#0369A1]";
    
  const statusDot = isCompleted ? "bg-[#059669]" : "bg-[#0369A1]";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div 
        ref={modalRef} 
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden relative animate-in fade-in zoom-in duration-200"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

         {/* Content */}
         <div className="p-8 pt-12">

            {/* Gray Container for Details */}
            <div className="bg-[#FAF9F6] rounded-xl p-6 mb-6">
                
                {/* Header: User Info & Status */}
                <div className="flex justify-between items-start mb-8">
                    {/* User Info (Right) */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-white">
                            <User className="w-5 h-5 text-gray-500" /> 
                        </div>
                        <span className="text-base font-bold text-gray-700">{data.userName || data.name}</span>
                    </div>

                    {/* Status Badge (Left) */}
                    <div className={`${statusStyles} px-3 py-1 rounded-md text-sm font-bold flex items-center gap-2`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`}></span>
                        <span>{data.status}</span>
                    </div>
                </div>

                {/* List Details */}
                <div className="space-y-5">
                    {/* Operation Number */}
                    <div className="flex items-center justify-between text-gray-700">
                        <div className="flex items-center gap-3">
                             <FileText className="w-5 h-5 text-gray-400" />
                             <span className="font-medium text-gray-500">رقم العملية :</span>
                        </div>
                        <span className="font-bold dir-ltr">{data.id || data.opNumber}</span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center justify-between text-gray-700">
                        <div className="flex items-center gap-3">
                             <Calendar className="w-5 h-5 text-gray-400" />
                             <span className="font-medium text-gray-500">تاريخ العملية :</span>
                        </div>
                        <span className="font-bold dir-ltr">{data.date}</span>
                    </div>

                     {/* Points */}
                     <div className="flex items-center justify-between text-gray-700">
                        <div className="flex items-center gap-3">
                             <Wallet className="w-5 h-5 text-gray-400" />
                             <span className="font-medium text-gray-500">النقاط المصروفة :</span>
                        </div>
                        <span className="font-bold">{data.pointsBalance || data.points}</span>
                    </div>

                    {/* Amount */}
                    <div className="flex items-center justify-between text-gray-700">
                        <div className="flex items-center gap-3">
                             <Coins className="w-5 h-5 text-gray-400" />
                             <span className="font-medium text-gray-500">القيمة المالية :</span>
                        </div>
                        <span className="font-bold dir-ltr">{data.financialValue || data.amount}</span>
                    </div>

                    {/* Payment Method */}
                    <div className="flex items-center justify-between text-gray-700">
                        <div className="flex items-center gap-3">
                             <Bitcoin className="w-5 h-5 text-gray-400" />
                             <span className="font-medium text-gray-500">طريقة الدفع :</span>
                        </div>
                         {/* Assuming Mock data passes payment method text */}
                        <span className="font-bold">{data.paymentMethod || "باي بال (Paypal)"}</span>
                    </div>
                </div>
            </div>

            {/* Notes Section - Outside Gray Box? Or Inside? 
                Screenshot shows it seems to be outside or separated by a line? 
                Actually, in the screenshot, the notes text 'هذا النص هو مثال...' is inside a white box with a border?
                Let's put it outside the gray box for now, or as a separate section.
            */}
            <div className="relative mb-8">
                 <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53]">ملاحظات</label>
                 <div className="w-full border border-gray-200 rounded-lg p-4 text-xs text-gray-400 leading-relaxed text-right">
                    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق
                 </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-2">
                 {/* Delete Action (Right / Start) - Red Text */}
                 <button className="text-[#DC2626] font-bold border-b border-[#DC2626] pb-0.5 hover:opacity-80 transition-opacity text-sm">
                    حذف العملية
                 </button>

                 {/* Action Button (Left / End) */}
                 <button className="bg-[#0E3A53] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#082f45] transition-colors text-sm">
                    {isCompleted ? "تعديل العملية" : "قبول العملية"}
                 </button>
            </div>

         </div>
      </div>
    </div>
  );
}

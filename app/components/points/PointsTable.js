"use client";
import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ChevronDown, Edit2, Trash2, ChevronLeft, ChevronRight, Bitcoin, Filter } from "lucide-react"; // Using Bitcoin icon as placeholder for payment method icon seen in screenshot
import Image from "next/image";
import TransactionDetailsModal from "./TransactionDetailsModal";

// Mock Data
const MOCK_DATA = Array(10).fill(null).map((_, i) => ({
  id: "12132121313",
  userName: "محمد احمد علي",
  pointsBalance: "1598 نقطة",
  financialValue: "120.56 $",
  paymentMethod: "120.56 $", // Screenshot shows price again? Or maybe a BTC icon + price? Wait. 
  // Screenshot col "طريقة الدفع" (Payment Method) shows: "120.56 $" and a B icon? 
  // Ah, let's look closer at uploaded_image_0.
  // Col Headers: رقم العملية, اسم المستخدم, رصيد النقاط, القيمة المالية, طريقة الدفع, تاريخ العملية.
  // Row 1:
  // ID: 12132121313
  // Name: محمد احمد علي
  // Points: 1598 نقطة
  // Value: 120.56 $
  // Payment Method: 120.56 $ (and a Bitcoin icon next to it). WAIT. Why is the payment method value same as financial value?
  // Maybe it means "Paid via Bitcoin, value 120.56$"? Or just the icon represents the method.
  // Let's assume the column is "Payment Method" and it shows the value + Icon.
  // Date: 12/12/2024
  // Status is implied by the row color or action?
  // Wait, there is a BUTTON column on the LEFT.
  // The Buttons are: "تم صرفها" (Green), "قيد المعالجة" (Blue), "تم رفضها" (Red).
  // These look like STATUS BADGES, not buttons. BUT they have a specific style.
  // Wait, looking at the image, strictly:
  // The first column (Right) is ID.
  // The last column (Left) is "حالة العملية" (Operation Status).
  // The actual actions (Edit/Delete icons) are in a separate column on the FAR LEFT.
  
  status: i % 3 === 0 ? "تم صرفها" : i % 3 === 1 ? "قيد المعالجة" : "تم رفضها",
  date: "12/12/2024",
}));

export default function PointsTable() {
  const [data] = useState(MOCK_DATA);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Toggle for filter popover

  const handleRowClick = (row) => {
      setSelectedTransaction(row);
      setIsDetailsModalOpen(true);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "رقم العملية",
        cell: (info) => <span className="font-semibold text-gray-700">{info.getValue()}</span>,
      },
      {
        accessorKey: "userName",
        header: "اسم المستخدم",
        cell: (info) => <span className="font-medium text-gray-800">{info.getValue()}</span>,
      },
      {
        accessorKey: "pointsBalance",
        header: "رصيد النقاط",
        cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
      },
      {
        accessorKey: "financialValue",
        header: "القيمة المالية",
        cell: (info) => <span className="text-gray-600 dir-ltr text-right font-bold">{info.getValue()}</span>,
      },
      {
        accessorKey: "paymentMethod",
        header: "طريقة الدفع",
        cell: (info) => (
            <div className="flex items-center gap-2 justify-end">
                <span className="text-gray-600 dir-ltr text-right font-bold">{info.getValue()}</span>
                <div className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center p-1">
                    <Bitcoin className="w-full h-full" />
                </div>
            </div>
        ),
      },
      {
        accessorKey: "date",
        header: "تاريخ العملية",
        cell: (info) => <span className="text-gray-600 dir-ltr text-right">{info.getValue()}</span>,
      },
      {
        id: "status",
        header: "حالة العملية",
        cell: ({ row }) => {
            const status = row.original.status;
            let styles = "bg-green-100 text-green-600 border-green-200";
            if(status === "قيد المعالجة") styles = "bg-[#E0F2FE] text-[#0369A1] border-[#E0F2FE]"; // Blue
            if(status === "تم رفضها") styles = "bg-red-100 text-red-600 border-red-200";

            return (
                 <span className={`px-4 py-1.5 rounded-md text-xs font-bold border ${styles} block w-fit mx-auto`}>
                    {status}
                 </span>
            );
        }
      },
      {
        id: "actions",
        header: "", 
        cell: ({ row }) => (
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button className="text-[#0E3A53] hover:text-[#062b40] transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    handleRowClick(row.original);
                }} 
                className="text-[#0E3A53] hover:text-[#062b40] transition-colors"
             >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[600px] relative">
        {/* Top Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 relative z-20">
          {/* Right Side: Search */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="ابحث هنا ......"
              className="w-full bg-white border-b border-gray-200 py-2 px-2 text-right focus:outline-none focus:border-primary text-sm"
            />
          </div>
          {/* Left Side: Filters */}
          <div className="flex gap-3 w-full md:w-auto items-center">
             
             {/* Custom Filter Popover Trigger */}
             <div className="relative group">
                <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 bg-[#EAEAEA] border border-transparent px-6 py-2 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                   <span>فلترة حسب :</span>
                </button>

                {/* The Filter Popover (No Overlay) */}
                {isFilterOpen && (
                    <div className="absolute top-full text-right mt-2 w-72 bg-[#F3F2F1] rounded-xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left">
                        <div className="space-y-3">
                             {/* Date Filter */}
                             <div>
                                 <label className="text-xs font-bold text-gray-500 mb-1 block">التاريخ حسب التاريخ :</label>
                                 <div className="relative">
                                    <button className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-gray-500 flex justify-between items-center text-right">
                                        <span>اختار التاريخ الذي تريده....</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                 </div>
                             </div>

                             {/* Status Filter */}
                             <div>
                                 <label className="text-xs font-bold text-gray-500 mb-1 block">الفلترة حسب الحالة :</label>
                                 <div className="relative">
                                    <button className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-gray-500 flex justify-between items-center text-right">
                                        <span>قيد المعالجة</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                 </div>
                             </div>
                             
                             {/* Payment Method Filter */}
                             <div>
                                 <label className="text-xs font-bold text-gray-500 mb-1 block">الفلترة حسب طريقة الدفع :</label>
                                 <div className="relative">
                                    <button className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-gray-500 flex justify-between items-center text-right">
                                        <span>اختر طريقة الدفع التي تريدها...</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                 </div>
                             </div>

                             {/* Sort Filter */}
                             <div>
                                 <label className="text-xs font-bold text-gray-500 mb-1 block">الفلترة حسب الترتيب :</label>
                                 <div className="relative">
                                    <button className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-gray-500 flex justify-between items-center text-right">
                                        <span>الترتيب من الأحدث للأقدم..</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                 </div>
                             </div>

                             {/* Apply Filter Button */}
                             <button className="w-full bg-[#8B8A6C] hover:bg-[#7A795B] text-white font-bold py-2 rounded-lg mt-2 transition-colors">
                                 فلترة
                             </button>
                        </div>
                    </div>
                )}
             </div>

             <div className="relative group">
                <button className="flex items-center gap-2 bg-white border-b border-gray-200 px-4 py-2 text-gray-600 text-sm hover:text-primary transition-colors">
                   <span>كل الحالات</span>
                   <ChevronDown className="w-4 h-4" />
                </button>
             </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto rounded-t-lg">
          <table className="w-full">
            <thead className="bg-[#8B8A6C] text-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="py-4 px-4 text-center text-sm font-medium first:rounded-tr-lg last:rounded-tl-lg"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100">
              {table.getRowModel().rows.map((row) => (
                <tr 
                    key={row.id} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-4 px-4 text-sm text-center whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
            <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                <span className="">  460 of 10 1 - 10 </span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[#8B8A6C]">رقم السطر :</span>
                <div className="flex items-center gap-2 bg-[#8B8A6C] text-white px-2 py-1 rounded">
                  <span>10</span>
                  <ChevronDown className="w-3 h-3" />
                </div>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#8B8A6C] text-white hover:opacity-90 transition-opacity">
                    <ChevronRight className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#8B8A6C] text-white hover:opacity-90 transition-opacity">
                    <ChevronLeft className="w-4 h-4" />
                </button>
            </div>
        </div>
      </div>
      
      {/* Details Modal */}
      <TransactionDetailsModal 
        isOpen={isDetailsModalOpen} 
        onClose={() => setIsDetailsModalOpen(false)} 
        transaction={selectedTransaction}
      />
    </>
  );
}

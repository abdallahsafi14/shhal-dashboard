"use client";
import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ChevronDown, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { useOrders } from "@/hooks/useDashboard";

export default function OrdersTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data: ordersData, isLoading } = useOrders({ search: globalFilter });
  const router = useRouter();

  const data = useMemo(() => {
    if (!ordersData?.data) return [];
    return ordersData.data.map(order => ({
      ...order,
      id: order.id || "---",
      userName: order.user?.name || "---",
      productName: order.product?.name || "---",
      category: order.category?.name || "---",
      requestType: order.type === 'update' ? "تحديث منتج" : "اضافة منتج جديد",
      requiredPoints: `${order.points || 0} نقطة`,
      date: order.created_at ? new Date(order.created_at).toLocaleDateString('en-GB') : "---",
      status: order.status === 'rejected' ? "تم رفضها" : order.status === 'pending' ? "قيد المعالجة" : "تم قبولها",
    }));
  }, [ordersData]);

  const handleRowClick = (row) => {
      router.push(`/orders/${row.id}`);
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
        accessorKey: "productName",
        header: "اسم المنتج",
        cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
      },
      {
        accessorKey: "category",
        header: "الفئة",
        cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
      },
      {
        accessorKey: "requestType",
        header: "نوع الطلب",
        cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
      },
      {
        accessorKey: "requiredPoints",
        header: "النقاط المكتسبة",
        cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
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
            if(status === "قيد المعالجة") styles = "bg-[#E0F2FE] text-[#0369A1] border-[#E0F2FE]";
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
    [router]
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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {/* Top Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
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
          <div className="flex gap-3 w-full md:w-auto">
             <div className="relative group">
                <button className="flex items-center gap-2 bg-[#EAEAEA] border border-transparent px-6 py-2 rounded-lg text-gray-700 text-sm font-medium">
                   <span>فلترة حسب :</span>
                </button>
             </div>
             <div className="relative group">
                <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 bg-white border-b border-gray-200 px-4 py-2 text-gray-600 text-sm hover:text-primary transition-colors"
                >
                   <span>كل الحالات</span>
                   <ChevronDown className="w-4 h-4" />
                </button>

                {/* Filter Popover */}
                {isFilterOpen && (
                    <div className="absolute top-full text-right mt-2 w-72 bg-[#F3F2F1] rounded-xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left left-0">
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
    </>
  );
}

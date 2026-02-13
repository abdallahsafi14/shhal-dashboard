"use client";
import React, { useMemo, useState, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ChevronDown, Edit2, Trash2, ChevronLeft, ChevronRight, Bitcoin, Filter, Check, XCircle } from "lucide-react";
import Image from "next/image";
import TransactionDetailsModal from "./TransactionDetailsModal";
import RedemptionStatusModal from "./RedemptionStatusModal";
import DeleteRedemptionModal from "./DeleteRedemptionModal";

import { usePoints } from "@/hooks/useDashboard";

export default function PointsTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [filterParams, setFilterParams] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const { data: pointsData, isLoading } = usePoints({ search: globalFilter, page: currentPage, ...filterParams });
  
  // Get pagination info from API (if available)
  const pagination = pointsData?.data?.pagination || {};
  const totalItems = pagination.total || 0;
  const perPage = pagination.per_page || 15;
  const lastPage = pagination.last_page || 1;
  const currentPageFromAPI = pagination.current_page || 1;

  // Sync currentPage with API response
  React.useEffect(() => {
    if (currentPageFromAPI && currentPageFromAPI !== currentPage) {
      setCurrentPage(currentPageFromAPI);
    }
  }, [currentPageFromAPI]);
  
  const data = useMemo(() => {
    // Handle new API structure: data.redemptions (array)
    const redemptions = pointsData?.data?.redemptions || [];
    return redemptions.map(item => ({
      ...item,
      id: item.id || "---",
      userName: item.user?.name || "---",
      pointsBalance: `${item.points || 0} نقطة`,
      financialValue: `${item.amount || 0} $`,
      paymentMethod: `${item.amount || 0} $`,
      date: item.created_at ? new Date(item.created_at).toLocaleDateString('en-GB') : "---",
      rawStatus: item.status,
      status: item.status === "completed" || item.status === "approved" ? "تم صرفها" : item.status === "pending" ? "قيد المعالجة" : "تم رفضها",
    }));
  }, [pointsData]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusModal, setStatusModal] = useState({ open: false, redemptionId: null, action: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, redemptionId: null });

  // Filter States
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPaymentMethod, setFilterPaymentMethod] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [filterSortBy, setFilterSortBy] = useState("created_at");
  const [filterSortOrder, setFilterSortOrder] = useState("desc");

  const handleFilterApply = () => {
    const filters = {};
    if (filterStatus) filters.status = filterStatus;
    if (filterPaymentMethod) filters.payment_method = filterPaymentMethod;
    if (filterDateFrom) filters.date_from = filterDateFrom;
    if (filterDateTo) filters.date_to = filterDateTo;
    if (filterSortBy) filters.sort_by = filterSortBy;
    if (filterSortOrder) filters.sort_order = filterSortOrder;
    setFilterParams(filters);
    setCurrentPage(1); // Reset to first page when filters change
    setIsFilterOpen(false);
  };

  const handleFilterReset = () => {
    setFilterStatus("");
    setFilterPaymentMethod("");
    setFilterDateFrom("");
    setFilterDateTo("");
    setFilterSortBy("created_at");
    setFilterSortOrder("desc");
    setFilterParams({});
    setCurrentPage(1); // Reset to first page
    setIsFilterOpen(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRowClick = useCallback((row) => {
    setSelectedTransaction(row);
    setIsDetailsModalOpen(true);
  }, []);

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
        cell: ({ row }) => {
          const raw = row.original;
          const id = raw.id;
          const isPending = raw.rawStatus === "pending";
          const isNumericId = typeof id === "number" || (typeof id === "string" && id !== "---" && !isNaN(Number(id)));
          return (
            <div className="flex items-center gap-2 justify-center" onClick={(e) => e.stopPropagation()}>
              {isNumericId && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteModal({ open: true, redemptionId: Number(id) });
                  }}
                  className="text-red-600 hover:text-red-700 transition-colors p-1"
                  title="حذف"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              {isPending && isNumericId && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setStatusModal({ open: true, redemptionId: Number(id), action: "reject" });
                    }}
                    className="text-red-600 hover:text-red-700 transition-colors p-1"
                    title="رفض"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setStatusModal({ open: true, redemptionId: Number(id), action: "approve" });
                    }}
                    className="text-green-600 hover:text-green-700 transition-colors p-1"
                    title="قبول"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRowClick(raw);
                }}
                className="text-[#0E3A53] hover:text-[#062b40] transition-colors p-1"
                title="تفاصيل"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          );
        },
      },
    ],
    [handleRowClick]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, // Use server-side pagination
    pageCount: lastPage,
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
                    className="flex items-center gap-2 bg-[#EAEAEA] border border-transparent px-6 py-2 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                   <span>فلترة حسب :</span>
                </button>

                {/* The Filter Popover (No Overlay) */}

             </div>

             <div className="relative group">
                <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg text-gray-600 text-sm hover:border-primary transition-colors"
                >
                   <span>{filterStatus ? (filterStatus === 'pending' ? 'قيد المعالجة' : filterStatus === 'approved' ? 'تم الموافقة' : 'تم الرفض') : 'كل الحالات'}</span>
                   <ChevronDown className="w-4 h-4" />
                </button>

                {/* Filter Popover */}
                {isFilterOpen && (
                    <div className="absolute top-full text-right mt-2 w-80 bg-[#F3F2F1] rounded-xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left left-0">
                        <div className="space-y-3">
                             {/* Status Filter */}
                             <div>
                                 <label className="text-xs font-bold text-gray-500 mb-1 block">فلترة حسب الحالة : pending, approved, rejected</label>
                                 <div className="relative">
                                    <select
                                      value={filterStatus}
                                      onChange={(e) => setFilterStatus(e.target.value)}
                                      className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-right focus:outline-none focus:border-primary"
                                    >
                                      <option value="">كل الحالات</option>
                                      <option value="pending">قيد المعالجة</option>
                                      <option value="approved">تم الموافقة</option>
                                      <option value="rejected">تم الرفض</option>
                                    </select>
                                 </div>
                             </div>

                             {/* Payment Method Filter */}
                             <div>
                                 <label className="text-xs font-bold text-gray-500 mb-1 block">فلترة حسب طريقة الدفع : BTC, LTC, XMR, BN...</label>
                                 <div className="relative">
                                    <input
                                      type="text"
                                      value={filterPaymentMethod}
                                      onChange={(e) => setFilterPaymentMethod(e.target.value)}
                                      placeholder="BTC, LTC, XMR..."
                                      className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-primary"
                                      dir="ltr"
                                    />
                                 </div>
                             </div>

                             {/* Date From Filter */}
                             <div>
                                 <label className="text-xs font-bold text-gray-500 mb-1 block">تاريخ البداية (YYYY-MM-DD) :</label>
                                 <div className="relative">
                                    <input
                                      type="date"
                                      value={filterDateFrom}
                                      onChange={(e) => setFilterDateFrom(e.target.value)}
                                      className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-primary"
                                      dir="ltr"
                                    />
                                 </div>
                             </div>

                             {/* Date To Filter */}
                             <div>
                                 <label className="text-xs font-bold text-gray-500 mb-1 block">تاريخ النهاية (YYYY-MM-DD) :</label>
                                 <div className="relative">
                                    <input
                                      type="date"
                                      value={filterDateTo}
                                      onChange={(e) => setFilterDateTo(e.target.value)}
                                      className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-primary"
                                      dir="ltr"
                                    />
                                 </div>
                             </div>

                             {/* Sort By Filter */}
                             <div>
                                 <label className="text-xs font-bold text-gray-500 mb-1 block">ترتيب حسب : created_at, points, amount, status...</label>
                                 <div className="relative">
                                    <select
                                      value={filterSortBy}
                                      onChange={(e) => setFilterSortBy(e.target.value)}
                                      className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-right focus:outline-none focus:border-primary"
                                    >
                                      <option value="created_at">تاريخ الإنشاء</option>
                                      <option value="points">النقاط</option>
                                      <option value="amount">المبلغ</option>
                                      <option value="status">الحالة</option>
                                    </select>
                                 </div>
                             </div>

                             {/* Sort Order Filter */}
                             <div>
                                 <label className="text-xs font-bold text-gray-500 mb-1 block">ترتيب : asc, desc</label>
                                 <div className="relative">
                                    <select
                                      value={filterSortOrder}
                                      onChange={(e) => setFilterSortOrder(e.target.value)}
                                      className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-right focus:outline-none focus:border-primary"
                                    >
                                      <option value="asc">تصاعدي</option>
                                      <option value="desc">تنازلي</option>
                                    </select>
                                 </div>
                             </div>

                             {/* Apply Filter Button */}
                             <div className="flex gap-2 pt-2">
                                <button 
                                  onClick={handleFilterApply}
                                  className="flex-1 bg-[#8B8A6C] hover:bg-[#7A795B] text-white font-bold py-2 rounded-lg transition-colors"
                                >
                                  فلترة
                                </button>
                                <button 
                                  onClick={handleFilterReset}
                                  className="px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 rounded-lg transition-colors"
                                >
                                  إعادة تعيين
                                </button>
                             </div>
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
                <span>
                  {totalItems > 0 ? ((currentPageFromAPI - 1) * perPage + 1) : 0}{" "}
                  -{" "}
                  {Math.min(currentPageFromAPI * perPage, totalItems)}{" "}
                  من {totalItems}
                </span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[#8B8A6C]">رقم السطر :</span>
                <div className="flex items-center gap-2 bg-[#8B8A6C] text-white px-2 py-1 rounded">
                  <span>{perPage}</span>
                  <ChevronDown className="w-3 h-3" />
                </div>
                <button
                  onClick={() => handlePageChange(currentPageFromAPI - 1)}
                  disabled={currentPageFromAPI <= 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#8B8A6C] text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handlePageChange(currentPageFromAPI + 1)}
                  disabled={currentPageFromAPI >= lastPage}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#8B8A6C] text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
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
        onApprove={(id) => {
          setIsDetailsModalOpen(false);
          setStatusModal({ open: true, redemptionId: id, action: "approve" });
        }}
        onReject={(id) => {
          setIsDetailsModalOpen(false);
          setStatusModal({ open: true, redemptionId: id, action: "reject" });
        }}
        onDelete={(id) => {
          setIsDetailsModalOpen(false);
          setDeleteModal({ open: true, redemptionId: id });
        }}
      />

      {/* Status (Approve/Reject) Modal */}
      <RedemptionStatusModal
        isOpen={statusModal.open}
        onClose={() => setStatusModal({ open: false, redemptionId: null, action: null })}
        redemptionId={statusModal.redemptionId}
        action={statusModal.action}
        onSuccess={() => setStatusModal({ open: false, redemptionId: null, action: null })}
      />

      {/* Delete Confirmation Modal */}
      <DeleteRedemptionModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, redemptionId: null })}
        redemptionId={deleteModal.redemptionId}
        onSuccess={() => setDeleteModal({ open: false, redemptionId: null })}
      />
    </>
  );
}

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
  const [filterParams, setFilterParams] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data: ordersData, isLoading } = useOrders({ search: globalFilter, page: currentPage, ...filterParams });
  const router = useRouter();
  
  // Get pagination info from API
  const pagination = ordersData?.data?.pagination || {};
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

  // Filter States
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [filterSortBy, setFilterSortBy] = useState("created_at");
  const [filterSortOrder, setFilterSortOrder] = useState("desc");
  const [filterPerPage, setFilterPerPage] = useState("15");

  const handleFilterApply = () => {
    const filters = {};
    if (filterStatus) filters.status = filterStatus;
    if (filterType) filters.type = filterType;
    if (filterDateFrom) filters.date_from = filterDateFrom;
    if (filterDateTo) filters.date_to = filterDateTo;
    if (filterSortBy) filters.sort_by = filterSortBy;
    if (filterSortOrder) filters.sort_order = filterSortOrder;
    if (filterPerPage) filters.per_page = filterPerPage;
    setFilterParams(filters);
    setCurrentPage(1); // Reset to first page when filters change
    setIsFilterOpen(false);
  };

  const handleFilterReset = () => {
    setFilterStatus("");
    setFilterType("");
    setFilterDateFrom("");
    setFilterDateTo("");
    setFilterSortBy("created_at");
    setFilterSortOrder("desc");
    setFilterPerPage("15");
    setFilterParams({});
    setCurrentPage(1); // Reset to first page
    setIsFilterOpen(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Scroll to top of table
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const data = useMemo(() => {
    // Handle new API structure: data.data.data (array) and data.data.pagination
    const orders = ordersData?.data?.data || ordersData?.data || [];
    return orders.map(order => ({
      ...order,
      id: order.id || "---",
      submissionNumber: order.submission_number || "---",
      userName: order.user_name || "---",
      productName: order.product_name || "---",
      category: order.category_name || "---",
      requestType: order.type || "---", // Already in Arabic from API
      requiredPoints: `${order.points || 0} نقطة`,
      date: order.created_at ? new Date(order.created_at).toLocaleDateString('en-GB') : "---",
      status: order.status === 'rejected' ? "تم رفضها" : order.status === 'pending' ? "قيد المعالجة" : "تم قبولها",
      statusValue: order.status, // Keep original status value for filtering
    }));
  }, [ordersData]);

  const handleRowClick = (row) => {
      router.push(`/orders/${row.id}`);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "submissionNumber",
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
    manualPagination: true, // Use server-side pagination
    pageCount: lastPage,
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
                                 <label className="text-xs font-bold text-gray-500 mb-1 block">pending, approved, rejected</label>
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

                             {/* Type Filter */}
                             <div>
                                 <label className="text-xs font-bold text-gray-500 mb-1 block">create, update</label>
                                 <div className="relative">
                                    <select
                                      value={filterType}
                                      onChange={(e) => setFilterType(e.target.value)}
                                      className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-right focus:outline-none focus:border-primary"
                                    >
                                      <option value="">كل الأنواع</option>
                                      <option value="create">إضافة منتج جديد</option>
                                      <option value="update">تحديث منتج</option>
                                    </select>
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
                                 <label className="text-xs font-bold text-gray-500 mb-1 block">حقل الترتيب :</label>
                                 <div className="relative">
                                    <select
                                      value={filterSortBy}
                                      onChange={(e) => setFilterSortBy(e.target.value)}
                                      className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-right focus:outline-none focus:border-primary"
                                    >
                                      <option value="created_at">تاريخ الإنشاء</option>
                                      <option value="updated_at">تاريخ التحديث</option>
                                      <option value="points">النقاط</option>
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

                             {/* Per Page Filter */}
                             <div>
                                 <label className="text-xs font-bold text-gray-500 mb-1 block">عدد النتائج في الصفحة :</label>
                                 <div className="relative">
                                    <input
                                      type="number"
                                      value={filterPerPage}
                                      onChange={(e) => setFilterPerPage(e.target.value)}
                                      className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-center focus:outline-none focus:border-primary"
                                      dir="ltr"
                                      min="1"
                                    />
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
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length} className="py-8 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B8A6C]"></div>
                      <span className="mr-2 text-gray-500">جاري التحميل...</span>
                    </div>
                  </td>
                </tr>
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="py-8 text-center text-gray-500">
                    لا توجد طلبات متاحة
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
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
                ))
              )}
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
    </>
  );
}

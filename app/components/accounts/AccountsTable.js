"use client";
import React, { useMemo, useState, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ChevronDown, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import UserDetailsModal from "./UserDetailsModal";

import { useUsers, useUserActions } from "@/hooks/useDashboard";

export default function AccountsTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [filterParams, setFilterParams] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const { data: usersData, isLoading } = useUsers({ search: globalFilter, page: currentPage, ...filterParams });
  const { deleteUser } = useUserActions();

  // Pagination info from API
  const pagination = usersData?.data?.pagination || {};
  const totalItems = pagination.total || 0;
  const perPage = pagination.per_page || 15;
  const lastPage = pagination.last_page || 1;
  const currentPageFromAPI = pagination.current_page || 1;

  React.useEffect(() => {
    if (currentPageFromAPI && currentPageFromAPI !== currentPage) {
      setCurrentPage(currentPageFromAPI);
    }
  }, [currentPageFromAPI]);

  const data = useMemo(() => {
    const users = usersData?.data?.data || usersData?.data || [];
    return users.map(user => ({
      ...user,
      id: user.id || "---",
      name: `${user.first_name || ""} ${user.last_name || ""}`.trim() || "---",
      avatar: user.avatar || "/icons/Logo.png",
      phone: user.phone || "---",
      email: user.email || "---",
      date: user.created_at ? new Date(user.created_at).toLocaleDateString("en-GB") : "---",
      displayStatus: user.status === "active" ? "نشط" : "متوقف",
    }));
  }, [usersData]);

  /* Modal State */
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  /* Filter State */
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterSortBy, setFilterSortBy] = useState("created_at");
  const [filterSortOrder, setFilterSortOrder] = useState("desc");

  const handleFilterApply = () => {
    const filters = {};
    if (filterStatus) filters.status = filterStatus;
    if (filterRole) filters.role = filterRole;
    if (filterSortBy) filters.sort_by = filterSortBy;
    if (filterSortOrder) filters.sort_order = filterSortOrder;
    setFilterParams(filters);
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  const handleFilterReset = () => {
    setFilterStatus("");
    setFilterRole("");
    setFilterSortBy("created_at");
    setFilterSortOrder("desc");
    setFilterParams({});
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRowClick = useCallback((row) => {
    setSelectedUserId(row.original.id);
    setIsDetailsModalOpen(true);
  }, []);

  const handleEditClick = () => {
    if (selectedUserId) {
      const user = data.find(u => u.id === selectedUserId);
      if (user) {
        setSelectedRow(user);
        setIsDetailsModalOpen(false);
        setIsEditModalOpen(true);
      }
    }
  };

  const handleEditFromTable = (row, e) => {
    e.stopPropagation();
    setSelectedRow(row);
    setIsEditModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedRow?.id) {
       deleteUser(selectedRow.id);
       setIsDeleteModalOpen(false);
    }
  };

  const handleDeleteClick = (row, e) => {
      e.stopPropagation();
      setSelectedRow(row);
      setIsDeleteModalOpen(true);
  };

  // Build filter button label
  const getFilterLabel = () => {
    const parts = [];
    if (filterStatus) parts.push(filterStatus === "active" ? "نشط" : "متوقف");
    if (filterRole) parts.push(filterRole === "admin" ? "مدير" : "مستخدم");
    return parts.length > 0 ? parts.join(" / ") : "كل الحالات";
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => <span className="font-semibold text-gray-700">{info.getValue()}</span>,
      },
      {
        accessorKey: "name",
        header: "اسم المستخدم",
        cell: (info) => (
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative">
                 <Image src={info.row.original.avatar} alt="avatar" fill className="object-cover" />
             </div>
             <span className="font-medium text-gray-800">{info.getValue()}</span>
          </div>
        ),
      },
      {
        accessorKey: "phone",
        header: "رقم الهاتف",
        cell: (info) => <span className="text-gray-600 dir-ltr text-right">{info.getValue()}</span>,
      },
      {
        accessorKey: "email",
        header: "البريد الإلكتروني",
        cell: (info) => <span className="text-gray-500">{info.getValue()}</span>,
      },
      {
        accessorKey: "date",
        header: "تاريخ الإضافة",
        cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
      },
      {
        accessorKey: "displayStatus",
        header: "الحالة",
        cell: (info) => {
          const status = info.getValue();
          const isActive = status === "نشط";
          return (
            <span
              className={`px-4 py-1 rounded-md text-xs font-bold ${
                isActive
                  ? "bg-green-100 text-green-600"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              {status}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "", 
        cell: ({ row }) => (
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button 
                onClick={(e) => handleDeleteClick(row.original, e)}
                className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button 
                onClick={(e) => handleEditFromTable(row.original, e)}
                className="text-gray-400 hover:text-blue-500 transition-colors"
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
    manualPagination: true,
    pageCount: lastPage,
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {/* Top Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 relative z-20">
          {/* Right Side: Search */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="ابحث هنا ...."
              className="w-full bg-white border-b border-gray-200 py-2 px-2 text-right focus:outline-none focus:border-primary text-sm"
            />
          </div>
          {/* Left Side: Filters */}
          <div className="flex gap-3 w-full md:w-auto items-center">
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
                   <span>{getFilterLabel()}</span>
                   <ChevronDown className="w-4 h-4" />
                </button>

                {/* Filter Popover */}
                {isFilterOpen && (
                    <div className="absolute top-full text-right mt-2 w-80 bg-[#F3F2F1] rounded-xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left left-0">
                        <div className="space-y-3">
                             {/* Status Filter */}
                             <div>
                                 <label className="text-xs font-bold text-gray-500 mb-1 block">فلترة حسب الحالة :</label>
                                 <div className="relative">
                                    <select
                                      value={filterStatus}
                                      onChange={(e) => setFilterStatus(e.target.value)}
                                      className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-right focus:outline-none focus:border-primary"
                                    >
                                      <option value="">كل الحالات</option>
                                      <option value="active">نشط</option>
                                      <option value="suspended">متوقف</option>
                                    </select>
                                 </div>
                             </div>

                             {/* Role Filter */}
                             <div>
                                 <label className="text-xs font-bold text-gray-500 mb-1 block">فلترة حسب الدور :</label>
                                 <div className="relative">
                                    <select
                                      value={filterRole}
                                      onChange={(e) => setFilterRole(e.target.value)}
                                      className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-right focus:outline-none focus:border-primary"
                                    >
                                      <option value="">كل الأدوار</option>
                                      <option value="user">مستخدم</option>
                                      <option value="admin">مدير</option>
                                    </select>
                                 </div>
                             </div>

                             {/* Sort By Filter */}
                             <div>
                                 <label className="text-xs font-bold text-gray-500 mb-1 block">ترتيب حسب :</label>
                                 <div className="relative">
                                    <select
                                      value={filterSortBy}
                                      onChange={(e) => setFilterSortBy(e.target.value)}
                                      className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-right focus:outline-none focus:border-primary"
                                    >
                                      <option value="created_at">تاريخ الإنشاء</option>
                                      <option value="first_name">الاسم</option>
                                      <option value="email">البريد الإلكتروني</option>
                                      <option value="status">الحالة</option>
                                    </select>
                                 </div>
                             </div>

                             {/* Sort Order Filter */}
                             <div>
                                 <label className="text-xs font-bold text-gray-500 mb-1 block">ترتيب :</label>
                                 <div className="relative">
                                    <select
                                      value={filterSortOrder}
                                      onChange={(e) => setFilterSortOrder(e.target.value)}
                                      className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-right focus:outline-none focus:border-primary"
                                    >
                                      <option value="desc">تنازلي (الأحدث أولاً)</option>
                                      <option value="asc">تصاعدي (الأقدم أولاً)</option>
                                    </select>
                                 </div>
                             </div>

                             {/* Apply / Reset */}
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
                      className="py-4 px-4 text-right text-sm font-medium first:rounded-tr-lg last:rounded-tl-lg"
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
                    لا يوجد مستخدمون متاحون
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr 
                    key={row.id} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleRowClick(row)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="py-4 px-4 text-sm whitespace-nowrap">
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
      
      {/* Modals */}
      <UserDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedUserId(null);
        }}
        userId={selectedUserId}
        onEditClick={handleEditClick}
      />
      <EditUserModal 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedRow(null);
        }}
        user={selectedRow}
      />
      <DeleteUserModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedRow(null);
        }}
        onConfirm={handleDeleteConfirm}
        user={selectedRow}
      />
    </>
  );
}

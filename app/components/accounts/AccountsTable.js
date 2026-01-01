"use client";
import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Search, ChevronDown, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";

import { useUsers, useUserActions } from "@/hooks/useDashboard";

export default function AccountsTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: usersData, isLoading } = useUsers({ search: globalFilter });
  const { deleteUser } = useUserActions();
  
  const data = useMemo(() => {
    if (!usersData?.data) return [];
    return usersData.data.map(user => ({
      ...user,
      id: user.id || "---",
      name: user.name || "---",
      avatar: user.avatar || "/icons/Logo.png",
      phone: user.phone || "---",
      email: user.email || "---",
      date: user.created_at ? new Date(user.created_at).toLocaleDateString('en-GB') : "---",
      status: user.status === 'active' ? "نشط" : "متوقف",
    }));
  }, [usersData]);

  /* Modal State */
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setIsEditModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedRow?.id) {
       deleteUser(selectedRow.id);
       setIsDeleteModalOpen(false);
    }
  };

  const handleDeleteClick = (row) => {
      setSelectedRow(row);
      setIsDeleteModalOpen(true);
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
        accessorKey: "status",
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
          <div className="flex items-center gap-2">
            <button 
                onClick={() => handleDeleteClick(row.original)}
                className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button 
                onClick={() => handleEditClick(row.original)}
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
              placeholder="ابحث هنا ...."
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
                                        <span>نشط / متوقف</span>
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
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-4 px-4 text-sm whitespace-nowrap">
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
      
      {/* Modals */}
      <EditUserModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      <DeleteUserModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}

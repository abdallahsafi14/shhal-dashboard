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
import Image from "next/image";
import EditCategoryModal from "./EditCategoryModal";

import { useCategories, useCategoryActions } from "@/hooks/useDashboard";

export default function CategoriesTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: categoriesData, isLoading } = useCategories({ search: globalFilter });
  const { deleteCategory } = useCategoryActions();

  const data = useMemo(() => {
    if (!categoriesData?.data) return [];
    return categoriesData.data.map(cat => ({
      ...cat,
      id: cat.id || "---",
      mainName: cat.name || "---",
      image: cat.image || "/icons/Logo.png",
      order: cat.priority || 0,
      subCategories: cat.sub_categories?.map(sc => sc.name) || [],
      dateAdded: cat.created_at ? new Date(cat.created_at).toLocaleDateString('en-GB') : "---",
      status: cat.status === 'active' ? "فئة مفعلة" : "غير مفعلة",
    }));
  }, [categoriesData]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الفئة؟')) {
      deleteCategory(id);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => <span className="font-semibold text-gray-700">{info.getValue()}</span>,
      },
      {
        accessorKey: "mainName",
        header: "اسم الفئة الرئيسية",
        cell: (info) => <span className="font-bold text-[#0E3A53]">{info.getValue()}</span>,
      },
      {
        accessorKey: "image",
        header: "صورة الفئة",
        cell: (info) => (
          <div className="relative w-10 h-10 mx-auto rounded-lg overflow-hidden bg-gray-50 border border-gray-100 p-1">
            <Image src={info.getValue()} alt="cat" fill className="object-contain grayscale" />
          </div>
        ),
      },
      {
        accessorKey: "order",
        header: "ترتيب الفئة",
        cell: (info) => <span className="text-gray-600 font-bold">{info.getValue()}</span>,
      },
      {
        accessorKey: "subCategories",
        header: "اسم الفئات الفرعية التابعة لها",
        cell: (info) => (
          <div className="flex items-center gap-2 justify-center">
            {info.getValue().map((name, i) => (
              <span
                key={i}
                className={`px-4 py-1 rounded-md text-[10px] font-bold ${
                  i === 0
                    ? "bg-[#FFDFE0] text-[#E56A70]"
                    : "bg-[#EBDFFB] text-[#8659C9]"
                }`}
              >
                {name}
              </span>
            ))}
            <span className="text-[12px] text-gray-500 font-bold">+ 46 أخرى</span>
          </div>
        ),
      },
      {
        accessorKey: "dateAdded",
        header: "تاريخ الاضافة",
        cell: (info) => <span className="text-gray-600 dir-ltr text-right">{info.getValue()}</span>,
      },
      {
        id: "status",
        header: "حالة الفئة",
        cell: ({ row }) => {
          const status = row.original.status;
          let styles = "bg-[#D1FAE5] text-[#059669] border-[#D1FAE5]";
          if (status === "غير مفعلة") styles = "bg-[#E0F2FE] text-[#0369A1] border-[#E0F2FE]";

          return (
            <span className={`px-4 py-1.5 rounded-md text-[10px] font-bold border ${styles} block w-fit mx-auto`}>
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
              onClick={() => handleDeleteClick(row.original.id)}
              className="text-[#0E3A53] hover:text-[#062b40] transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleEditClick(row.original)}
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
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="ابحث هنا ......"
              className="w-full bg-white border-b border-gray-200 py-2 px-2 text-right focus:outline-none focus:border-primary text-sm"
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative group">
              <button className="flex items-center gap-2 bg-[#EAEAEA] border border-transparent px-6 py-2 rounded-lg text-gray-700 text-sm font-medium">
                <span>فلترة حسب :</span>
              </button>
            </div>

            {/* ✅ FIXED FILTER WRAPPER */}
            <div className="relative group">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 bg-white border-b border-gray-200 px-4 py-2 text-gray-600 text-sm hover:text-primary transition-colors"
              >
                <span>كل الحالات</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isFilterOpen && (
                <div className="absolute top-full left-0 text-right mt-2 w-72 bg-[#F3F2F1] rounded-xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left">
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">
                        التاريخ حسب التاريخ :
                      </label>
                      <button className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-gray-500 flex justify-between items-center text-right">
                        <span>اختار التاريخ الذي تريده....</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">
                        الفلترة حسب الحالة :
                      </label>
                      <button className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-gray-500 flex justify-between items-center text-right">
                        <span>نشط / غير مفعل</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">
                        الفلترة حسب الترتيب :
                      </label>
                      <button className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-gray-500 flex justify-between items-center text-right">
                        <span>الترتيب من الأحدث للأقدم..</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    <button className="w-full bg-[#8B8A6C] hover:bg-[#7A795B] text-white font-bold py-2 rounded-lg mt-2 transition-colors">
                      فلترة
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-t-lg">
          <table className="w-full">
            <thead className="bg-[#8B8A6C] text-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="py-4 px-4 text-center text-sm font-medium first:rounded-tr-lg last:rounded-tl-lg">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
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

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
            <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                <span>1 - 10 of 460</span>
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

      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        category={selectedCategory}
      />
    </>
  );
}

"use client";
import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  ChevronDown,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import EditSubCategoryModal from "./EditSubCategoryModal";
import { useSubCategories, useSubCategoriesByCategory, useSubCategoryActions } from "@/hooks/useDashboard";

export default function SubCategoriesTable({ selectedCategoryId }) {
  const [globalFilter, setGlobalFilter] = useState("");
  
  // Use different endpoint based on whether category is selected
  const { data: subCategoriesByCategoryData, isLoading: isLoadingByCategory } = useSubCategoriesByCategory(selectedCategoryId);
  const { data: subCategoriesData, isLoading: isLoadingAll } = useSubCategories({
    search: globalFilter,
  });
  
  const subCategoriesDataFinal = selectedCategoryId ? subCategoriesByCategoryData : subCategoriesData;
  const isLoading = selectedCategoryId ? isLoadingByCategory : isLoadingAll;
  
  const { deleteSubCategory } = useSubCategoryActions();

  const data = useMemo(() => {
    if (!subCategoriesDataFinal?.data) return [];
    
    // Filter by search term if provided
    let filtered = subCategoriesDataFinal.data;
    if (globalFilter && !selectedCategoryId) {
      filtered = filtered.filter(
        (subCat) =>
          subCat.name?.toLowerCase().includes(globalFilter.toLowerCase()) ||
          subCat.category?.name?.toLowerCase().includes(globalFilter.toLowerCase())
      );
    }
    
    return filtered.map((subCat) => ({
      ...subCat,
      id: subCat.id || "---",
      name: subCat.name || "---",
      categoryName: subCat.category?.name || "---",
      dateAdded: subCat.created_at
        ? new Date(subCat.created_at).toLocaleDateString("en-GB")
        : "---",
    }));
  }, [subCategoriesDataFinal, globalFilter, selectedCategoryId]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleEditClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الفئة الفرعية؟")) {
      deleteSubCategory(id);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => (
          <span className="font-semibold text-gray-700">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "categoryName",
        header: "اسم الفئة الرئيسية",
        cell: (info) => (
          <span className="font-bold text-[#0E3A53]">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "name",
        header: "اسم الفئة الفرعية",
        cell: (info) => (
          <span className="font-bold text-gray-800">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "dateAdded",
        header: "تاريخ الاضافة",
        cell: (info) => (
          <span className="text-gray-600 dir-ltr text-right">
            {info.getValue()}
          </span>
        ),
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
    state: { globalFilter: selectedCategoryId ? "" : globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableGlobalFilter: !selectedCategoryId,
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
                        الفلترة حسب الفئة :
                      </label>
                      <button className="w-full bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-gray-500 flex justify-between items-center text-right">
                        <span>اختر الفئة...</span>
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
                      <span className="mr-2 text-gray-500">
                        جاري التحميل...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-8 text-center text-gray-500"
                  >
                    لا توجد فئات فرعية متاحة
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="py-4 px-4 text-sm text-center whitespace-nowrap"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
          <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
            <span>
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}{" "}
              -{" "}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                data.length
              )}{" "}
              من {data.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#8B8A6C]">رقم السطر :</span>
            <div className="flex items-center gap-2 bg-[#8B8A6C] text-white px-2 py-1 rounded">
              <span>{table.getState().pagination.pageSize}</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#8B8A6C] text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#8B8A6C] text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <EditSubCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        subCategory={selectedSubCategory}
      />
    </>
  );
}

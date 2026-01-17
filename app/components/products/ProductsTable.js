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
import Image from "next/image";

import { useProducts, useProductActions } from "@/hooks/useDashboard";

export default function ProductsTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: productsData, isLoading } = useProducts({
    search: globalFilter,
  });
  const { deleteProduct } = useProductActions();

  const data = useMemo(() => {
    if (!productsData?.data) return [];
    return productsData.data.map((product) => ({
      ...product,
      id: product.id || "---",
      nameAr: product.name_ar || "---",
      nameEn: product.name_en || "---",
      barcode: product.barcode || "---",
      category: product.category?.name || "---",
      subCategory: product.sub_category?.name || "---",
      price: product.branches?.[0]?.pivot?.price || "---",
      images: product.images || [],
      variants: product.variants || [],
      dateAdded: product.created_at
        ? new Date(product.created_at).toLocaleDateString("en-GB")
        : "---",
      status: product.category?.status === "active" ? "منتج مفعل" : "غير مفعل",
    }));
  }, [productsData]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleDeleteClick = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      deleteProduct(id);
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
        accessorKey: "nameAr",
        header: "اسم المنتج (عربي)",
        cell: (info) => (
          <span className="font-bold text-[#0E3A53]">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "nameEn",
        header: "اسم المنتج (إنجليزي)",
        cell: (info) => (
          <span className="text-gray-600">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "barcode",
        header: "الباركود",
        cell: (info) => (
          <span className="font-mono text-sm text-gray-500">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "category",
        header: "الفئة",
        cell: (info) => (
          <span className="text-gray-700">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "subCategory",
        header: "الفئة الفرعية",
        cell: (info) => (
          <span className="text-gray-700">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "price",
        header: "السعر",
        cell: (info) => (
          <span className="font-semibold text-green-600">
            {info.getValue()} ل.س
          </span>
        ),
      },
      {
        accessorKey: "images",
        header: "الصور",
        cell: (info) => (
          <div className="flex gap-1">
            {info.getValue().length > 0 ? (
              info
                .getValue()
                .slice(0, 3)
                .map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-8 h-8 rounded overflow-hidden bg-gray-50 border border-gray-100"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${img.image_path}`}
                      alt="product"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))
            ) : (
              <span className="text-gray-400 text-sm">لا توجد صور</span>
            )}
          </div>
        ),
      },
      {
        accessorKey: "variants",
        header: "المتغيرات",
        cell: (info) => (
          <div className="flex flex-wrap gap-1">
            {info
              .getValue()
              .slice(0, 2)
              .map((variant, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                >
                  {variant.attribute_key}: {variant.attribute_value}
                </span>
              ))}
            {info.getValue().length > 2 && (
              <span className="text-xs text-gray-500">
                +{info.getValue().length - 2}
              </span>
            )}
          </div>
        ),
      },
      {
        accessorKey: "dateAdded",
        header: "تاريخ الإضافة",
        cell: (info) => (
          <span className="text-gray-600">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "الحالة",
        cell: (info) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              info.getValue() === "منتج مفعل"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {info.getValue()}
          </span>
        ),
      },
      {
        id: "actions",
        header: "الإجراءات",
        cell: (info) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleDeleteClick(info.row.original.id)}
              className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
              title="حذف"
            >
              <Trash2 className="w-4 h-4" />
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
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0E3A53]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">إدارة المنتجات</h2>
          <div className="flex gap-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="البحث في المنتجات..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0E3A53] focus:border-transparent w-64"
              />
              <svg
                className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-right text-sm font-semibold text-gray-600"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
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
                  <td
                    key={cell.id}
                    className="px-6 py-4 text-right text-sm text-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            عرض{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{" "}
            إلى{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            من أصل {table.getFilteredRowModel().rows.length} منتج
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-600">
              صفحة {table.getState().pagination.pageIndex + 1} من{" "}
              {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

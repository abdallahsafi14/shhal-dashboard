"use client";
import React, { useState } from "react";
import SubCategoryStatsCards from "@/app/components/sub-categories/SubCategoryStatsCards";
import SubCategoriesTable from "@/app/components/sub-categories/SubCategoriesTable";
import AddSubCategoryModal from "@/app/components/sub-categories/AddSubCategoryModal";
import { useCategories } from "@/hooks/useDashboard";

export default function SubCategoriesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const { data: categoriesData } = useCategories();

  const categories = categoriesData?.data || [];

  return (
    <div className="space-y-8">
      {/* Page Header Section */}
      <div className="flex justify-between items-start">
        <div className="text-right">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            لوحة تحكم إدارة الفئات الفرعية
          </h2>
          <p className="text-gray-500 text-sm max-w-md ml-auto">
            قم بإدارة الفئات الفرعية. اختر الفئة الرئيسية لعرض فئاتها الفرعية،
            أو انقر على زر الإضافة لإضافة فئة فرعية جديدة.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#0E3A53] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#062b40] transition-all shadow-lg active:scale-95"
        >
          أضف فئة فرعية
        </button>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="relative">
          <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53]">
            اختر الفئة الرئيسية (اختياري)
          </label>
          <select
            value={selectedCategoryId || ""}
            onChange={(e) =>
              setSelectedCategoryId(
                e.target.value ? parseInt(e.target.value) : null
              )
            }
            className="w-full border border-gray-300 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary transition-colors h-14"
            dir="rtl"
          >
            <option value="">عرض جميع الفئات الفرعية</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      {/* <SubCategoryStatsCards selectedCategoryId={selectedCategoryId} /> */}

      {/* Data Table */}
      <SubCategoriesTable selectedCategoryId={selectedCategoryId} />

      {/* Add Sub-Category Modal */}
      <AddSubCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}

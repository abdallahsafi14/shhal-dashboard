"use client";
import React, { useState } from "react";
import CategoryStatsCards from "@/app/components/categories/CategoryStatsCards";
import CategoriesTable from "@/app/components/categories/CategoriesTable";
import AddCategoryModal from "@/app/components/categories/AddCategoryModal";

export default function CategoriesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Page Header Section */}
      <div className="flex justify-between items-start">
        <div className="text-right">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">لوحة تحكم إدارة الفئات</h2>
          <p className="text-gray-500 text-sm max-w-md ml-auto">
             قم بإدارة فئاتك وفئاتها الفرعية . انقر على أيقونة علامة الجمع لإضافة فئات فرعية، أو استخدم زري التعديل والحذف لتعديل الفئات الموجودة.
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#0E3A53] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#062b40] transition-all shadow-lg active:scale-95"
        >
          أضف فئة
        </button>
      </div>

      {/* Stats Cards */}
      <CategoryStatsCards />

      {/* Data Table */}
      <CategoriesTable />

      {/* Add Category Modal */}
      <AddCategoryModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  );
}

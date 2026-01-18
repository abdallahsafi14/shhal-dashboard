"use client";
import React, { useState } from "react";
import StoreStatsCards from "@/app/components/stores/StoreStatsCards";
import StoresTable from "@/app/components/stores/StoresTable";
import AddStoreModal from "@/app/components/stores/AddStoreModal";

export default function StoresPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Page Header Section */}
      <div className="flex justify-between items-start">
        <div className="text-right">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            لوحة تحكم إدارة المتاجر
          </h2>
          <p className="text-gray-500 text-sm max-w-md ml-auto">
            قم بإدارة المتاجر والفروع. انقر على زر الإضافة لإضافة متجر جديد،
            أو استخدم زري التعديل والحذف لتعديل المتاجر الموجودة.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#0E3A53] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#062b40] transition-all shadow-lg active:scale-95"
        >
          أضف متجر
        </button>
      </div>

      {/* Stats Cards */}
      <StoreStatsCards />

      {/* Data Table */}
      <StoresTable />

      {/* Add Store Modal */}
      <AddStoreModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}

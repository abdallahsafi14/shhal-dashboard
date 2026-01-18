"use client";
import React, { useState } from "react";
import BranchStatsCards from "@/app/components/branches/BranchStatsCards";
import BranchesTable from "@/app/components/branches/BranchesTable";
import AddBranchModal from "@/app/components/branches/AddBranchModal";
import { useStores } from "@/hooks/useDashboard";

export default function BranchesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const { data: storesData } = useStores();

  const stores = storesData?.data || [];

  return (
    <div className="space-y-8">
      {/* Page Header Section */}
      <div className="flex justify-between items-start">
        <div className="text-right">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            لوحة تحكم إدارة الفروع
          </h2>
          <p className="text-gray-500 text-sm max-w-md ml-auto">
            قم بإدارة فروع المتاجر. اختر المتجر لعرض فروعه، أو انقر على زر
            الإضافة لإضافة فرع جديد.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#0E3A53] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#062b40] transition-all shadow-lg active:scale-95"
        >
          أضف فرع
        </button>
      </div>

      {/* Store Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="relative">
          <label className="absolute -top-3 right-4 bg-white px-1 text-sm font-bold text-[#0E3A53]">
            اختر المتجر (اختياري)
          </label>
          <select
            value={selectedStoreId || ""}
            onChange={(e) =>
              setSelectedStoreId(
                e.target.value ? parseInt(e.target.value) : null
              )
            }
            className="w-full border border-gray-300 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary transition-colors h-14"
            dir="rtl"
          >
            <option value="">عرض جميع الفروع</option>
            {stores.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <BranchStatsCards selectedStoreId={selectedStoreId} />

      {/* Data Table */}
      <BranchesTable selectedStoreId={selectedStoreId} />

      {/* Add Branch Modal */}
      <AddBranchModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}

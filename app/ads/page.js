"use client";
import React, { useState } from "react";
import AdsStatsCards from "../components/AdsStatsCards";
import AdsTable from "../components/AdsTable";
import AddAdModal from "../components/AddAdModal";

export default function AdsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Page Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Right Side: Titles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">لوحة تحكم إدارة الإعلانات</h2>
          <p className="text-gray-500 text-sm">إدارة الإعلانات وامكانية التعديل عليها</p>
        </div>

        {/* Left Side: Add Button */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#0E3A53] hover:bg-[#062b40] text-white px-8 py-3 rounded-lg font-bold shadow-sm transition-colors"
        >
          <span>أضف إعلان</span>
        </button>
      </div>

      {/* Stats Cards */}
      <AdsStatsCards />

      {/* Data Table */}
      <AdsTable />

      {/* Modals */}
      <AddAdModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

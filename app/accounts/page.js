"use client";
import React, { useState } from "react";
import { UserPlus } from "lucide-react";
import AccountStatsCards from "../components/accounts/AccountStatsCards";
import AccountsTable from "../components/accounts/AccountsTable";
import AddUserModal from "../components/accounts/AddUserModal";

export default function AccountsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Page Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Right Side: Titles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">لوحة تحكم إدارة الأعضاء</h2>
          <p className="text-gray-500 text-sm">إدارة الأعضاء ومنحهم الصلاحيات اللازمة لأداء مهامهم</p>
        </div>

        {/* Left Side: Add Button */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary hover:bg-[#062b40] text-white px-6 py-3 rounded-lg font-bold shadow-sm transition-colors"
        >
          <UserPlus className="w-5 h-5" />
          <span>أضف مستخدم</span>
        </button>
      </div>

      {/* Stats Cards */}
      <AccountStatsCards />

      {/* Data Table */}
      <AccountsTable />

      {/* Modals */}
      <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

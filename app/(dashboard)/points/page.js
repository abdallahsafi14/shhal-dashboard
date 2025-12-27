"use client";
import React from "react";
import PointsStatsCards from "@/app/components/points/PointsStatsCards";
import PointsTable from "@/app/components/points/PointsTable";

export default function PointsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">لوحة تحكم إدارة صرف النقاط</h2>
          <p className="text-gray-500 text-sm">إدارة الإعلانات وامكانية التعديل عليها</p>
        </div>

      {/* Stats Cards */}
      <PointsStatsCards />

      {/* Data Table */}
      <PointsTable />

    </div>
  );
}

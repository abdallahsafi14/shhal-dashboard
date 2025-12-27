"use client";
import React from "react";
import OrdersStatsCards from "@/app/components/orders/OrdersStatsCards";
import OrdersTable from "@/app/components/orders/OrdersTable";

export default function OrdersPage() {
  return (
    <div className="space-y-8">
      {/* Page Header Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">لوحة تحكم إدارة الطلبات</h2>
          <p className="text-gray-500 text-sm">إدارة الإعلانات وامكانية التعديل عليها</p>
        </div>

      {/* Stats Cards */}
      <OrdersStatsCards />

      {/* Data Table */}
      <OrdersTable />

    </div>
  );
}

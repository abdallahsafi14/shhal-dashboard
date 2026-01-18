"use client";
import React from "react";
import { MapPin, Store, Clock, TrendingUp } from "lucide-react";
import { useBranches, useBranchesByStore } from "@/hooks/useDashboard";

export default function BranchStatsCards({ selectedStoreId }) {
  const { data: branchesByStoreData, isLoading: isLoadingByStore } = useBranchesByStore(selectedStoreId);
  const { data: branchesData, isLoading: isLoadingAll } = useBranches();
  
  const branchesDataFinal = selectedStoreId ? branchesByStoreData : branchesData;
  const isLoading = selectedStoreId ? isLoadingByStore : isLoadingAll;

  const branches = branchesDataFinal?.data || [];
  const totalBranches = branches.length;
  const totalStores = new Set(branches.map((branch) => branch.store_id)).size;
  const newBranches = branches.filter(
    (branch) =>
      new Date(branch.created_at) >
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

  const stats = [
    {
      title: "إجمالي الفروع",
      value: totalBranches,
      icon: MapPin,
      color: "bg-gray-100 text-gray-500",
    },
    {
      title: "عدد المتاجر",
      value: totalStores,
      icon: Store,
      color: "bg-blue-100 text-blue-500",
    },
    {
      title: "فروع جديدة",
      value: newBranches,
      icon: Clock,
      color: "bg-orange-100 text-orange-500",
    },
    {
      title: "متوسط الفروع",
      value: totalStores > 0 ? Math.round(totalBranches / totalStores) : 0,
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden"
        >
          <div className="flex justify-between items-center mb-4">
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
          <div className="text-right mt-2">
            <h3 className="text-3xl font-bold text-gray-800 mb-1">
              {isLoading ? "..." : stat.value}
            </h3>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

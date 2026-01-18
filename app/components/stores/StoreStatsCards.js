"use client";
import React from "react";
import { Store, MapPin, TrendingUp, Clock } from "lucide-react";
import { useStores } from "@/hooks/useDashboard";

export default function StoreStatsCards() {
  const { data: storesData, isLoading } = useStores();

  const stores = storesData?.data || [];
  const totalStores = stores.length;
  const totalBranches = stores.reduce(
    (sum, store) => sum + (store.branches?.length || 0),
    0
  );
  const newStores = stores.filter(
    (store) =>
      new Date(store.created_at) >
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

  const stats = [
    {
      title: "إجمالي المتاجر",
      value: totalStores,
      icon: Store,
      color: "bg-gray-100 text-gray-500",
    },
    {
      title: "إجمالي الفروع",
      value: totalBranches,
      icon: MapPin,
      color: "bg-blue-100 text-blue-500",
    },
    {
      title: "متاجر جديدة",
      value: newStores,
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

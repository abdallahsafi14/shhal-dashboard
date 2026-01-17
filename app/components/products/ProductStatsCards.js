"use client";
import React from "react";
import {
  Package,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useProductStats } from "@/hooks/useDashboard";

export default function ProductStatsCards() {
  const { data: statsData, isLoading } = useProductStats({ days: 5 });
  const stat = statsData?.data || {};

  const stats = [
    {
      title: "منتجات مفعلة",
      value: stat.active_products || 0,
      change: `+${stat.active_percentage || 0}%`,
      trend: "up",
      icon: CheckCircle2,
      color: "bg-blue-100 text-blue-500",
    },
    {
      title: "منتجات غير مفعلة",
      value: stat.inactive_products || 0,
      change: `${stat.inactive_percentage || 0}%`,
      trend: stat.inactive_percentage >= 0 ? "up" : "down",
      icon: XCircle,
      color: "bg-pink-100 text-pink-500",
    },
    {
      title: "منتجات جديدة",
      value: stat.new_products || 0,
      change: `+${stat.new_percentage || 0}%`,
      trend: "up",
      icon: Clock,
      color: "bg-orange-100 text-orange-500",
    },
    {
      title: "إجمالي المنتجات",
      value: stat.total_products || 0,
      change: `+${stat.total_percentage || 0}%`,
      trend: "up",
      icon: Package,
      color: "bg-gray-100 text-gray-500",
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
            <div
              className={`flex items-center gap-1 text-s font-bold ${
                stat.trend === "up" ? "text-green-500" : "text-red-500"
              }`}
            >
              <span>{isLoading ? "..." : stat.change}</span>
              {stat.trend === "up" ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
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

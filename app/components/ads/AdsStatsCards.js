"use client";
import React from "react";
import { Megaphone, Layers, PauseCircle, Activity, TrendingUp, TrendingDown } from "lucide-react";
import { useAdStats } from "@/hooks/useDashboard";

export default function AdsStatsCards() {
  const { data: statsData, isLoading } = useAdStats();
  const statsInfo = statsData?.data || {};

  const stats = [
    {
      title: "اعلانات نشطة",
      value: statsInfo.active_advertisements || 0,
      change: "+6.08%",
      trend: "up",
      icon: Activity,
      color: "bg-blue-100 text-blue-500",
    },
    {
      title: "اعلانات متوقفة",
      value: statsInfo.suspended_advertisements || 0,
      change: "+6.08%",
      trend: "down",
      icon: PauseCircle,
      color: "bg-pink-100 text-pink-500",
    },
    {
      title: "اعلانات جدد",
      value: statsInfo.new_advertisements || 0,
      change: "+6.08%",
      trend: "up",
      icon: Megaphone,
      color: "bg-orange-100 text-orange-500",
    },
    {
      title: "اجمالي الاعلانات",
      value: statsInfo.total_advertisements || 0,
      change: "+6.08%",
      trend: "up",
      icon: Layers,
      color: "bg-gray-100 text-gray-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            {/* Trend (Left) */}
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>

            {/* Icon (Right) */}
            <div className={`flex items-center gap-1 text-s font-bold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              <span>{stat.change}</span>
              {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
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

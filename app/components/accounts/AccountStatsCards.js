"use client";
import React from "react";
import { Users, UserPlus, UserX, UserCheck } from "lucide-react";
import { useUsersStatistics } from "@/hooks/useDashboard";

export default function StatsCards() {
  const { data: statsResponse, isLoading } = useUsersStatistics();
  const d = statsResponse?.data || {};

  const stats = [
    {
      title: "مستخدمين نشطين",
      value: d.active_users ?? "—",
      icon: UserCheck,
      color: "bg-blue-100 text-blue-500",
    },
    {
      title: "مستخدمين متوقفين",
      value: d.suspended_users ?? "—",
      icon: UserX,
      color: "bg-pink-100 text-pink-500",
    },
    {
      title: "مستخدمين جدد",
      value: d.new_users ?? "—",
      icon: UserPlus,
      color: "bg-orange-100 text-orange-500",
    },
    {
      title: "إجمالي المستخدمين",
      value: d.total_users ?? "—",
      icon: Users,
      color: "bg-gray-100 text-gray-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 animate-pulse h-32" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
          <div className="text-right mt-2">
            <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

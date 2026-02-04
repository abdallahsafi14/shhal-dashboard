"use client";
import React from "react";
import { Coins, Clock, XCircle, CheckCircle2, TrendingUp, TrendingDown } from "lucide-react";
import { usePoints } from "@/hooks/useDashboard";

export default function PointsStatsCards() {
  const { data: pointsData, isLoading } = usePoints();
  const statistics = pointsData?.data?.statistics || {};
  const stats = [
    {
      title: "اجمالي العمليات",
      value: "5",
      change: "+6.08%",
      trend: "up",
      icon: Coins, 
      color: "bg-blue-100 text-blue-500",
    },
    {
      title: "العمليات قيد المعالجة",
      value: "30",
      change: "+6.08%",
      trend: "up",
      icon: Clock, 
      color: "bg-orange-100 text-orange-500",
    },
    {
      title: "العمليات المرفوضة",
      value: "15",
      change: "+6.08%",
      trend: "down",
      icon: XCircle, 
      color: "bg-pink-100 text-pink-500",
    },
    {
      title: "العمليات الجديدة", // Based on screenshot 'العمليات الجديدة' (New Operations) or 'العمليات الناجحة'? Screenshot says: 50 -> "العمليات الجديدة". Wait.
      // Screenshot 1 Left card (RTL so it's last? No, first is right):
      // Far Right: 5 "اجمالي العمليات" (Blue)
      // Middle Right: 15 "العمليات المرفوضة" (Pink/Red) -> 3rd one
      // Middle Left: 30 "العمليات قيد المعالجة" (Orange) -> 2nd one
      // Far Left: 50 "العمليات الجديدة" (Gray? No, it has a User icon in the screenshot? No, looks like a person with money?). 
      // Actually standardizing based on positions.
      value: "50",
      change: "+6.08%",
      trend: "up",
      icon: CheckCircle2, // Using Check mostly for success/completed or general
      color: "bg-gray-100 text-gray-500",
    },
 {
      title: "العمليات الجديدة", 
      value: "50",
      change: "+6.08%",
      trend: "up",
      icon: Coins, 
      color: "bg-gray-100 text-gray-500",
    }
  ];

  // Correction based on screenshot positions (RTL):
  // 1 (Right): Total (Blue)
  // 2: Rejected (Pink)
  // 3: Pending (Orange)
  // 4 (Left): New (Gray)
  
  // Re-ordering logic to match visual array [4, 3, 2, 1] if mapped standardly or just defining correct order.
  // Visual order in Screenshot:
  // [ New(50) ] [ Pending(30) ] [ Rejected(15) ] [ Total(5) ]
  // In RTL, First item (index 0) is on the Right.
  // So: Total, Rejected, Pending, New.
  
  const finalStats = [
    {
       title: "اجمالي العمليات",
       value: statistics.total || 0,
       change: "+6.08%",
       trend: "up",
       icon: Coins,
       color: "bg-blue-100 text-blue-500"
    },
    {
       title: "العمليات المرفوضة",
       value: (statistics.total || 0) - (statistics.pending || 0) - (statistics.new || 0),
       change: "+6.08%",
       trend: "down",
       icon: XCircle,
       color: "bg-pink-100 text-pink-500"
    },
    {
       title: "العمليات قيد المعالجة",
       value: statistics.pending || 0,
       change: "+6.08%",
       trend: "up",
       icon: Clock,
       color: "bg-orange-100 text-orange-500"
    },
    {
       title: "العمليات الجديدة",
       value: statistics.new || 0,
       change: "+6.08%",
       trend: "up",
       icon: Coins,
       color: "bg-gray-100 text-gray-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {finalStats.map((stat, index) => (
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

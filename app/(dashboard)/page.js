'use client';
import { useStats } from "@/hooks/useDashboard";
import { Users, ShoppingBag, Layers, Megaphone } from "lucide-react";

export default function Home() {
  const { data: statsData, isLoading } = useStats();
  const stats = statsData?.data || {};

  const statCards = [
    { title: "إجمالي المستخدمين", value: stats.total_users || 0, icon: Users, color: "text-blue-600 bg-blue-100" },
    { title: "إجمالي الطلبات", value: stats.total_orders || 0, icon: ShoppingBag, color: "text-green-600 bg-green-100" },
    { title: "إجمالي الأقسام", value: stats.total_categories || 0, icon: Layers, color: "text-purple-600 bg-purple-100" },
    { title: "إجمالي الإعلانات", value: stats.total_ads || 0, icon: Megaphone, color: "text-orange-600 bg-orange-100" },
  ];

  return (
    <div className="space-y-8">
      <div className="text-right">
        <h1 className="text-2xl font-bold text-gray-800">نظرة عامة</h1>
        <p className="text-gray-500 text-sm">أهلاً بك في لوحة تحكم شحال</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div className={`p-4 rounded-xl ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
      
      {/* Placeholder for charts or recent activity */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm min-h-[300px] flex items-center justify-center">
         <p className="text-gray-400 font-medium">الرسوم البيانية والنشاطات الأخيرة قيد التطوير...</p>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import {
  Layers,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { useSubCategories, useSubCategoriesByCategory } from "@/hooks/useDashboard";

export default function SubCategoryStatsCards({ selectedCategoryId }) {
  const { data: subCategoriesByCategoryData, isLoading: isLoadingByCategory } = useSubCategoriesByCategory(selectedCategoryId);
  const { data: subCategoriesData, isLoading: isLoadingAll } = useSubCategories();
  
  const subCategoriesDataFinal = selectedCategoryId ? subCategoriesByCategoryData : subCategoriesData;
  const isLoading = selectedCategoryId ? isLoadingByCategory : isLoadingAll;

  const subCategories = subCategoriesData?.data || [];
  const total = subCategories.length;

  const stats = [
    {
      title: "إجمالي الفئات الفرعية",
      value: total,
      icon: Layers,
      color: "bg-gray-100 text-gray-500",
    },
    {
      title: "فئات فرعية نشطة",
      value: total,
      icon: CheckCircle2,
      color: "bg-blue-100 text-blue-500",
    },
    {
      title: "فئات فرعية جديدة",
      value: subCategories.filter(
        (sc) =>
          new Date(sc.created_at) >
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length,
      icon: Clock,
      color: "bg-orange-100 text-orange-500",
    },
    {
      title: "الفئات الرئيسية",
      value: new Set(subCategories.map((sc) => sc.category_id)).size,
      icon: Layers,
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

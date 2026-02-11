"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import PointsStatsCards from "@/app/components/points/PointsStatsCards";
import PointsTable from "@/app/components/points/PointsTable";
import { usePointsRedemptionSettings, usePointsRedemptionSettingsActions } from "@/hooks/useDashboard";

export default function PointsPage() {
  const { data: settingsResponse, isLoading: isLoadingSettings } = usePointsRedemptionSettings();
  const { updateSettings, isUpdating } = usePointsRedemptionSettingsActions();
  const settings = settingsResponse?.data || {};

  const [formData, setFormData] = useState({
    is_enabled: true,
    multiplier: "X1",
    field_value: 1,
    point_value: 0.0025,
    min_points_to_redeem: 1000,
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        is_enabled: settings.is_enabled ?? true,
        multiplier: settings.multiplier || "X1",
        field_value: settings.field_value || 1,
        point_value: settings.point_value || 0.0025,
        min_points_to_redeem: settings.min_points_to_redeem || 1000,
      });
    }
  }, [settings]);

  const handleToggleChange = () => {
    const newValue = !formData.is_enabled;
    const updatedData = { ...formData, is_enabled: newValue };
    setFormData(updatedData);
    updateSettings(updatedData);
  };

  const handleMultiplierChange = (e) => {
    const newMultiplier = e.target.value;
    const updatedData = { ...formData, multiplier: newMultiplier };
    setFormData(updatedData);
    updateSettings(updatedData);
  };

  const handleFieldValueChange = (e) => {
    const newValue = parseInt(e.target.value) || 0;
    setFormData((prev) => ({ ...prev, field_value: newValue }));
  };

  const handleFieldValueBlur = () => {
    updateSettings(formData);
  };

  return (
    <div className="space-y-8">
      {/* Page Header Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">لوحة تحكم إدارة صرف النقاط</h2>
        <p className="text-gray-500 text-sm">إدارة الإعلانات وامكانية التعديل عليها</p>
      </div>

      {/* Points Redemption Settings Controls */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          

          {/* Multiplier and Field Value */}
          <div className="flex items-center gap-4">
            {/* Multiplier Dropdown */}
            <div className="relative">
              <select
                value={formData.multiplier}
                onChange={handleMultiplierChange}
                disabled={isUpdating || isLoadingSettings}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-right focus:outline-none focus:border-primary transition-colors disabled:opacity-50 cursor-pointer"
                dir="ltr"
              >
                {Array.from({ length: 10 }, (_, i) => `X${i + 1}`).map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Field Value */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-bold text-sm">القيمة :</span>
              <input
                type="number"
                value={formData.field_value}
                onChange={handleFieldValueChange}
                onBlur={handleFieldValueBlur}
                disabled={isUpdating || isLoadingSettings}
                className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                dir="ltr"
                min="0"
              />
            </div>
          </div>
          {/* Toggle Switch */}
          <div className="flex items-center gap-4">
            
            <button
              onClick={handleToggleChange}
              disabled={isUpdating || isLoadingSettings}
              className={`w-14 h-7 rounded-full relative transition-colors duration-200 outline-none disabled:opacity-50 ${
                formData.is_enabled ? "bg-[#8B8A6C]" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-200 shadow-sm ${
                  formData.is_enabled ? "left-1" : "left-8"
                }`}
              />
            </button>
            <span className="text-gray-700 font-bold text-sm whitespace-nowrap">
              تفعيل ميزة الصرف عند جميع المستخدمين
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <PointsStatsCards />

      {/* Data Table */}
      <PointsTable />
    </div>
  );
}

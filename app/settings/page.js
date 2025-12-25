"use client";
import React, { useState } from "react";
import EditSettingsModal from "../components/EditSettingsModal";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("system"); // 'visitor' or 'system'
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isVisitorOpen, setIsVisitorOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-right">
        <h2 className="text-2xl font-bold text-gray-800">لوحة التحكم</h2>
      </div>

      <div className="flex flex-col lg:flex-row-reverse gap-8">
        
       
       

        {/* Left Content Area */}
        <div className="flex-1 bg-white rounded-3xl p-10 shadow-sm border border-gray-50 min-h-[500px]">
          
          {activeTab === "visitor" ? (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-start gap-2 text-xl font-bold text-gray-800">
                 <span>التحكم بالزائرين :</span>
              </div>

              <div className="flex items-center justify-start gap-x-12 p-8 bg-gray-50/30 rounded-2xl border border-gray-50">
                 <div className="flex flex-col items-end gap-1">
                    <span className="text-gray-700 font-bold text-lg">زر لإغلاق وفتح الموقع للزائرين (الغير مسجلين)</span>
                 </div>
                 
                 {/* Custom Toggle Switch */}
                 <button 
                  onClick={() => setIsVisitorOpen(!isVisitorOpen)}
                  className={`w-14 h-7 rounded-full relative transition-colors duration-200 outline-none ${isVisitorOpen ? 'bg-[#8B8A6C]' : 'bg-gray-300'}`}
                 >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-200 shadow-sm ${isVisitorOpen ? 'left-1' : 'left-8'}`} />
                 </button>
              </div>

              <div className="bg-[#F8F9FA] p-8 rounded-2xl space-y-4 text-right">
                 <p className="text-gray-600 font-bold text-sm leading-relaxed">
                   حالة الإغلاق : سوف يتمكن الزائر من دخول الموقع أو التطبيق و رؤية محتوى الصفحة الرئيسية من دون اي معلومات أخرى.
                 </p>
                 <p className="text-gray-600 font-bold text-sm leading-relaxed">
                   حالة الفتح: سوف يتمكن الزائر من رؤية جميع المعلومات الموقع أو التطبيق بدون إستثناء، أي كما يراه المستخدم العادي
                 </p>
              </div>
            </div>
          ) : (
            <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="flex items-center justify-between">
                   <h3 className="text-xl font-bold text-gray-800">تكوين النظام</h3>
                  <button 
                    onClick={() => setIsEditModalOpen(true)}
                    className="bg-[#0E3A53] text-white px-8 py-2.5 rounded-lg font-bold hover:bg-[#062b40] transition-all shadow-md active:scale-95 text-sm"
                  >
                    تعديل المعلومات
                  </button>
               </div>

               {/* System Config Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* SMTP HOST */}
                  <div className="bg-gray-50/50 p-8 rounded-2xl border border-gray-100 flex flex-col items-end gap-4">
                     <span className="text-gray-400 font-bold text-xs">SMTP HOST</span>
                     <span className="text-gray-600 font-bold text-lg overflow-hidden text-ellipsis w-full text-right">Mail.cdl.eilk.tepldck.site</span>
                  </div>

                  {/* Port */}
                  <div className="bg-gray-50/50 p-8 rounded-2xl border border-gray-100 flex flex-col items-end gap-4">
                     <span className="text-gray-400 font-bold text-xs">Port</span>
                     <span className="text-gray-600 font-bold text-lg">7493</span>
                  </div>

                  {/* Password */}
                  <div className="bg-gray-50/50 p-8 rounded-2xl border border-gray-100 flex flex-col items-end gap-4">
                     <span className="text-gray-400 font-bold text-xs">Password</span>
                     <span className="text-gray-600 font-bold text-lg tracking-[0.3em]">********</span>
                  </div>

                  {/* Encryption */}
                  <div className="bg-gray-50/50 p-8 rounded-2xl border border-gray-100 flex flex-col items-end gap-4">
                     <span className="text-gray-400 font-bold text-xs">Encryption</span>
                     <span className="bg-[#8B8A6C] text-white px-8 py-1.5 rounded-lg font-bold text-sm">SSL</span>
                  </div>

                  {/* UserName */}
                  <div className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100 flex flex-col items-end gap-4 md:col-span-2">
                     <span className="text-gray-400 font-bold text-xs">UserName</span>
                     <span className="text-gray-600 font-bold text-lg overflow-hidden text-ellipsis w-full text-right">Mail.cdl.eilk.tepldck.site</span>
                  </div>

               </div>
            </div>
          )}

        </div>
         {/* Right Sidebar Tabs */}
         <div className="w-full lg:w-72 space-y-4">
          <button
            onClick={() => setActiveTab("visitor")}
            className={`w-full text-right px-8 py-5 rounded-xl font-bold transition-all border-r-8 ${
              activeTab === "visitor"
                ? "bg-gray-50 text-gray-700 border-[#8B8A6C] shadow-sm"
                : "bg-white text-gray-400 border-transparent border border-gray-100 hover:bg-gray-50"
            }`}
          >
            التحكم بالزائرين
          </button>
          
          <button
            onClick={() => setActiveTab("system")}
            className={`w-full text-right px-8 py-5 rounded-xl font-bold transition-all border-r-8 ${
              activeTab === "system"
                ? "bg-gray-50 text-gray-700 border-[#8B8A6C] shadow-sm"
                : "bg-white text-gray-400 border-transparent border border-gray-100 hover:bg-gray-50"
            }`}
          >
            اعدادات تكوين النظام
          </button>
        </div>
      </div>

      <EditSettingsModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />
    </div>
  );
}

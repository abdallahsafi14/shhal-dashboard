"use client";
import React, { useState, useRef, useEffect } from "react";
import { X, Trash2, Edit2, Plus } from "lucide-react";

export default function EditCategoryModal({ isOpen, onClose, category }) {
  const [subCategories, setSubCategories] = useState([
    { id: 1, name: "فئة فرعية 1", isEditing: false },
    { id: 2, name: "فئة فرعية 2", isEditing: false },
    { id: 3, name: "فئة فرعية 3", isEditing: false },
  ]);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const toggleEdit = (id) => {
    setSubCategories(subCategories.map(sub => 
      sub.id === id ? { ...sub, isEditing: !sub.isEditing } : sub
    ));
  };

  const handleNameChange = (id, newName) => {
    setSubCategories(subCategories.map(sub => 
      sub.id === id ? { ...sub, name: newName } : sub
    ));
  };

  const removeSubCategory = (id) => {
    setSubCategories(subCategories.filter(sub => sub.id !== id));
  };

  const addEmptySubCategory = () => {
    const newId = Math.max(...subCategories.map(s => s.id), 0) + 1;
    setSubCategories([...subCategories, { id: newId, name: "", isEditing: true }]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div 
        ref={modalRef} 
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden relative animate-in fade-in zoom-in duration-200"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 pt-12">
          <div className="text-center mb-10">
            <h2 className="text-xl font-bold text-gray-700">
              أضف معلومات عن فئة جديدة وقم بإنشاء الفئات الفرعية التابعة لها .
            </h2>
          </div>

          <div className="space-y-6">
            <div className="text-right mb-6">
               <h3 className="text-xl font-bold text-[#0E3A53]">فئة المطاعم</h3>
            </div>

            <div className="space-y-0 divide-y divide-gray-100 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar border-t border-gray-100">
              {subCategories.map((sub) => (
                <div key={sub.id} className="py-4">
                  {sub.isEditing ? (
                    <div className="relative mt-2">
                        <label className="absolute -top-3 right-4 bg-white px-1 text-[10px] font-bold text-[#0E3A53]">اسم الفئة</label>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <button onClick={() => removeSubCategory(sub.id)} className="text-red-500 hover:text-red-700 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => toggleEdit(sub.id)} className="text-blue-500 hover:text-blue-700 transition-colors">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={addEmptySubCategory} className="text-[#0E3A53] hover:text-[#062b40] transition-colors">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <input
                                autoFocus
                                type="text"
                                value={sub.name}
                                onChange={(e) => handleNameChange(sub.id, e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && toggleEdit(sub.id)}
                                placeholder="اكتب اسم الفئة التي تريدها...."
                                className="flex-1 border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:border-primary text-sm h-12"
                                dir="rtl"
                            />
                        </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <button onClick={() => removeSubCategory(sub.id)} className="text-red-500 hover:text-red-700 transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => toggleEdit(sub.id)} className="text-blue-500 hover:text-blue-700 transition-colors">
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={addEmptySubCategory} className="text-[#0E3A53] hover:text-[#062b40] transition-colors">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <span className="text-gray-600 font-bold">{sub.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 mt-10">
            <button 
              onClick={onClose}
              className="text-[#0E3A53] font-bold underline decoration-2 underline-offset-4 hover:text-gray-700 transition-colors"
            >
              إلغاء
            </button>
            <button className="bg-[#0E3A53] hover:bg-[#062b40] text-white px-12 py-3 rounded-lg font-bold shadow-sm transition-all transform active:scale-95">
              تعديل فئة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

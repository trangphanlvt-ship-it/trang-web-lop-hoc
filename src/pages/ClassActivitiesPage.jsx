import React from 'react';
import { Camera, Calendar, Sparkles, Heart, Award } from 'lucide-react';
import { SCHOOL_INFO } from '../lib/curriculumData';

export const ClassActivitiesPage = () => {
  const activities = [
    {
      id: 1,
      title: "Hội Thao Thể Dục Thể Thao Lớp 5/4",
      date: "05/08/2026",
      category: "Phong trào thể thao",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800",
      description: "Các bạn học sinh Lớp 5/4 đạt giải Nhất kéo co và giải Nhì chạy cự cự ngắn toàn khối 5."
    },
    {
      id: 2,
      title: "Dự Án STEM - Trồng Cây Xanh Trong Lớp Học",
      date: "01/08/2026",
      category: "Dự án Khoa học",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
      description: "Mỗi bạn tự chuẩn bị 1 chậu cây xanh nhỏ để góc học tập, tạo không gian xanh mát và rèn thói quen yêu thiên nhiên."
    },
    {
      id: 3,
      title: "Sinh Hoạt Chủ Đề: Uống Nước Nhớ Nguồn",
      date: "27/07/2026",
      category: "Hoạt động trải nghiệm",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
      description: "Lớp 5/4 dâng hoa tại bia tưởng niệm và lắng nghe câu chuyện lịch sử truyền thống hào hùng."
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100 water-ink-border">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase mb-3">
          <Camera className="w-4 h-4 text-rose-600" />
          <span>Góc Hình Ảnh Lớp 5/4</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif">
          Hoạt Động & Phong Trào Lớp 5/4
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          Tổng hợp những khoảnh khắc đáng nhớ, hoạt động ngoại khóa, hội thao và dự án trải nghiệm sinh động của tập thể Lớp 5/4 – Trường TH Lê Văn Tám.
        </p>
      </div>

      {/* Activity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activities.map((act) => (
          <div
            key={act.id}
            className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 water-ink-border group hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden bg-slate-100">
              <img
                src={act.image}
                alt={act.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 text-[10px] font-bold">
                {act.category}
              </span>
            </div>

            <div className="p-5 space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                <Calendar className="w-3.5 h-3.5 text-rose-500" />
                <span>{act.date}</span>
              </div>

              <h4 className="font-bold text-slate-900 text-base font-serif group-hover:text-rose-600 transition-colors">
                {act.title}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed">
                {act.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

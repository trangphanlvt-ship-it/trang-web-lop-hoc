import React from 'react';
import { School, MapPin, Heart, Sparkles } from 'lucide-react';
import { SCHOOL_INFO } from '../lib/curriculumData';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-rose-900/50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: School Identity */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-md">
                <School className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg font-serif">{SCHOOL_INFO.name}</h3>
                <p className="text-amber-400 font-semibold text-xs">{SCHOOL_INFO.className} • Năm học {SCHOOL_INFO.schoolYear}</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Hệ thống Web App Quản lý Giáo dục, Kho Học liệu & Game Tương tác tiêu chuẩn dành riêng cho học sinh Lớp 5/4.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-amber-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Khẩu hiệu: "{SCHOOL_INFO.motto}"</span>
            </div>
          </div>

          {/* Column 2: Teacher & Address */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Thông tin Lớp 5/4 & GVCN
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Địa chỉ:</strong> {SCHOOL_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400 shrink-0" />
                <span><strong>GVCN:</strong> {SCHOOL_INFO.teacherName}</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links & EdTech Standards */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Chương trình SGK Lớp 5 (2025-2026)
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <span className="bg-slate-800/80 px-2.5 py-1.5 rounded text-slate-300 border border-slate-700/50">TOÁN</span>
              <span className="bg-slate-800/80 px-2.5 py-1.5 rounded text-slate-300 border border-slate-700/50">TIẾNG VIỆT</span>
              <span className="bg-slate-800/80 px-2.5 py-1.5 rounded text-slate-300 border border-slate-700/50">KHOA HỌC</span>
              <span className="bg-slate-800/80 px-2.5 py-1.5 rounded text-slate-300 border border-slate-700/50">LỊCH SỬ & ĐỊA LÝ</span>
              <span className="bg-slate-800/80 px-2.5 py-1.5 rounded text-slate-300 border border-slate-700/50">CÔNG NGHỆ</span>
              <span className="bg-slate-800/80 px-2.5 py-1.5 rounded text-slate-300 border border-slate-700/50">ĐẠO ĐỨC</span>
            </div>
            <div className="mt-4 text-[11px] text-slate-500 italic">
              * Tương thích tiêu chuẩn thiết kế Thủy Mặc & Ultra Realistic cho Tiểu học Việt Nam.
            </div>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© 2025 - 2026 Trường Tiểu học Lê Văn Tám, Lớp 5/4. GVCN PHAN THỊ DIỄM TRANG. Phát triển với React + Supabase.</p>
        </div>
      </div>
    </footer>
  );
};

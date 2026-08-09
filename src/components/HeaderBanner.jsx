import React, { useState, useEffect } from 'react';
import { 
  School, 
  MapPin, 
  UserCheck, 
  Clock, 
  Sparkles, 
  Bot, 
  LogIn, 
  LogOut, 
  Award,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const HeaderBanner = ({ onOpenAITutor, onOpenStudentLogin, onOpenAuthModal }) => {
  const { currentStudent, role, logout, switchRole, user, profile, schoolInfo } = useAuth();
  
  // Real-time Date and Ticking Clock under banner
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatVietnameseDateTime = (date) => {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${dayName}, ngày ${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  };

  return (
    <header className="relative w-full overflow-hidden bg-slate-900 text-white shadow-2xl">
      {/* Background Decorative Water Ink Art Overlay */}
      <div className="absolute inset-0 bg-hero-gradient opacity-95"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center mix-blend-overlay opacity-25"></div>
      
      {/* Top Banner Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Logo & School Header Details */}
          <div className="flex items-center gap-4 sm:gap-6 text-center lg:text-left">
            <div className="relative group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-amber-300/40 p-2 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <School className="w-10 h-10 sm:w-12 sm:h-12 text-amber-300" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
              </span>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-400/30 text-rose-200 text-xs font-semibold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Năm học: {schoolInfo.schoolYear}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-md font-serif">
                {schoolInfo.name.toUpperCase()}
              </h1>
              <div className="mt-1 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1 text-sm text-rose-100/90 font-medium">
                <span className="flex items-center gap-1 text-amber-300 font-bold bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/20">
                  <Award className="w-4 h-4" />
                  {schoolInfo.className}
                </span>
                <span className="flex items-center gap-1">
                  <UserCheck className="w-4 h-4 text-emerald-300" />
                  GVCN: <strong className="text-white">{schoolInfo.teacherName}</strong>
                </span>
              </div>
              <div className="mt-2 flex items-center justify-center lg:justify-start gap-1.5 text-xs text-rose-200/80">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{schoolInfo.address}</span>
              </div>
            </div>
          </div>

          {/* User Action Center & Status */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* AI Tutor Button */}
            <button
              onClick={onOpenAITutor}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-sm shadow-lg hover:shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Bot className="w-4 h-4 text-slate-950 animate-bounce" />
              <span>Trợ lý AI Học Tập</span>
            </button>

            {/* Login / User Status */}
            {currentStudent ? (
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 font-bold text-sm">
                  {currentStudent.name.charAt(0)}
                </div>
                <div className="text-left text-xs">
                  <div className="font-bold text-white leading-tight">{currentStudent.name}</div>
                  <div className="text-amber-300 font-medium">⭐ {currentStudent.stars || 0} Ngôi sao</div>
                </div>
                <button
                  onClick={logout}
                  className="ml-2 text-rose-300 hover:text-white p-1 rounded hover:bg-rose-500/20 transition-colors"
                  title="Đăng xuất"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : user ? (
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400 flex items-center justify-center text-rose-200 font-bold text-xs uppercase">
                  {role.charAt(0)}
                </div>
                <div className="text-left text-xs">
                  <div className="font-bold text-white leading-tight">{profile?.full_name || user.email}</div>
                  <div className="text-rose-200 uppercase font-semibold text-[10px]">{role}</div>
                </div>
                <button
                  onClick={logout}
                  className="ml-2 text-rose-300 hover:text-white p-1 rounded hover:bg-rose-500/20 transition-colors"
                  title="Đăng xuất"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenStudentLogin}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Học sinh Đăng nhập</span>
                </button>
                <button
                  onClick={onOpenAuthModal}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs border border-white/20 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                  <span>Giáo viên / Admin</span>
                </button>
              </div>
            )}

            {/* Quick Demo Role Switcher */}
            <div className="hidden sm:flex items-center bg-black/30 rounded-lg p-1 text-[11px] font-medium border border-white/10">
              <span className="px-2 text-rose-200/70">Role:</span>
              <button
                onClick={() => switchRole('student')}
                className={`px-2 py-0.5 rounded ${role === 'student' ? 'bg-amber-400 text-slate-900 font-bold' : 'text-rose-100 hover:text-white'}`}
              >
                Học sinh
              </button>
              <button
                onClick={() => switchRole('teacher')}
                className={`px-2 py-0.5 rounded ${role === 'teacher' ? 'bg-amber-400 text-slate-900 font-bold' : 'text-rose-100 hover:text-white'}`}
              >
                Giáo viên
              </button>
              <button
                onClick={() => switchRole('admin')}
                className={`px-2 py-0.5 rounded ${role === 'admin' ? 'bg-amber-400 text-slate-900 font-bold' : 'text-rose-100 hover:text-white'}`}
              >
                Admin
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* DƯỚI BANNER CÓ CHẠY NGÀY THÁNG NĂM HIỆN HÀNH (Running Live Date & Clock Ticker) */}
      <div className="w-full bg-slate-950/90 border-t border-b border-amber-500/30 px-4 py-2 text-amber-300 font-mono text-xs sm:text-sm shadow-inner flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2 animate-pulse shrink-0">
          <Calendar className="w-4 h-4 text-rose-400" />
          <span className="font-bold text-rose-400 uppercase tracking-wider text-[11px]">Thời gian thực hệ thống:</span>
        </div>
        
        <div className="truncate font-semibold tracking-wide text-right text-amber-200">
          {formatVietnameseDateTime(currentDateTime)}
        </div>
      </div>
    </header>
  );
};

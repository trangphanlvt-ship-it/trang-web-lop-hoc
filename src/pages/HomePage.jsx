import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Sparkles, 
  Award, 
  BellRing, 
  Landmark, 
  ArrowRight, 
  Users, 
  CheckCircle2, 
  Star,
  Bot
} from 'lucide-react';
import { SUBJECTS_LIST, SCHOOL_INFO, TEACHER_REMINDERS } from '../lib/curriculumData';
import { LeaderboardCard } from '../components/LeaderboardCard';
import { useAuth } from '../context/AuthContext';

export const HomePage = ({ onOpenAITutor, onOpenStudentLogin }) => {
  const { currentStudent } = useAuth();

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      
      {/* Welcome Hero Card */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-900 via-rose-800 to-slate-900 text-white p-6 sm:p-10 shadow-2xl water-ink-border">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Chào mừng đến với Góc Học Tập Lớp 5/4</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif leading-tight">
            Ươm Mầm Tri Thức • Chắp Cánh Tương Lai
          </h2>

          <p className="text-sm sm:text-base text-rose-100/90 leading-relaxed">
            Hệ thống Kho Học liệu & Game Tương tác SGK Lớp 5 chuẩn Quốc gia (2025-2026) của{' '}
            <strong className="text-white">{SCHOOL_INFO.name}</strong>. Hỗ trợ 7 môn học cốt lõi cùng Trợ lý AI học tập thông minh!
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/subjects"
              className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-lg transition-transform transform hover:-translate-y-0.5"
            >
              Khám Phá Các Môn Học
            </Link>
            
            <button
              onClick={onOpenAITutor}
              className="px-6 py-3 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-sm backdrop-blur-md flex items-center gap-2 transition-colors"
            >
              <Bot className="w-4 h-4 text-amber-300" />
              <span>Hỏi Bài Trợ Lý AI</span>
            </button>
          </div>
        </div>

        {/* Decorative Art Element */}
        <div className="absolute right-[-20px] bottom-[-20px] opacity-20 pointer-events-none hidden lg:block">
          <Landmark className="w-80 h-80 text-amber-200" />
        </div>
      </section>

      {/* Quick Student Greeting Notice */}
      {currentStudent && (
        <section className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-base">
              {currentStudent.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-emerald-950 text-sm">
                Xin chào học sinh {currentStudent.name}!
              </h4>
              <p className="text-xs text-emerald-700">
                Hôm nay em đã sẵn sàng hoàn thành nhiệm vụ bài tập SGK Lớp 5/4 chưa?
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/30 text-amber-900 text-xs font-bold border border-amber-300">
            <Star className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>{currentStudent.stars} Ngôi Sao</span>
          </div>
        </section>
      )}

      {/* 7 Subjects Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
              Các Môn Học Lớp 5 (Năm học 2025-2026)
            </h3>
            <p className="text-xs text-slate-500">
              Sắp xếp chuẩn theo Chương trình SGK Lớp 5 hiện hành với bộ Trò chơi tương tác.
            </p>
          </div>
          <Link
            to="/subjects"
            className="text-rose-600 hover:text-rose-700 font-bold text-xs flex items-center gap-1"
          >
            <span>Xem tất cả môn</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SUBJECTS_LIST.map((subject) => (
            <Link
              key={subject.id}
              to={`/subject/${subject.code}`}
              className="group relative bg-white rounded-3xl p-5 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 water-ink-border flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${subject.badgeColor}`}>
                    {subject.code}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {subject.gamesCount} Game Tương tác
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-lg group-hover:text-rose-600 transition-colors font-serif">
                  {subject.name}
                </h4>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {subject.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-600 group-hover:translate-x-1 transition-transform">
                <span>Chơi game & Học ngay</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Two Column Layout: Teacher Reminders & Leaderboard */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Teacher Reminders */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-rose-100 water-ink-border">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-600 flex items-center justify-center text-white font-bold shadow-md">
                <BellRing className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base font-serif">
                  Góc Dặn Dò Lớp 5/4
                </h3>
                <p className="text-xs text-slate-500 font-medium">Từ Cô GVCN: {SCHOOL_INFO.teacherName}</p>
              </div>
            </div>
            <Link
              to="/reminders"
              className="text-xs font-bold text-rose-600 hover:underline"
            >
              Xem chi tiết
            </Link>
          </div>

          <div className="space-y-3">
            {TEACHER_REMINDERS.map((rem) => (
              <div
                key={rem.id}
                className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-900 text-sm">{rem.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{rem.date}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{rem.content}</p>
                <div className="text-[10px] text-rose-700 font-semibold italic">
                  ✍️ {rem.author}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Leaderboard */}
        <LeaderboardCard />

      </section>

      {/* Banner Highlight: Ho Chi Minh Cultural Space */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-amber-700 to-rose-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="px-3 py-1 rounded-full bg-white/20 text-amber-200 text-xs font-bold uppercase">
              Không Gian Văn Hóa Hồ Chí Minh
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif">
              5 Điều Bác Hồ Dạy Thiếu Niên Nhi Đồng
            </h3>
            <p className="text-xs sm:text-sm text-amber-100 max-w-xl">
              Cùng học sinh Lớp 5/4 thi đua học tập tốt, lao động tốt và giữ gìn vệ sinh thật tốt theo gương Bác Hồ vĩ đại.
            </p>
          </div>

          <Link
            to="/hcm-space"
            className="px-6 py-3 rounded-2xl bg-white text-slate-950 hover:bg-amber-100 font-extrabold text-xs sm:text-sm shadow-lg shrink-0 transition-transform transform hover:scale-105"
          >
            Khám Phá Không Gian HCM
          </Link>
        </div>
      </section>

    </div>
  );
};

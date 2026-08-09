import React from 'react';
import { LeaderboardCard } from '../components/LeaderboardCard';
import { Award, Star, Trophy, Sparkles } from 'lucide-react';
import { CLASS_ROSTER_54 } from '../lib/curriculumData';

export const HonorRollPage = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100 water-ink-border">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase mb-3">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>Bảng Vàng Thi Đua Lớp 5/4</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif">
          Vinh Danh Học Sinh Xuất Sắc
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          Tuyên dương các bạn học sinh Lớp 5/4 có thành tích xuất sắc trong học tập, hoàn thành tốt các game tương tác và tích cực phát biểu xây dựng bài.
        </p>
      </div>

      {/* Leaderboard Card */}
      <LeaderboardCard />

      {/* Full Roster Ranks Grid */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 water-ink-border space-y-4">
        <h3 className="font-bold text-slate-800 text-base font-serif flex items-center gap-2">
          <Award className="w-5 h-5 text-rose-600" />
          Toàn Bộ Điểm Ngôi Sao Thi Đua Lớp 5/4 ({CLASS_ROSTER_54.length - 1} Học sinh)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CLASS_ROSTER_54.filter(s => s.role !== 'teacher').map((st, idx) => (
            <div
              key={st.id}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-bold text-slate-400 w-5">{idx + 1}.</span>
                <div>
                  <div className="font-bold text-slate-800">{st.name}</div>
                  <div className="text-[10px] text-rose-600">{st.badge}</div>
                </div>
              </div>
              <span className="font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                ⭐ {st.stars}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

import React from 'react';
import { Award, Trophy, Star, Crown, Flame } from 'lucide-react';
import { CLASS_ROSTER_54 } from '../lib/curriculumData';

export const LeaderboardCard = () => {
  // Sort students by stars count descending
  const sortedStudents = [...CLASS_ROSTER_54]
    .filter(s => s.role !== 'teacher')
    .sort((a, b) => b.stars - a.stars);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-rose-100 water-ink-border">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold shadow-md">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base font-serif">
              Bảng Vàng Vinh Danh Ngôi Sao Học Tập
            </h3>
            <p className="text-xs text-slate-500 font-medium">Thi đua Lớp 5/4 - Trường TH Lê Văn Tám</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-extrabold border border-rose-200">
          Năm học 2025-2026
        </span>
      </div>

      <div className="space-y-3">
        {sortedStudents.slice(0, 5).map((student, idx) => {
          let rankBadge = (
            <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
              {idx + 1}
            </span>
          );

          if (idx === 0) {
            rankBadge = (
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center shadow-md border-2 border-amber-200">
                <Crown className="w-4 h-4 fill-amber-950" />
              </div>
            );
          } else if (idx === 1) {
            rankBadge = (
              <div className="w-7 h-7 rounded-full bg-slate-300 text-slate-900 font-bold text-xs flex items-center justify-center shadow">
                2
              </div>
            );
          } else if (idx === 2) {
            rankBadge = (
              <div className="w-7 h-7 rounded-full bg-amber-700 text-white font-bold text-xs flex items-center justify-center shadow">
                3
              </div>
            );
          }

          return (
            <div
              key={student.id}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                idx === 0
                  ? 'bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-300/80'
                  : 'bg-slate-50/70 border-slate-200/80 hover:bg-rose-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                {rankBadge}
                <div>
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    {student.name}
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-medium">
                      {student.badge}
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-400">Học sinh Lớp 5/4</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-amber-400/20 text-amber-800 border border-amber-300 px-3 py-1 rounded-xl text-xs font-extrabold">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>{student.stars} sao</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { BellRing, Calendar, UserCheck, Sparkles, Pin } from 'lucide-react';
import { TEACHER_REMINDERS, SCHOOL_INFO } from '../lib/curriculumData';

export const TeacherRemindersPage = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100 water-ink-border">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase mb-3">
          <BellRing className="w-4 h-4 text-rose-600" />
          <span>Sổ Dặn Dò Lớp 5/4</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif">
          Góc Dặn Dò Của Cô Chủ Nhiệm
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          Thông báo bài tập về nhà, lịch sinh hoạt lớp, thi đua tuần và nhắc nhở từ GVCN{' '}
          <strong className="text-rose-700">{SCHOOL_INFO.teacherName}</strong>.
        </p>
      </div>

      {/* List of Reminders */}
      <div className="space-y-4">
        {TEACHER_REMINDERS.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 water-ink-border space-y-3 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-bl-full pointer-events-none"></div>

            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-100/70 border border-rose-200 px-3 py-1 rounded-full">
                <Pin className="w-3.5 h-3.5" />
                <span>Dặn dò quan trọng</span>
              </span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {item.date}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 font-serif">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {item.content}
            </p>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                {item.author}
              </span>
              <span className="text-[11px] text-amber-600 font-medium">
                * Học sinh và Phụ huynh lưu ý thực hiện đúng hạn.
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

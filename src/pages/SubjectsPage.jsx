import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, BrainCircuit, Sparkles } from 'lucide-react';
import { SUBJECTS_LIST, SCHOOL_INFO } from '../lib/curriculumData';

export const SubjectsPage = () => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100 water-ink-border">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase mb-3">
          <Sparkles className="w-4 h-4 text-rose-600" />
          <span>SGK Lớp 5 (Năm học 2025-2026)</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif">
          Danh Sách Các Môn Học Lớp 5/4
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          Tất cả các môn học được xây dựng theo chương trình tiểu học hiện hành với ngân hàng câu hỏi, bài ôn tập và kho trò chơi giáo dục phong phú cho học sinh tương tác.
        </p>
      </div>

      {/* Grid of 7 Subjects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUBJECTS_LIST.map((subject) => (
          <div
            key={subject.id}
            className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/80 water-ink-border flex flex-col justify-between hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${subject.badgeColor}`}>
                  {subject.code}
                </span>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <BrainCircuit className="w-4 h-4 text-rose-600" />
                  {subject.gamesCount} Game Tương tác
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 font-serif">
                {subject.name}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {subject.description}
              </p>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs space-y-1 text-slate-500">
                <div>📚 <strong>Số bài học:</strong> {subject.lessonsCount} bài theo SGK</div>
                <div>⭐ <strong>Thích hợp:</strong> Học sinh Lớp 5 tự luyện tập tại nhà</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                to={`/subject/${subject.code}`}
                className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-colors"
              >
                <span>Chơi Game & Vào Học Môn {subject.name}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

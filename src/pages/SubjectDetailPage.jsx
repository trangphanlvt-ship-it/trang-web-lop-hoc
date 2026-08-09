import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, BrainCircuit, Sparkles, CheckCircle2, FileText, Upload } from 'lucide-react';
import { SUBJECTS_LIST, INITIAL_QUESTION_BANK } from '../lib/curriculumData';
import { InteractiveGame } from '../components/InteractiveGame';
import { QuestionBankModal } from '../components/QuestionBankModal';
import { useAuth } from '../context/AuthContext';

export const SubjectDetailPage = () => {
  const { code } = useParams();
  const { role } = useAuth();
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  const subject = SUBJECTS_LIST.find(s => s.code === code) || SUBJECTS_LIST[0];
  const subjectQuestions = INITIAL_QUESTION_BANK.filter(q => q.subject === subject.code);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/subjects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách môn học</span>
        </Link>

        {(role === 'teacher' || role === 'admin') && (
          <button
            onClick={() => setIsQuestionModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors"
          >
            <Upload className="w-4 h-4 text-amber-300" />
            <span>Thêm Câu Hỏi Môn {subject.name}</span>
          </button>
        )}
      </div>

      {/* Subject Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100 water-ink-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${subject.badgeColor}`}>
              MÔN HỌC SGK LỚP 5
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 font-serif mt-2">
              Môn {subject.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {subject.description}
            </p>
          </div>

          <div className="bg-rose-50 border border-rose-200 px-5 py-3 rounded-2xl text-center shrink-0">
            <div className="text-xs font-bold text-rose-700 uppercase">Ngân hàng câu hỏi</div>
            <div className="text-2xl font-extrabold text-rose-900">{subjectQuestions.length} Câu hỏi</div>
          </div>
        </div>
      </div>

      {/* Main Interactive Game Engine */}
      <InteractiveGame subjectCode={subject.code} />

      {/* Question List Preview */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 water-ink-border space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-base font-serif flex items-center gap-2">
            <FileText className="w-5 h-5 text-rose-600" />
            Danh Sách Câu Hỏi Ôn Tập Môn {subject.name}
          </h3>
          <span className="text-xs text-slate-400 font-medium">Chương trình 2025-2026</span>
        </div>

        <div className="space-y-3">
          {subjectQuestions.map((q, idx) => (
            <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">Câu {idx + 1}: {q.question_text}</span>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                  {q.topic}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                {q.options.map((opt, oIdx) => (
                  <div key={oIdx} className={`p-2 rounded-xl border ${opt === q.correct_answer ? 'bg-emerald-100/60 border-emerald-300 text-emerald-900 font-bold' : 'bg-white border-slate-200'}`}>
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Teacher Question Bank Modal */}
      <QuestionBankModal
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
      />

    </div>
  );
};
